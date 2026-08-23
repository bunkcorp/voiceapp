import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { jsonError, requireSession, NO_STORE } from "@/lib/server/session";
import { StoreRequestError, upsertMessages } from "@/lib/server/store";

export const runtime = "nodejs";

const messagesSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string().min(1),
      role: z.enum(["user", "assistant"]),
      kind: z.enum(["text", "file"]).default("text"),
      text: z.string().default(""),
      file_id: z.string().nullable().optional(),
      created_at: z.number().int().positive(),
    })
  ),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await params;
    const parsed = messagesSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonError("Invalid messages payload", 400);
    }

    await upsertMessages(id, parsed.data.messages);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/chats/:id/messages] error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to save messages", 500);
  }
}
