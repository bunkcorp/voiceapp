export type SttProvider = "openai" | "tibetan";

/** Legacy storage value still accepted and normalized to `tibetan`. */
export type LegacySttProvider = "monlam";

export const STT_PROVIDER_STORAGE_KEY = "voiceapp.sttProvider";

export function isSttProvider(value: unknown): value is SttProvider {
  return value === "openai" || value === "tibetan" || value === "monlam";
}

export function normalizeSttProvider(value: unknown): SttProvider {
  if (value === "tibetan" || value === "monlam") {
    return "tibetan";
  }
  return "openai";
}

export function labelForSttProvider(provider: SttProvider) {
  return provider === "tibetan" ? "Tibetan" : "Default (OpenAI)";
}
