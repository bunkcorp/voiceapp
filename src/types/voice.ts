export type VoiceSessionState =
  | "idle"
  | "requesting_permission"
  | "connecting"
  | "listening"
  | "user_speaking"
  | "assistant_processing"
  | "assistant_speaking"
  | "reconnecting"
  | "error"
  | "ended";

export interface MessageFile {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  kind: "image" | "document" | "file";
  extractedText?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  status: "partial" | "complete";
  timestamp: number;
  file?: MessageFile;
}

export interface VoiceError {
  code: string;
  message: string;
  action?: string;
}

export interface AudioLevels {
  microphone: number;
  speaker: number;
}

export interface SessionConfig {
  model?: string;
  voice?: string;
  instructions?: string;
}
