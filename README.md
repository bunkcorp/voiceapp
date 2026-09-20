# Voice Assistant (KarmaDots)

Next.js App Router app for realtime voice chat at [voice.karmadots.org](https://voice.karmadots.org).
Chat history lives in Cloudflare D1 + R2/KV via the `voiceapp-store` Worker; the Next app runs on Vercel.

## Auth

Accounts are stored in the same Cloudflare D1 database (`users` table) through the store Worker.
Passwords are hashed with **bcryptjs** in the Next.js API routes — plaintext is never stored.

| Route | Access |
| --- | --- |
| `/login` | Public |
| `/signup` | Public |
| `/change-password` | Signed-in only |
| `/voice` | Signed-in only |

Session cookie: `voice_session` (HMAC-signed payload with user id + email).

### First account (seed)

When the `users` table is empty, the next login/signup attempt automatically seeds an admin from env if both are set:

- `VOICE_USER` — email address
- `VOICE_PASS` — password (hashed on insert)

Or seed explicitly:

```bash
npx tsx --env-file=.env.local scripts/seed-admin.mts
```

After at least one user exists, login uses the database only (hashed passwords).

### Create another account

Open `/signup`, or use “Create one” on the login page.

### Change password

While signed in, open **Account** in the voice header (or `/change-password`). Enter your current password and a new one (min 8 characters).

### Emergency env login (optional)

Set `VOICE_ALLOW_ENV_LOGIN=true` only if you need a break-glass path that still accepts plaintext `VOICE_USER` / `VOICE_PASS` against env. Prefer seeding once and turning this off. Keep `VOICE_SESSION_SECRET` set so you can rotate `VOICE_PASS` without invalidating all sessions.

## Environment variables

Copy `.env.example` to `.env.local` (never commit secrets).

**Required for auth + chats**

| Variable | Purpose |
| --- | --- |
| `VOICE_SESSION_SECRET` | HMAC secret for `voice_session` cookies |
| `CLOUDFLARE_STORE_URL` | Store Worker base URL (e.g. `https://voice-store.karmadots.org`) |
| `CLOUDFLARE_STORE_SECRET` | Bearer token matching Worker `STORE_SECRET` |

**Bootstrap / emergency**

| Variable | Purpose |
| --- | --- |
| `VOICE_USER` | Admin email for first-run seed |
| `VOICE_PASS` | Admin password for first-run seed (and optional emergency login) |
| `VOICE_USER_ALIASES` | Optional comma-separated usernames for env emergency login |
| `VOICE_ALLOW_ENV_LOGIN` | `true` to allow env plaintext login after users exist |

**OpenAI / GitHub** — see `.env.example`.

## Cloudflare store deploy (users migration)

From `cloudflare/voiceapp-store`:

```bash
# Apply D1 migration (users table)
npx wrangler d1 migrations apply voiceapp-chats --remote

# Deploy Worker (also auto-creates users table on first /users hit)
npx wrangler deploy
```

Set `STORE_SECRET` as a Worker secret (`wrangler secret put STORE_SECRET`) and match it in Vercel as `CLOUDFLARE_STORE_SECRET`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npx tsc --noEmit
```

## Deploy (Vercel)

1. Deploy/migrate the Cloudflare store Worker (above).
2. Set Vercel env vars from the table above (Production + Preview as needed).
3. Deploy the Next.js app (`vercel` or Git integration).
4. Hit `/login` once with `VOICE_USER` / `VOICE_PASS` set to seed, or run `scripts/seed-admin.mts`, or use `/signup`.
