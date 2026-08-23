export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_EXTRACT_CHARS = 24_000;

export const IMAGE_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
] as const;

export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/csv",
] as const;

export const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".pdf",
  ".txt",
  ".md",
  ".csv",
] as const;

export type ChatSummary = {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
};

export type StoredFile = {
  id: string;
  conversation_id: string;
  filename: string;
  mime_type: string;
  size: number;
  storage_key?: string;
  extracted_text?: string | null;
  created_at: number;
};

export type StoredMessage = {
  id: string;
  conversation_id?: string;
  role: "user" | "assistant";
  kind: "text" | "file";
  text: string;
  file_id?: string | null;
  created_at: number;
};

export type ConversationDetail = {
  conversation: ChatSummary;
  messages: StoredMessage[];
  files: StoredFile[];
};

export function titleFromUtterance(text: string) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "New chat";
  }
  return cleaned.length > 60 ? `${cleaned.slice(0, 57).trimEnd()}…` : cleaned;
}

export function extensionOf(filename: string) {
  const match = filename.toLowerCase().match(/\.[a-z0-9]+$/);
  return match?.[0] ?? "";
}

export function isImageMime(mime: string) {
  return (IMAGE_MIME_TYPES as readonly string[]).includes(mime);
}

export function isDocumentMime(mime: string) {
  return (DOCUMENT_MIME_TYPES as readonly string[]).includes(mime);
}

export function fileKind(mime: string, filename: string): "image" | "document" | "file" {
  if (isImageMime(mime) || [".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(extensionOf(filename))) {
    return "image";
  }
  if (
    isDocumentMime(mime) ||
    [".pdf", ".txt", ".md", ".csv"].includes(extensionOf(filename))
  ) {
    return "document";
  }
  return "file";
}
