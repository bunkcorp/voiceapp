import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";

export const NO_STORE = { "Cache-Control": "no-store" };

export function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

export function hasValidSession(request: NextRequest) {
  return isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function requireSession(request: NextRequest) {
  if (!hasValidSession(request)) {
    return jsonError("Unauthorized", 401);
  }
  return null;
}
