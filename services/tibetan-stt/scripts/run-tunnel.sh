#!/usr/bin/env bash
# Run the dedicated tibetan-stt Cloudflare Tunnel (http2).
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
CONFIG="${CLOUDFLARED_CONFIG:-$HOME/.cloudflared/tibetan-stt.yml}"

if [[ ! -f "$CONFIG" ]]; then
  echo "error: missing $CONFIG — copy services/tibetan-stt/cloudflared/config.example.yml and fill tunnel UUID + credentials path" >&2
  exit 1
fi

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "error: cloudflared not on PATH (brew install cloudflared)" >&2
  exit 1
fi

exec cloudflared tunnel --config "$CONFIG" --protocol http2 --retries 8 run
