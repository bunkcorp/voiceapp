import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/server/auth";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

function clearSession(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
}

export async function POST() {
  return clearSession(NextResponse.json({ ok: true }, { headers: NO_STORE }));
}

export async function GET(request: NextRequest) {
  return clearSession(NextResponse.redirect(new URL("/login", request.url)));
}
