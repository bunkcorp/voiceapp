import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireSession, NO_STORE } from "@/lib/server/session";
import {
  StoreRequestError,
  createConversation,
  listConversations,
} from "@/lib/server/store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const conversations = await listConversations();
    return NextResponse.json({ conversations }, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats] list error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to list chats", 500);
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      title?: string;
    };
    const conversation = await createConversation({
      title: typeof body.title === "string" ? body.title : undefined,
    });
    return NextResponse.json(conversation, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats] create error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to create chat", 500);
  }
}
