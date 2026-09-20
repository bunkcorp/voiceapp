import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  authenticateUser,
  createSessionToken,
  ensureSeedUser,
  sessionCookieOptions,
} from "@/lib/server/auth";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

function invalidCredentials() {
  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401, headers: NO_STORE }
  );
}

async function readCredentials(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body: unknown = await request.json();
    const record =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    return {
      identifier: String(
        record.identifier ?? record.email ?? record.username ?? ""
      ),
      password: String(record.password ?? ""),
    };
  }

  const form = await request.formData();
  return {
    identifier: String(
      form.get("identifier") ?? form.get("email") ?? form.get("username") ?? ""
    ),
    password: String(form.get("password") ?? ""),
  };
}

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(`login:${clientIp(request)}`, 10, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Try again shortly." },
        {
          status: 429,
          headers: {
            ...NO_STORE,
            "Retry-After": String(limited.retryAfterSeconds),
          },
        }
      );
    }

    await ensureSeedUser();
    const { identifier, password } = await readCredentials(request);
    if (!identifier.trim() || !password) {
      return invalidCredentials();
    }

    const user = await authenticateUser(identifier, password);
    if (!user) {
      return invalidCredentials();
    }

    const response = NextResponse.json(
      { ok: true, email: user.email },
      { headers: NO_STORE }
    );
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken(user),
      sessionCookieOptions()
    );
    return response;
  } catch {
    return invalidCredentials();
  }
}
