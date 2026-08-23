import { createHash, createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "voice_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const DEFAULT_USER = "kevinalexwoods@gmail.com";

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function timingSafeStringEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

export function getAuthConfig() {
  const user = (process.env.VOICE_USER ?? DEFAULT_USER).trim();
  const password = process.env.VOICE_PASS ?? "";
  const sessionSecret = process.env.VOICE_SESSION_SECRET ?? "";
  const aliases = (process.env.VOICE_USER_ALIASES ?? "")
    .split(",")
    .map((alias) => normalizeIdentifier(alias))
    .filter(Boolean);

  if (user.includes("@")) {
    const localPart = normalizeIdentifier(user.split("@")[0] ?? "");
    if (localPart && !aliases.includes(localPart)) {
      aliases.push(localPart);
    }
  }

  return { user, password, sessionSecret, aliases };
}

export function getAllowedIdentifiers() {
  const { user, aliases } = getAuthConfig();
  const identifiers = [normalizeIdentifier(user), ...aliases];
  return [...new Set(identifiers.filter(Boolean))];
}

function getSessionSecret() {
  const { sessionSecret, password } = getAuthConfig();
  return sessionSecret || password;
}

export function getSessionSigningSecret() {
  return getSessionSecret();
}

export function verifyCredentials(identifier: string, password: string) {
  const { password: expectedPassword } = getAuthConfig();
  if (!expectedPassword) {
    return false;
  }

  const submitted = normalizeIdentifier(identifier);
  let identifierMatches = false;
  for (const allowed of getAllowedIdentifiers()) {
    if (timingSafeStringEqual(submitted, allowed)) {
      identifierMatches = true;
    }
  }

  const passwordMatches = timingSafeStringEqual(password, expectedPassword);
  return identifierMatches && passwordMatches;
}

export function createSessionToken() {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("Session secret is not configured");
  }

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function isValidSessionToken(token: string | undefined | null) {
  if (!token) {
    return false;
  }

  const secret = getSessionSecret();
  if (!secret) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt * 1000 <= Date.now()) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
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
