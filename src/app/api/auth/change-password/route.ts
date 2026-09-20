import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  readSessionUser,
  sessionCookieOptions,
} from "@/lib/server/auth";
import { hashPassword, verifyPassword } from "@/lib/server/password";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { getUserByEmail, getUserById, updateUserPassword } from "@/lib/server/users";
import { validatePassword } from "@/lib/server/validation";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

async function readBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body: unknown = await request.json();
    const record =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    return {
      currentPassword: String(record.currentPassword ?? record.password ?? ""),
      newPassword: String(record.newPassword ?? ""),
    };
  }

  const form = await request.formData();
  return {
    currentPassword: String(
      form.get("currentPassword") ?? form.get("password") ?? ""
    ),
    newPassword: String(form.get("newPassword") ?? ""),
  };
}

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(`change-password:${clientIp(request)}`, 8, 60_000);
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

    const session = readSessionUser(
      request.cookies.get(SESSION_COOKIE)?.value
    );
    const { currentPassword, newPassword } = await readBody(request);

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400, headers: NO_STORE }
      );
    }

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400, headers: NO_STORE }
      );
    }

    const user =
      (session ? await getUserById(session.id) : null) ??
      (session ? await getUserByEmail(session.email) : null);

    if (!user) {
      return NextResponse.json(
        { error: "Sign in to change your password" },
        { status: 401, headers: NO_STORE }
      );
    }

    const currentOk = await verifyPassword(currentPassword, user.password_hash);
    if (!currentOk) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401, headers: NO_STORE }
      );
    }

    const passwordHash = await hashPassword(newPassword);
    const updated = await updateUserPassword(user.id, passwordHash);

    const response = NextResponse.json({ ok: true }, { headers: NO_STORE });
    // Refresh session binding after password change.
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken({ id: updated.id, email: updated.email }),
      sessionCookieOptions()
    );
    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not change password" },
      { status: 500, headers: NO_STORE }
    );
  }
}
