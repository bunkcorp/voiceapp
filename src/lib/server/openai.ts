import { z } from "zod/v4";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  OPENAI_REALTIME_MODEL: z.string().default("gpt-realtime-2.1"),
  OPENAI_REALTIME_VOICE: z.string().default("marin"),
});

export function getOpenAIConfig() {
  const result = envSchema.safeParse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_REALTIME_MODEL: process.env.OPENAI_REALTIME_MODEL,
    OPENAI_REALTIME_VOICE: process.env.OPENAI_REALTIME_VOICE,
  });

  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.error.message}`);
  }

  return result.data;
}

export const DEFAULT_INSTRUCTIONS = `You are a realtime voice assistant. Speak naturally and conversationally. Keep ordinary answers concise unless the user requests detail. Respond directly. The user may interrupt at any time. Do not narrate internal processing.`;

export function buildRealtimeSessionConfig(config: {
  OPENAI_REALTIME_MODEL: string;
  OPENAI_REALTIME_VOICE: string;
}) {
  return {
    type: "realtime" as const,
    model: config.OPENAI_REALTIME_MODEL,
    instructions: DEFAULT_INSTRUCTIONS,
    audio: {
      input: {
        transcription: {
          model: "gpt-4o-mini-transcribe",
        },
        turn_detection: {
          type: "server_vad" as const,
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      },
      output: {
        voice: config.OPENAI_REALTIME_VOICE,
      },
    },
  };
}
