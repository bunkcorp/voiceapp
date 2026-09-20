#!/usr/bin/env bash
# Start Tibetan STT with API key + port suitable for the Cloudflare tunnel.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${TIBETAN_STT_ENV_FILE:-$HOME/.cloudflared/tibetan-stt.env}"
if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi

# Prefer dedicated STT port (8088) so auth.karmadots.org can keep 8080.
export PORT="${PORT:-8088}"
export STT_MODEL="${STT_MODEL:-billingsmoore/tibetan-asr-nict-tib1-whisper-small}"

if [[ -z "${STT_API_KEY:-}" ]]; then
  KEY_FILE="$HOME/.cloudflared/tibetan-stt-api-key.txt"
  if [[ -f "$KEY_FILE" ]]; then
    export STT_API_KEY
    STT_API_KEY="$(tr -d '[:space:]' < "$KEY_FILE")"
  fi
fi

if [[ -z "${STT_API_KEY:-}" ]]; then
  echo "error: STT_API_KEY unset. Put it in $ENV_FILE or $HOME/.cloudflared/tibetan-stt-api-key.txt" >&2
  exit 1
fi

exec "$ROOT/run.sh"
