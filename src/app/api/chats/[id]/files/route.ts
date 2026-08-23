import { NextRequest, NextResponse } from "next/server";
import {
  MAX_UPLOAD_BYTES,
  fileKind,
  titleFromUtterance,
} from "@/lib/chats";
import { extractFileText } from "@/lib/server/extract";
import { jsonError, requireSession, NO_STORE } from "@/lib/server/session";
import {
  StoreRequestError,
  getConversation,
  updateConversation,
  uploadStoredFile,
  upsertMessages,
} from "@/lib/server/store";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await params;
    await getConversation(id);

    const form = await request.formData();
    const upload = form.get("file");
    if (!(upload instanceof File)) {
      return jsonError("Missing file", 400);
    }
    if (upload.size <= 0) {
      return jsonError("Empty file", 400);
    }
    if (upload.size > MAX_UPLOAD_BYTES) {
      return jsonError("File is larger than 10MB", 400);
    }

    const bytes = new Uint8Array(await upload.arrayBuffer());
    const filename = upload.name || "upload";
    const mimeType = upload.type || "application/octet-stream";
    const extractedText = await extractFileText({ filename, mimeType, bytes });
    const fileId = crypto.randomUUID();
    const stored = await uploadStoredFile({
      conversationId: id,
      id: fileId,
      filename,
      mimeType,
      bytes,
      extractedText,
    });

    const kind = fileKind(stored.mime_type, stored.filename);
    const messageText =
      kind === "image"
        ? `Attached image: ${stored.filename}`
        : `Attached file: ${stored.filename}`;

    const message = {
      id: `file-${fileId}`,
      role: "user" as const,
      kind: "file" as const,
      text: messageText,
      file_id: fileId,
      created_at: stored.created_at,
    };

    await upsertMessages(id, [message]);

    const detail = await getConversation(id);
    if (detail.conversation.title === "New chat") {
      await updateConversation(id, {
        title: titleFromUtterance(stored.filename),
      });
    }

    return NextResponse.json(
      { file: stored, message },
      { headers: NO_STORE }
    );
  } catch (error) {
    console.error("[api/chats/:id/files] error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to upload file", 500);
  }
}
