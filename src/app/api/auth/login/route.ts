import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/server/auth";

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
    const { identifier, password } = await readCredentials(request);

    if (!verifyCredentials(identifier, password)) {
      return invalidCredentials();
    }

    const response = NextResponse.json({ ok: true }, { headers: NO_STORE });
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken(),
      sessionCookieOptions()
    );
    return response;
  } catch {
    return invalidCredentials();
  }
}
