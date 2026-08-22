import { NextRequest, NextResponse } from "next/server";
import {
  getOpenAIConfig,
  buildRealtimeSessionConfig,
} from "@/lib/server/openai";

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
  try {
    const sdp = await request.text();

    if (!sdp || !sdp.includes("v=0")) {
      return jsonError("Invalid SDP offer", 400);
    }

    const config = getOpenAIConfig();
    const sessionConfig = JSON.stringify(buildRealtimeSessionConfig(config));

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
