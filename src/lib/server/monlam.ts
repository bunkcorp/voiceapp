import { z } from "zod/v4";

/** Public Monlam API host (self-host via MONLAM_API_BASE_URL). */
export const DEFAULT_MONLAM_API_BASE_URL = "https://api.monlam.ai";

/** Tibetan language code expected by Monlam `lang` form field. */
export const MONLAM_TIBETAN_LANG = "bo";

const monlamSttResponseSchema = z.object({
  success: z.boolean().optional(),
  id: z.string().optional(),
  file: z.string().optional(),
  output: z.string(),
  responseTime: z.number().optional(),
});

export class MonlamConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MonlamConfigError";
  }
}

export class MonlamApiError extends Error {
  status: number;
  details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.name = "MonlamApiError";
    this.status = status;
    this.details = details;
  }
}

export function getMonlamConfig() {
  const apiKey = (process.env.MONLAM_API_KEY ?? "").trim();
  const baseUrl = (
    process.env.MONLAM_API_BASE_URL?.trim() || DEFAULT_MONLAM_API_BASE_URL
  ).replace(/\/+$/, "");

  return {
    apiKey,
    baseUrl,
    configured: Boolean(apiKey),
  };
}

export function monlamMissingKeyMessage() {
  return (
    "Monlam cloud STT is not configured. Prefer TIBETAN_STT_URL / SELF_HOSTED_STT_URL " +
    "(see services/tibetan-stt), or optionally set MONLAM_API_KEY / MONLAM_API_BASE_URL."
  );
}

/**
 * Upload audio to Monlam hosted STT: POST /api/v1/stt/file
 * multipart fields: `file`, `lang` (use `bo` for Tibetan).
 * Response JSON includes `output` (transcript text).
 */
export async function transcribeAudioWithMonlam(input: {
  bytes: ArrayBuffer | Uint8Array | Buffer;
  filename: string;
  contentType?: string;
  lang?: string;
}): Promise<{ text: string; id?: string; responseTime?: number; file?: string }> {
  const { apiKey, baseUrl } = getMonlamConfig();

  if (!apiKey) {
    throw new MonlamConfigError(monlamMissingKeyMessage());
  }

  const lang = (input.lang ?? MONLAM_TIBETAN_LANG).trim() || MONLAM_TIBETAN_LANG;
  const contentType = input.contentType || "application/octet-stream";
  const bytes = Uint8Array.from(
    input.bytes instanceof Buffer
      ? input.bytes
      : input.bytes instanceof ArrayBuffer
        ? new Uint8Array(input.bytes)
        : input.bytes
  );

  const form = new FormData();
  form.set(
    "file",
    new Blob([bytes], { type: contentType }),
    input.filename || "audio.webm"
  );
  form.set("lang", lang);

  const url = `${baseUrl}/api/v1/stt/file`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    });
  } catch (error) {
    throw new MonlamApiError(
      "Failed to reach Monlam STT API",
      502,
      error instanceof Error ? error.message : undefined
    );
  }

  const rawText = await response.text();
  let parsed: unknown = null;
  if (rawText) {
    try {
      parsed = JSON.parse(rawText) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!response.ok) {
    const detail =
      parsed &&
      typeof parsed === "object" &&
      "detail" in parsed &&
      typeof (parsed as { detail: unknown }).detail === "string"
        ? (parsed as { detail: string }).detail
        : rawText.slice(0, 400) || response.statusText;

    if (response.status === 401 || response.status === 403) {
      throw new MonlamApiError(
        "Monlam STT authentication failed. Check MONLAM_API_KEY permissions.",
        response.status,
        detail
      );
    }

    throw new MonlamApiError(
      "Monlam STT request failed",
      response.status >= 400 && response.status < 600 ? response.status : 502,
      detail
    );
  }

  const result = monlamSttResponseSchema.safeParse(parsed);
  if (!result.success) {
    throw new MonlamApiError(
      "Monlam STT returned an unexpected response",
      502,
      rawText.slice(0, 400)
    );
  }

  const text = result.data.output.trim();
  if (!text) {
    throw new MonlamApiError("Monlam STT returned empty transcript", 502);
  }

  return {
    text,
    id: result.data.id,
    responseTime: result.data.responseTime,
    file: result.data.file,
  };
}
