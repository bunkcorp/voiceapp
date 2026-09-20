export type SttProvider = "openai" | "monlam";

export const STT_PROVIDER_STORAGE_KEY = "voiceapp.sttProvider";

export function isSttProvider(value: unknown): value is SttProvider {
  return value === "openai" || value === "monlam";
}

export function labelForSttProvider(provider: SttProvider) {
  return provider === "monlam" ? "Tibetan (Monlam)" : "Default (OpenAI)";
}
