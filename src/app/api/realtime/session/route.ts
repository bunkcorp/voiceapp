import { NextRequest, NextResponse } from "next/server";
import {
  getOpenAIConfig,
  buildHistoryContext,
  buildRealtimeSessionConfig,
  extraInstructionsForPersona,
} from "@/lib/server/openai";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";
import { getConversation } from "@/lib/server/store";

export const runtime = "nodejs";

const OPENAI_REALTIME_URL = "https://api.openai.com/v1/realtime/calls";

const NO_STORE = { "Cache-Control": "no-store" };

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

function clientErrorFromOpenAI(status: number, errorText: string) {
  let code = "";
  let message = "";

  try {
    const parsed = JSON.parse(errorText) as {
      error?: { code?: string; message?: string };
    };
    code = parsed.error?.code ?? "";
    message = parsed.error?.message ?? "";
  } catch {
    // OpenAI sometimes returns non-JSON error bodies.
  }

  if (status === 401 || status === 403) {
    return jsonError("Voice service authentication failed", status);
  }

  if (code === "invalid_offer" || message.toLowerCase().includes("sdp")) {
    return jsonError("Invalid SDP offer", 400);
  }

  if (code === "model_not_found" || /model/i.test(code)) {
    return jsonError("Realtime model is not available", status);
  }

  if (code === "unknown_parameter") {
    return jsonError("Realtime session configuration is invalid", status);
  }

  return jsonError("Failed to create realtime session", status);
}

export async function POST(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return jsonError("Unauthorized", 401);
  }

  try {
    const sdp = await request.text();

    if (!sdp || !sdp.includes("v=0")) {
      return jsonError("Invalid SDP offer", 400);
    }

    const config = getOpenAIConfig();
    const conversationId =
      request.nextUrl.searchParams.get("c") ||
      request.headers.get("x-conversation-id") ||
      "";

    let extraInstructions = "";
    if (conversationId) {
      try {
        const detail = await getConversation(conversationId);
        extraInstructions = buildHistoryContext({
          messages: detail.messages,
          files: detail.files,
        });
      } catch (error) {
        console.error("[api/realtime/session] history load failed:", error);
      }
    }

    extraInstructions = `${extraInstructionsForPersona(
      request.nextUrl.searchParams.get("persona")
    )}${extraInstructions}`;

    const sessionConfig = JSON.stringify(
      buildRealtimeSessionConfig({ ...config, extraInstructions })
    );

    const formData = new FormData();
    formData.set("sdp", sdp);
    formData.set("session", sessionConfig);

    const response = await fetch(OPENAI_REALTIME_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[api/realtime/session] OpenAI error:", errorText);
      return clientErrorFromOpenAI(response.status, errorText);
    }

    const answerSdp = await response.text();

    return new NextResponse(answerSdp, {
      status: 200,
      headers: {
        "Content-Type": "application/sdp",
        ...NO_STORE,
      },
    });
  } catch (error) {
    console.error("[api/realtime/session] Error:", error);

    if (error instanceof Error && error.message.includes("Environment")) {
      return jsonError("Server configuration error", 500);
    }

    return jsonError("Internal server error", 500);
  }
}
