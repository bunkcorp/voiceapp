# Self-hosted Tibetan STT (quality-first, local Mac)

Open **Apache-2.0** Lhasa Tibetan speech-to-text for KarmaDots voiceapp.
**No Monlam API key required.** Primary target: your powerful local Mac (128GB RAM / large disk).

## Recommended model

| `STT_MODEL` | Params | Disk (approx) | RAM at inference | Notes |
| --- | --- | --- | --- | --- |
| `billingsmoore/tibetan-asr-nict-tib1-whisper-small` (**default**) | ~244M | ~1 GB | ~2–4 GB | Best published open Tibetan Whisper fine-tune (NICT-Tib1 paper; wins CER/SER/SWER vs tiny/base) |
| `TenzinGayche/tibetan-whisper-small` | ~244M | ~1 GB | ~2–4 GB | Alternate Whisper-small fine-tune (Monlam-adjacent author) |
| `openai/whisper-large-v3` | ~1.5B | ~3 GB | ~6–10 GB | Fits easily in 128GB RAM; **not** Tibetan-fine-tuned — often worse Tibetan than the small fine-tune |

There is **no public Whisper-large Tibetan fine-tune** on Hugging Face today. Bigger ≠ better here: use the small Tibetan fine-tune for quality.

License: **Apache-2.0**. Trained/evaluated on read Lhasa Tibetan; Amdo/Kham/conversational may be weaker.

### Rejected / not primary

| Option | Why |
| --- | --- |
| `pip install monlam-stt` | Thin HF Inference **client** only (`MODEL_AUTH` + remote URL). No local weights. |
| [MonlamAI/stt-audio-pipeline](https://github.com/MonlamAI/stt-audio-pipeline) | Dataset prep, not inference. |
| MonlamAI HF org | Datasets + RoBERTa only — **no** public STT weights. |
| `facebook/mms-1b-all` (`bod`) | Supports Tibetan but **CC-BY-NC** + huge; skip for clear open self-host. |
| Cloudflare Workers AI / Vercel | Wrong place for this model. Run STT on your Mac; point the app at it. |

## Quick start (native Mac — preferred)

```bash
cd services/tibetan-stt
chmod +x run.sh
./run.sh
# listens on http://0.0.0.0:8080
```

First run downloads ~1GB of weights into `~/.cache/huggingface` (one-time). With 128GB RAM this is trivial.

Smoke test:

```bash
curl -s http://127.0.0.1:8080/health | jq
curl -s -F "file=@sample.wav" http://127.0.0.1:8080/transcribe | jq
```

Optional env:

```bash
export STT_API_KEY=change-me          # require Bearer / X-API-Key
export STT_DEVICE=mps                 # force Apple GPU (auto-detected by default)
export STT_MODEL=billingsmoore/tibetan-asr-nict-tib1-whisper-small
export PORT=8080
```

## Docker (optional)

```bash
cd services/tibetan-stt
docker build -t tibetan-stt .
docker run --rm -p 8080:8080 \
  -e STT_API_KEY=change-me \
  tibetan-stt
```

Docker image uses CPU PyTorch wheels (portable). On Apple Silicon prefer `./run.sh` for **MPS** acceleration.

## Wire into voiceapp

### Local voiceapp + local STT (simplest)

```bash
# Terminal A
cd services/tibetan-stt && ./run.sh

# Terminal B — .env.local
SELF_HOSTED_STT_URL=http://127.0.0.1:8080
# alias also accepted:
# TIBETAN_STT_URL=http://127.0.0.1:8080
SELF_HOSTED_STT_API_KEY=   # only if STT_API_KEY is set on the service
npm run dev
```

### Production Vercel → your Mac (Cloudflare Tunnel)

Vercel cannot see `localhost`. Use the dedicated **tibetan-stt** Cloudflare Tunnel
(hostname `tibetan-stt.karmadots.org` → `http://127.0.0.1:8088`). Port **8088** avoids
colliding with `auth.karmadots.org` → `:8080` on the shared `karmadots` tunnel.

One-time setup (already done on Kevin’s Mac if tunnel exists):

```bash
# Account cert must exist (~/.cloudflared/cert.pem from cloudflared tunnel login)
cloudflared tunnel create tibetan-stt
cloudflared tunnel route dns tibetan-stt tibetan-stt.karmadots.org
# Copy cloudflared/config.example.yml → ~/.cloudflared/tibetan-stt.yml and fill UUID
openssl rand -hex 32 > ~/.cloudflared/tibetan-stt-api-key.txt
chmod 600 ~/.cloudflared/tibetan-stt-api-key.txt
```

Keep STT + tunnel running (LaunchAgents):

```bash
# Installer rsyncs to ~/tibetan-stt (required: macOS blocks LaunchAgents on Desktop)
./scripts/install-launchagents.sh
# Logs: ~/Library/Logs/tibetan-stt/
# Manual (from repo, for debugging):
PORT=8088 ./scripts/run-stt.sh
./scripts/run-tunnel.sh
```

Re-run `install-launchagents.sh` after pulling STT code changes so `~/tibetan-stt` stays in sync.

Push env to Vercel (uses the key file; never commit it):

```bash
# from repo root
./scripts/set-vercel-tibetan-stt-env.sh
npx vercel --prod   # pick up new envs
```

| Variable | Value |
| --- | --- |
| `TIBETAN_STT_URL` | `https://tibetan-stt.karmadots.org` |
| `TIBETAN_STT_API_KEY` | same as service `STT_API_KEY` |

Do **not** expose an unauthenticated STT port to the open internet.

### Optional Monlam cloud fallback

```bash
MONLAM_API_KEY=…   # only if you already have one — not required
```

Priority when UI selects **Tibetan**:

1. `SELF_HOSTED_STT_URL` or `TIBETAN_STT_URL` → `POST {url}/transcribe`
2. Else `MONLAM_API_KEY` → Monlam hosted API
3. Else clear “not configured” error

## API

```
GET  /health
POST /transcribe   multipart field: file
```

```json
{
  "text": "…",
  "output": "…",
  "model": "billingsmoore/tibetan-asr-nict-tib1-whisper-small",
  "provider": "self_hosted",
  "lang": "bo",
  "responseTime": 1234,
  "license": "Apache-2.0"
}
```
