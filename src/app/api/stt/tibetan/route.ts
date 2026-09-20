import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { MONLAM_TIBETAN_LANG } from "@/lib/server/monlam";
import {
  getTibetanSttStatus,
  TibetanSttApiError,
  TibetanSttConfigError,
  tibetanSttMissingConfigMessage,
  transcribeTibetanAudio,
} from "@/lib/server/tibetanStt";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { error, ...extra },
    { status, headers: NO_STORE }
  );
}

/** GET: whether Tibetan STT is configured (never exposes keys). */
export async function GET(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return jsonError("Unauthorized", 401);
  }

  const status = getTibetanSttStatus();
  return NextResponse.json(
    {
      configured: status.configured,
      backend: status.backend,
      selfHostedConfigured: status.selfHostedConfigured,
      monlamConfigured: status.monlamConfigured,
      selfHostedUrl: status.selfHostedUrl,
      monlamBaseUrl: status.monlamBaseUrl,
      lang: status.lang,
      provider: "tibetan",
      message: status.configured ? undefined : tibetanSttMissingConfigMessage(),
    },
    { headers: NO_STORE }
  );
}

/**
 * POST multipart: `file` (audio), optional `lang` (default `bo`).
 * Uses SELF_HOSTED_STT_URL first; falls back to Monlam cloud if MONLAM_API_KEY is set.
 */
export async function POST(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return jsonError("Unauthorized", 401);
  }

  const limited = rateLimit(`tibetan-stt:${clientIp(request)}`, 20, 60_000);
  if (!limited.ok) {
    return jsonError("Too many transcription requests. Try again shortly.", 429, {
      retryAfterSeconds: limited.retryAfterSeconds,
    });
  }

  const status = getTibetanSttStatus();
  if (!status.configured) {
    return jsonError(tibetanSttMissingConfigMessage(), 503, {
      code: "tibetan_stt_not_configured",
    });
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
    const result = await transcribeTibetanAudio({
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
        model: result.model,
        lang,
        provider: "tibetan",
        backend: result.backend,
      },
      { headers: NO_STORE }
    );
  } catch (error) {
    if (error instanceof TibetanSttConfigError) {
      return jsonError(error.message, 503, { code: "tibetan_stt_not_configured" });
    }

    if (error instanceof TibetanSttApiError) {
      console.error(
        "[api/stt/tibetan] STT error:",
        error.backend,
        error.status,
        error.details
      );
      const statusCode =
        error.status === 401 || error.status === 403
          ? 502
          : error.status >= 400 && error.status < 500
            ? error.status
            : 502;
      return jsonError(error.message, statusCode, {
        code: "tibetan_stt_error",
        backend: error.backend,
        details: error.details,
      });
    }

    console.error("[api/stt/tibetan] Error:", error);
    return jsonError("Internal server error", 500);
  }
}
