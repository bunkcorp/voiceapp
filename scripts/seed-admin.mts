#!/usr/bin/env node
/**
 * Seed the first admin user into Cloudflare D1 via the store Worker.
 *
 * Usage (from repo root, with env loaded):
 *   node --env-file=.env.local --import tsx scripts/seed-admin.mts
 *   # or after building helpers via npx tsx:
 *   npx tsx --env-file=.env.local scripts/seed-admin.mts
 *
 * Requires: CLOUDFLARE_STORE_URL, CLOUDFLARE_STORE_SECRET,
 *           VOICE_USER (email), VOICE_PASS
 */
import { createHash, randomUUID } from "crypto";
import bcrypt from "bcryptjs";

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

async function main() {
  const baseUrl = requireEnv("CLOUDFLARE_STORE_URL").replace(/\/+$/, "");
  const secret = requireEnv("CLOUDFLARE_STORE_SECRET");
  const email = requireEnv("VOICE_USER").toLowerCase();
  const password = requireEnv("VOICE_PASS");

  if (!email.includes("@")) {
    throw new Error("VOICE_USER must be an email address");
  }
  if (password.length < 8) {
    throw new Error("VOICE_PASS must be at least 8 characters");
  }

  const countRes = await fetch(`${baseUrl}/users/count`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  const countData = (await countRes.json()) as { count?: number; error?: string };
  if (!countRes.ok) {
    throw new Error(countData.error || `count failed (${countRes.status})`);
  }

  if (Number(countData.count || 0) > 0) {
    console.log(`Users already exist (count=${countData.count}). Skipping seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const id = randomUUID();
  const createRes = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      email,
      password_hash: passwordHash,
    }),
  });
  const created = (await createRes.json()) as { email?: string; error?: string };
  if (!createRes.ok) {
    throw new Error(created.error || `create failed (${createRes.status})`);
  }

  // Touch hash so unused import tooling stays quiet if bcrypt tree-shakes oddly.
  void createHash;

  console.log(`Seeded admin user: ${created.email}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
