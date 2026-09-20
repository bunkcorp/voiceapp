import { z } from "zod/v4";
import {
  getMonlamConfig,
  MonlamApiError,
  MonlamConfigError,
  monlamMissingKeyMessage,
  MONLAM_TIBETAN_LANG,
  transcribeAudioWithMonlam,
} from "@/lib/server/monlam";

export type TibetanSttBackend = "self_hosted" | "monlam";

const selfHostedResponseSchema = z
  .object({
    text: z.string().optional(),
    output: z.string().optional(),
  })
  .refine((value) => Boolean((value.text ?? value.output ?? "").trim()), {
    message: "missing transcript text",
  });

export class TibetanSttConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TibetanSttConfigError";
  }
}

export class TibetanSttApiError extends Error {
  status: number;
  details?: string;
  backend?: TibetanSttBackend;

  constructor(
    message: string,
    status: number,
    details?: string,
    backend?: TibetanSttBackend
  ) {
    super(message);
    this.name = "TibetanSttApiError";
    this.status = status;
    this.details = details;
    this.backend = backend;
  }
}

export function getSelfHostedSttConfig() {
  // Prefer explicit TIBETAN_STT_URL; SELF_HOSTED_STT_URL is the same thing.
  const baseUrl = (
    process.env.TIBETAN_STT_URL ??
    process.env.SELF_HOSTED_STT_URL ??
    ""
  )
    .trim()
    .replace(/\/+$/, "");
  const apiKey = (
    process.env.TIBETAN_STT_API_KEY ??
    process.env.SELF_HOSTED_STT_API_KEY ??
    ""
  ).trim();
  return {
    baseUrl,
    apiKey,
    configured: Boolean(baseUrl),
  };
}

export function getTibetanSttStatus() {
  const selfHosted = getSelfHostedSttConfig();
  const monlam = getMonlamConfig();
  const backend: TibetanSttBackend | null = selfHosted.configured
    ? "self_hosted"
    : monlam.configured
      ? "monlam"
      : null;

  return {
    configured: backend !== null,
    backend,
    selfHostedConfigured: selfHosted.configured,
    monlamConfigured: monlam.configured,
    selfHostedUrl: selfHosted.configured ? selfHosted.baseUrl : undefined,
    monlamBaseUrl: monlam.configured ? monlam.baseUrl : undefined,
    lang: MONLAM_TIBETAN_LANG,
  };
}

export function tibetanSttMissingConfigMessage() {
  return (
    "Tibetan STT is not configured. Run services/tibetan-stt on your Mac and set " +
    "TIBETAN_STT_URL or SELF_HOSTED_STT_URL (optional API key), or set MONLAM_API_KEY as a fallback."
  );
}

async function transcribeWithSelfHosted(input: {
  bytes: ArrayBuffer | Uint8Array | Buffer;
  filename: string;
  contentType?: string;
}): Promise<{ text: string; responseTime?: number; model?: string }> {
  const { baseUrl, apiKey } = getSelfHostedSttConfig();
  if (!baseUrl) {
    throw new TibetanSttConfigError(tibetanSttMissingConfigMessage());
  }

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

  const headers: HeadersInit = {};
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const url = `${baseUrl}/transcribe`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: form,
    });
  } catch (error) {
    throw new TibetanSttApiError(
      "Failed to reach self-hosted Tibetan STT",
      502,
      error instanceof Error ? error.message : undefined,
      "self_hosted"
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

    throw new TibetanSttApiError(
      "Self-hosted Tibetan STT request failed",
      response.status >= 400 && response.status < 600 ? response.status : 502,
      detail,
      "self_hosted"
    );
  }

  const result = selfHostedResponseSchema.safeParse(parsed);
  if (!result.success) {
    throw new TibetanSttApiError(
      "Self-hosted Tibetan STT returned an unexpected response",
      502,
      rawText.slice(0, 400),
      "self_hosted"
    );
  }

  const text = (result.data.text ?? result.data.output ?? "").trim();
  if (!text) {
    throw new TibetanSttApiError(
      "Self-hosted Tibetan STT returned empty transcript",
      502,
      undefined,
      "self_hosted"
    );
  }

  const model =
    parsed &&
    typeof parsed === "object" &&
    "model" in parsed &&
    typeof (parsed as { model: unknown }).model === "string"
      ? (parsed as { model: string }).model
      : undefined;
  const responseTime =
    parsed &&
    typeof parsed === "object" &&
    "responseTime" in parsed &&
    typeof (parsed as { responseTime: unknown }).responseTime === "number"
      ? (parsed as { responseTime: number }).responseTime
      : undefined;

  return { text, model, responseTime };
}

/**
 * Prefer self-hosted open Whisper fine-tune; fall back to Monlam cloud if configured.
 */
export async function transcribeTibetanAudio(input: {
  bytes: ArrayBuffer | Uint8Array | Buffer;
  filename: string;
  contentType?: string;
  lang?: string;
}): Promise<{
  text: string;
  backend: TibetanSttBackend;
  id?: string;
  responseTime?: number;
  model?: string;
  file?: string;
}> {
  const status = getTibetanSttStatus();

  if (status.backend === "self_hosted") {
    const result = await transcribeWithSelfHosted(input);
    return { ...result, backend: "self_hosted" };
  }

  if (status.backend === "monlam") {
    try {
      const result = await transcribeAudioWithMonlam(input);
      return { ...result, backend: "monlam" };
    } catch (error) {
      if (error instanceof MonlamConfigError) {
        throw new TibetanSttConfigError(error.message);
      }
      if (error instanceof MonlamApiError) {
        throw new TibetanSttApiError(
          error.message,
          error.status,
          error.details,
          "monlam"
        );
      }
      throw error;
    }
  }

  throw new TibetanSttConfigError(tibetanSttMissingConfigMessage());
}

/** @deprecated Prefer tibetanSttMissingConfigMessage — kept for older UI strings. */
export { monlamMissingKeyMessage };
