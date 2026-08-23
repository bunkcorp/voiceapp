import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireSession, NO_STORE } from "@/lib/server/session";
import {
  StoreRequestError,
  deleteConversation,
  getConversation,
  updateConversation,
} from "@/lib/server/store";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await params;
    const detail = await getConversation(id);
    return NextResponse.json(detail, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats/:id] get error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status === 404 ? 404 : error.status);
    }
    return jsonError("Failed to load chat", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as { title?: string };
    const conversation = await updateConversation(id, {
      title: typeof body.title === "string" ? body.title : undefined,
    });
    return NextResponse.json(conversation, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats/:id] patch error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to update chat", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await params;
    await deleteConversation(id);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats/:id] delete error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to delete chat", 500);
  }
}
