import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken, safeNextPath } from "@/lib/server/auth";

const PUBLIC_PAGES = new Set(["/login", "/signup"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = isValidSessionToken(token);

  // Public auth pages: allow signed-out users; send signed-in users onward.
  if (PUBLIC_PAGES.has(pathname)) {
    if (authed) {
      const next = safeNextPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  // Login / signup / change-password APIs stay public (handlers enforce auth).
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(authed ? "/voice" : "/login", request.url));
  }

  // /change-password requires a session; redirect to login with next= so the
  // form is reachable right after sign-in.
  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/signup/:path*",
    "/change-password",
    "/change-password/:path*",
    "/voice/:path*",
    "/api/realtime/:path*",
    "/api/github/:path*",
    "/api/chats",
    "/api/chats/:path*",
    "/api/auth/:path*",
  ],
};
