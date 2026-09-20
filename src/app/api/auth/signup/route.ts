import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  ensureSeedUser,
  sessionCookieOptions,
} from "@/lib/server/auth";
import { hashPassword } from "@/lib/server/password";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { StoreRequestError } from "@/lib/server/store";
import { createUser } from "@/lib/server/users";
import {
  isValidEmail,
  normalizeEmail,
  validatePassword,
} from "@/lib/server/validation";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

async function readBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body: unknown = await request.json();
    const record =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    return {
      email: String(record.email ?? ""),
      password: String(record.password ?? ""),
    };
  }

  const form = await request.formData();
  return {
    email: String(form.get("email") ?? ""),
    password: String(form.get("password") ?? ""),
  };
}

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(`signup:${clientIp(request)}`, 5, 60_000);
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
    const { email, password } = await readBody(request);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400, headers: NO_STORE }
      );
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400, headers: NO_STORE }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({
      email: normalizeEmail(email),
      passwordHash,
    });

    const response = NextResponse.json(
      { ok: true, email: user.email },
      { status: 201, headers: NO_STORE }
    );
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken({ id: user.id, email: user.email }),
      sessionCookieOptions()
    );
    return response;
  } catch (error) {
    if (error instanceof StoreRequestError && error.status === 409) {
      return NextResponse.json(
        { error: "An account with that email already exists" },
        { status: 409, headers: NO_STORE }
      );
    }
    return NextResponse.json(
      { error: "Could not create account" },
      { status: 500, headers: NO_STORE }
    );
  }
}
