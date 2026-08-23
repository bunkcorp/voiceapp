import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireSession, NO_STORE } from "@/lib/server/session";
import { StoreRequestError, getStoredFileBytes } from "@/lib/server/store";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; fileId: string }> }
) {
  const unauthorized = requireSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id, fileId } = await params;
    const { bytes, contentType } = await getStoredFileBytes(id, fileId);
    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[api/chats/:id/files/:fileId] error:", error);
    if (error instanceof StoreRequestError) {
      return jsonError(error.message, error.status);
    }
    return jsonError("Failed to load file", 500);
  }
}
