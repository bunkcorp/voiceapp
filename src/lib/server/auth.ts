import { createHash, createHmac, timingSafeEqual, randomUUID } from "crypto";
import { hashPassword, verifyPassword } from "@/lib/server/password";
import {
  countUsers,
  createUser,
  getUserByEmail,
  listUsers,
  type PublicUser,
} from "@/lib/server/users";
import { normalizeEmail } from "@/lib/server/validation";

export const SESSION_COOKIE = "voice_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  email: string;
};

type SessionPayload = {
  sub: string;
  email: string;
  exp: number;
};

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function timingSafeStringEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

function envFlag(name: string) {
  const value = (process.env[name] ?? "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export function getAuthConfig() {
  const user = (process.env.VOICE_USER ?? "").trim();
  const password = process.env.VOICE_PASS ?? "";
  const sessionSecret = process.env.VOICE_SESSION_SECRET ?? "";
  const aliases = (process.env.VOICE_USER_ALIASES ?? "")
    .split(",")
    .map((alias) => normalizeIdentifier(alias))
    .filter(Boolean);
  const allowEnvLogin = envFlag("VOICE_ALLOW_ENV_LOGIN");

  if (user.includes("@")) {
    const localPart = normalizeIdentifier(user.split("@")[0] ?? "");
    if (localPart && !aliases.includes(localPart)) {
      aliases.push(localPart);
    }
  }

  return { user, password, sessionSecret, aliases, allowEnvLogin };
}

function getSessionSecret() {
  const { sessionSecret, password } = getAuthConfig();
  const secret = sessionSecret || password;
  if (!secret) {
    throw new Error(
      "VOICE_SESSION_SECRET (or VOICE_PASS) is required to sign sessions"
    );
  }
  return secret;
}

export function getSessionSigningSecret() {
  return getSessionSecret();
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const raw = Buffer.from(encoded, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as Partial<SessionPayload>;
    if (
      typeof parsed.sub !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    return { sub: parsed.sub, email: parsed.email, exp: parsed.exp };
  } catch {
    return null;
  }
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("hex");
}

function signaturesMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createSessionToken(user: SessionUser) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const encoded = encodePayload({
    sub: user.id,
    email: normalizeEmail(user.email),
    exp: expiresAt,
  });
  return `${encoded}.${signPayload(encoded)}`;
}

export function readSessionUser(
  token: string | undefined | null
): SessionUser | null {
  if (!token) {
    return null;
  }

  try {
    getSessionSecret();
  } catch {
    return null;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return null;
  }

  let expected: string;
  try {
    expected = signPayload(encoded);
  } catch {
    return null;
  }

  if (!signaturesMatch(signature, expected)) {
    return null;
  }

  const payload = decodePayload(encoded);
  if (!payload) {
    return null;
  }

  if (!Number.isFinite(payload.exp) || payload.exp * 1000 <= Date.now()) {
    return null;
  }

  return { id: payload.sub, email: normalizeEmail(payload.email) };
}

export function isValidSessionToken(token: string | undefined | null) {
  return readSessionUser(token) !== null;
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function safeNextPath(next: string | null | undefined) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/voice";
  }
  return next;
}

function matchesEnvIdentifier(identifier: string) {
  const { user, aliases } = getAuthConfig();
  const submitted = normalizeIdentifier(identifier);
  const allowed = [
    normalizeIdentifier(user),
    ...aliases,
  ].filter(Boolean);

  for (const candidate of allowed) {
    if (timingSafeStringEqual(submitted, candidate)) {
      return true;
    }
  }
  return false;
}

async function findUserByIdentifier(identifier: string) {
  const submitted = normalizeIdentifier(identifier);
  if (!submitted) {
    return null;
  }

  if (submitted.includes("@")) {
    return getUserByEmail(submitted);
  }

  const users = await listUsers();
  const matches = users.filter((user) => {
    const localPart = normalizeEmail(user.email).split("@")[0] ?? "";
    return localPart === submitted;
  });

  if (matches.length !== 1) {
    return null;
  }

  return getUserByEmail(matches[0].email);
}

let seedPromise: Promise<PublicUser | null> | null = null;

/**
 * If the users table is empty and VOICE_USER + VOICE_PASS are set,
 * create the first admin account from env (hashed). Safe to call often.
 */
export async function ensureSeedUser() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const { user, password } = getAuthConfig();
      if (!user || !password || !user.includes("@")) {
        return null;
      }

      const existingCount = await countUsers();
      if (existingCount > 0) {
        return null;
      }

      const passwordHash = await hashPassword(password);
      try {
        return await createUser({
          email: normalizeEmail(user),
          passwordHash,
          id: randomUUID(),
        });
      } catch (error) {
        // Race: another instance seeded first.
        const existing = await getUserByEmail(normalizeEmail(user));
        if (existing) {
          return {
            id: existing.id,
            email: existing.email,
            created_at: existing.created_at,
            updated_at: existing.updated_at,
          };
        }
        throw error;
      }
    })().finally(() => {
      // Allow retry after failures; keep success cached via count > 0.
      seedPromise = null;
    });
  }
  return seedPromise;
}

async function tryEnvEmergencyLogin(
  identifier: string,
  password: string
): Promise<SessionUser | null> {
  const { password: expectedPassword, allowEnvLogin, user } = getAuthConfig();
  if (!allowEnvLogin || !expectedPassword) {
    return null;
  }

  if (!matchesEnvIdentifier(identifier)) {
    return null;
  }

  if (!timingSafeStringEqual(password, expectedPassword)) {
    return null;
  }

  const email = normalizeEmail(user);
  if (!email.includes("@")) {
    return null;
  }

  const stored = await getUserByEmail(email);
  if (!stored) {
    const passwordHash = await hashPassword(password);
    const created = await createUser({ email, passwordHash });
    return { id: created.id, email: created.email };
  }

  return { id: stored.id, email: stored.email };
}

export async function authenticateUser(
  identifier: string,
  password: string
): Promise<SessionUser | null> {
  await ensureSeedUser();

  const stored = await findUserByIdentifier(identifier);
  if (stored) {
    const ok = await verifyPassword(password, stored.password_hash);
    if (ok) {
      return { id: stored.id, email: stored.email };
    }
  }

  // Env plaintext fallback only when explicitly enabled (emergency admin).
  return tryEnvEmergencyLogin(identifier, password);
}

/** Sync env-only check (emergency tooling). Prefer authenticateUser for login. */
export function verifyCredentials(identifier: string, password: string) {
  const { password: expectedPassword } = getAuthConfig();
  if (!expectedPassword) {
    return false;
  }
  if (!matchesEnvIdentifier(identifier)) {
    return false;
  }
  return timingSafeStringEqual(password, expectedPassword);
}
