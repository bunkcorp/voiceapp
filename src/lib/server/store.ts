import type {
  ChatSummary,
  ConversationDetail,
  StoredFile,
  StoredMessage,
} from "@/lib/chats";

function storeConfig() {
  const baseUrl = (process.env.CLOUDFLARE_STORE_URL ?? "").replace(/\/+$/, "");
  const secret = process.env.CLOUDFLARE_STORE_SECRET ?? "";
  if (!baseUrl || !secret) {
    throw new Error("Chat store is not configured");
  }
  return { baseUrl, secret };
}

async function storeFetch(path: string, init: RequestInit = {}) {
  const { baseUrl, secret } = storeConfig();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${secret}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  return response;
}

export async function storeJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await storeFetch(path, init);
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new StoreRequestError(data.error || "Store request failed", response.status);
  }
  return data;
}

export class StoreRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function listConversations() {
  const data = await storeJson<{ conversations: ChatSummary[] }>("/conversations");
  return data.conversations ?? [];
}

export async function createConversation(input?: { id?: string; title?: string }) {
  return storeJson<ChatSummary>("/conversations", {
    method: "POST",
    body: JSON.stringify(input ?? {}),
  });
}

export async function getConversation(id: string) {
  return storeJson<ConversationDetail>(`/conversations/${id}`);
}

export async function updateConversation(id: string, input: { title?: string }) {
  return storeJson<ChatSummary>(`/conversations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteConversation(id: string) {
  return storeJson<{ ok: boolean }>(`/conversations/${id}`, { method: "DELETE" });
}

export async function upsertMessages(conversationId: string, messages: StoredMessage[]) {
  return storeJson<{ ok: boolean; count: number }>(
    `/conversations/${conversationId}/messages`,
    {
      method: "PUT",
      body: JSON.stringify({ messages }),
    }
  );
}

export async function uploadStoredFile(input: {
  conversationId: string;
  id: string;
  filename: string;
  mimeType: string;
  bytes: Uint8Array;
  extractedText: string;
}) {
  const form = new FormData();
  form.set(
    "file",
    new Blob([Buffer.from(input.bytes)], { type: input.mimeType }),
    input.filename
  );
  form.set("id", input.id);
  form.set("filename", input.filename);
  form.set("mime_type", input.mimeType);
  form.set("extracted_text", input.extractedText);

  return storeJson<StoredFile>(`/conversations/${input.conversationId}/files`, {
    method: "POST",
    body: form,
  });
}

export async function getStoredFileBytes(conversationId: string, fileId: string) {
  const response = await storeFetch(
    `/conversations/${conversationId}/files/${fileId}`
  );
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new StoreRequestError(data.error || "File not found", response.status);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  return {
    bytes,
    contentType: response.headers.get("content-type") || "application/octet-stream",
  };
}
