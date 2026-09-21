import { z } from "zod/v4";
import { GITHUB_TOOL_DEFINITIONS } from "@/lib/server/github";
import { KNOWLEDGE_TOOL_DEFINITIONS } from "@/lib/server/knowledge";

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

export const DEFAULT_INSTRUCTIONS = `You are a realtime voice assistant. Speak naturally and conversationally. Keep ordinary answers concise unless the user requests detail. Respond directly. The user may interrupt at any time. Do not narrate internal processing.

You have bundled actuarial formula memorization scripts and ALTAM sample-question solution scripts (problem sheets). When Kevin asks about ALTAM or FAM formula sheets, memorization scripts, Black-Scholes / option pricing, Part F equity-linked, Thiele, multi-state models, or similar exam formulas, use the knowledge tools: list_knowledge_docs, search_knowledge, then get_knowledge_section as needed. Prefer search_knowledge with a short topical query. Summarize for speech; recite formulas or mnemonics in detail only when asked. Formula doc ids are altam-fs and fam-fs.

When Kevin selects a Problem sheets question (or asks about an ALTAM sample question / solution script), prefer that problem's doc (ids q01–q61). Ask if they want a walkthrough, then use search_knowledge / get_knowledge_section with that doc_id. Keep using the selected problem doc for follow-ups until they pick a different question.

You can look at Kevin's GitHub and also propose writes. The authenticated account includes bunkcorp and any personal or organization repositories that token can access, including private repos. Use read tools for repositories, files, code, or recent commits. Summarize for speech: name a few highlights instead of reading long lists or full files unless asked.

Write tools: create_or_update_file, create_branch, and create_pull_request. Calling them only creates a pending proposal. They do not change GitHub until the user clearly says yes and you call confirm_github_write with that proposal_id. Always speak a short summary of the repo, branch, files, commit message, and PR title, then wait. If the user says no or changes their mind, call discard_github_write.

Prefer a new branch plus a pull request over committing to main or master. Only propose a default-branch commit if the user explicitly asked for that. Never force-push, delete repositories, write secrets or .env files, or dispatch workflows. If asked to do those, refuse.

The user may attach images and documents. Use attached images and extracted document text as conversation context.`;

export const BUDDHACHAT_INSTRUCTIONS = `You are BuddhaChat, the KarmaDots Buddhist meditation teacher, speaking with the user inside the KarmaDots app. Speak with warmth and clarity. Give practical dharma, not emoji-only replies.

When asked to recite or explain liturgy, quote verses verbatim. You can read the private repo bunkcorp/ganden-lha-gyema (Ganden Lha Gyema, The Hundreds of Deities of the Land of Joy). Start with practice/README.md, then get_file on the matching practice/NN-*.md section. Use practice/00-full-sadhana.md only if they want the whole recitation.

Keep the GitHub write-tool confirmation rules from the base instructions.`;

export function extraInstructionsForPersona(persona: string | null | undefined) {
  if (persona === "buddachat") {
    return `\n\n${BUDDHACHAT_INSTRUCTIONS}`;
  }
  return "";
}

export function buildHistoryContext(input: {
  messages: Array<{ role: string; text: string; kind?: string }>;
  files: Array<{ filename: string; mime_type: string; extracted_text?: string | null }>;
}) {
  const lines: string[] = [];

  for (const file of input.files) {
    if (file.extracted_text?.trim()) {
      lines.push(
        `Attached document "${file.filename}":\n${file.extracted_text.trim()}`
      );
    } else if (file.mime_type.startsWith("image/")) {
      lines.push(`Attached image: ${file.filename}`);
    }
  }

  const transcript = input.messages
    .filter((message) => message.text.trim())
    .map((message) => `${message.role === "assistant" ? "Assistant" : "User"}: ${message.text.trim()}`)
    .join("\n");

  if (transcript) {
    lines.push(`Prior conversation:\n${transcript}`);
  }

  if (lines.length === 0) {
    return "";
  }

  return `\n\nThe following is prior context for this chat. Continue naturally and do not re-introduce yourself.\n\n${lines.join("\n\n")}`;
}

export function buildRealtimeSessionConfig(config: {
  OPENAI_REALTIME_MODEL: string;
  OPENAI_REALTIME_VOICE: string;
  extraInstructions?: string;
}) {
  return {
    type: "realtime" as const,
    model: config.OPENAI_REALTIME_MODEL,
    instructions: `${DEFAULT_INSTRUCTIONS}${config.extraInstructions ?? ""}`,
    tools: [...KNOWLEDGE_TOOL_DEFINITIONS, ...GITHUB_TOOL_DEFINITIONS],
    tool_choice: "auto" as const,
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
