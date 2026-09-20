import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import {
  getMonlamConfig,
  MonlamApiError,
  MonlamConfigError,
  monlamMissingKeyMessage,
  MONLAM_TIBETAN_LANG,
  transcribeAudioWithMonlam,
} from "@/lib/server/monlam";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { error, ...extra },
    { status, headers: NO_STORE }
  );
}

/** GET: whether Monlam STT is configured (never exposes the key). */
export async function GET(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return jsonError("Unauthorized", 401);
  }

  const { configured, baseUrl } = getMonlamConfig();
  return NextResponse.json(
    {
      configured,
      baseUrl,
      lang: MONLAM_TIBETAN_LANG,
      provider: "monlam",
      message: configured ? undefined : monlamMissingKeyMessage(),
    },
    { headers: NO_STORE }
  );
}

/**
 * POST multipart: `file` (audio), optional `lang` (default `bo`).
 * Proxies to Monlam POST /api/v1/stt/file with server-side Bearer key.
 */
export async function POST(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return jsonError("Unauthorized", 401);
  }

  const limited = rateLimit(`monlam-stt:${clientIp(request)}`, 20, 60_000);
  if (!limited.ok) {
    return jsonError("Too many transcription requests. Try again shortly.", 429, {
      retryAfterSeconds: limited.retryAfterSeconds,
    });
  }

  if (!getMonlamConfig().configured) {
    return jsonError(monlamMissingKeyMessage(), 503, { code: "monlam_not_configured" });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const langField = form.get("lang");
    const lang =
      typeof langField === "string" && langField.trim()
        ? langField.trim()
        : MONLAM_TIBETAN_LANG;

    if (!(file instanceof File)) {
      return jsonError("Missing audio file (multipart field `file`)", 400);
    }

    if (file.size <= 0) {
      return jsonError("Audio file is empty", 400);
    }

    if (file.size > MAX_AUDIO_BYTES) {
      return jsonError("Audio file is larger than 25MB", 400);
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await transcribeAudioWithMonlam({
      bytes,
      filename: file.name || "recording.webm",
      contentType: file.type || "application/octet-stream",
      lang,
    });

    return NextResponse.json(
      {
        text: result.text,
        id: result.id,
        responseTime: result.responseTime,
        lang,
        provider: "monlam",
      },
      { headers: NO_STORE }
    );
  } catch (error) {
    if (error instanceof MonlamConfigError) {
      return jsonError(error.message, 503, { code: "monlam_not_configured" });
    }

    if (error instanceof MonlamApiError) {
      console.error("[api/stt/monlam] Monlam error:", error.status, error.details);
      const status =
        error.status === 401 || error.status === 403
          ? 502
          : error.status >= 400 && error.status < 500
            ? error.status
            : 502;
      return jsonError(error.message, status, {
        code: "monlam_api_error",
        details: error.details,
      });
    }

    console.error("[api/stt/monlam] Error:", error);
    return jsonError("Internal server error", 500);
  }
}
