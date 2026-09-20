#!/usr/bin/env bash
# Push TIBETAN_STT_URL + API key to the Vercel voiceapp project (production + preview + development).
# Reads the key from ~/.cloudflared/tibetan-stt-api-key.txt (never commit that file).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PUBLIC_URL="${TIBETAN_STT_URL:-https://tibetan-stt.karmadots.org}"
KEY_FILE="${TIBETAN_STT_API_KEY_FILE:-$HOME/.cloudflared/tibetan-stt-api-key.txt}"

if [[ ! -f "$KEY_FILE" ]]; then
  echo "error: missing API key file: $KEY_FILE" >&2
  exit 1
fi
API_KEY="$(tr -d '[:space:]' < "$KEY_FILE")"
if [[ -z "$API_KEY" ]]; then
  echo "error: empty API key in $KEY_FILE" >&2
  exit 1
fi

echo "Setting Vercel envs for $PUBLIC_URL …"
for ENV_TARGET in production preview development; do
  npx vercel env add TIBETAN_STT_URL "$ENV_TARGET" --value "$PUBLIC_URL" --force --yes --sensitive
  npx vercel env add TIBETAN_STT_API_KEY "$ENV_TARGET" --value "$API_KEY" --force --yes --sensitive
done

echo "Done. Redeploy production so voice.karmadots.org picks up the vars:"
echo "  npx vercel --prod"
