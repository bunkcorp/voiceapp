#!/usr/bin/env bash
# Native Mac / Linux runner for high-quality Tibetan STT (no Docker required).
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-8080}"
export STT_MODEL="${STT_MODEL:-billingsmoore/tibetan-asr-nict-tib1-whisper-small}"
export HF_HOME="${HF_HOME:-$HOME/.cache/huggingface}"
export TRANSFORMERS_CACHE="${TRANSFORMERS_CACHE:-$HF_HOME}"

if [[ ! -d .venv ]]; then
  python3 -m venv .venv
fi
# shellcheck disable=SC1091
source .venv/bin/activate

python -m pip install -q --upgrade pip
# Prefer Apple MPS / system torch when present; otherwise CPU wheels.
if ! python -c "import torch" 2>/dev/null; then
  if [[ "$(uname -s)" == "Darwin" ]]; then
    pip install -q torch torchaudio
  else
    pip install -q torch==2.6.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu
  fi
fi
pip install -q -r requirements.txt

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "warning: ffmpeg not found on PATH (brew install ffmpeg). webm/mp4 decode may fail." >&2
fi

echo "Starting Tibetan STT on :${PORT}"
echo "  model=${STT_MODEL}"
echo "  cache=${HF_HOME}"
echo "  (first run downloads weights once — you have disk; subsequent starts are fast)"
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT}" --workers 1
