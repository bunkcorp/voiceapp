"""
Self-hosted Tibetan speech-to-text (quality-first for local Mac / GPU / big RAM).

Default model (Apache-2.0) — best open Tibetan Whisper fine-tune with published metrics:
  billingsmoore/tibetan-asr-nict-tib1-whisper-small  (~244M params)

There is currently no public Whisper-large Tibetan fine-tune on Hugging Face.
With 128GB RAM you can still override STT_MODEL to try larger multilingual bases
(e.g. openai/whisper-large-v3), but expect weaker Tibetan quality than this fine-tune.

Optional Monlam-adjacent open weights:
  TenzinGayche/tibetan-whisper-small

Set STT_MODEL to override. Optional STT_API_KEY guards the HTTP API.
"""

from __future__ import annotations

import io
import os
import tempfile
import time
from functools import lru_cache
from typing import Any

import librosa
import numpy as np
import soundfile as sf
import torch
from fastapi import Depends, FastAPI, File, Header, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from transformers import pipeline

DEFAULT_MODEL = "billingsmoore/tibetan-asr-nict-tib1-whisper-small"
MAX_AUDIO_BYTES = 25 * 1024 * 1024
SAMPLE_RATE = 16_000

app = FastAPI(
    title="Tibetan STT",
    description="Open Apache-2.0 Whisper fine-tune for Lhasa Tibetan ASR (local high-quality)",
    version="1.1.0",
)


def _env(name: str, default: str = "") -> str:
    return (os.getenv(name) or default).strip()


def pick_device() -> str | int:
    """Prefer CUDA, then Apple MPS, else CPU. Fits comfortably in 128GB RAM either way."""
    forced = _env("STT_DEVICE").lower()
    if forced in {"cpu", "cuda", "mps"}:
        if forced == "cuda" and not torch.cuda.is_available():
            raise RuntimeError("STT_DEVICE=cuda but CUDA is not available")
        if forced == "mps" and not torch.backends.mps.is_available():
            raise RuntimeError("STT_DEVICE=mps but Apple MPS is not available")
        return forced
    if torch.cuda.is_available():
        return 0
    if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available():
        return "mps"
    return -1


def require_api_key(
    authorization: str | None = Header(default=None),
    x_api_key: str | None = Header(default=None),
) -> None:
    expected = _env("STT_API_KEY")
    if not expected:
        return

    token = ""
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization[7:].strip()
    elif x_api_key:
        token = x_api_key.strip()

    if token != expected:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


@lru_cache(maxsize=1)
def get_asr_pipeline() -> Any:
    model_id = _env("STT_MODEL", DEFAULT_MODEL)
    device = pick_device()
    dtype = torch.float16 if device not in (-1, "cpu") else torch.float32
    return pipeline(
        "automatic-speech-recognition",
        model=model_id,
        device=device,
        torch_dtype=dtype,
        chunk_length_s=30,
        stride_length_s=5,
    )


def load_audio_mono_16k(raw: bytes, filename: str) -> np.ndarray:
    """Decode uploaded audio to float32 mono @ 16 kHz."""
    suffix = os.path.splitext(filename or "audio.webm")[1] or ".webm"
    try:
        with io.BytesIO(raw) as buf:
            audio, sr = sf.read(buf, always_2d=False)
        if getattr(audio, "ndim", 1) > 1:
            audio = np.mean(audio, axis=1)
        if sr != SAMPLE_RATE:
            audio = librosa.resample(
                np.asarray(audio, dtype=np.float32),
                orig_sr=sr,
                target_sr=SAMPLE_RATE,
            )
        return np.asarray(audio, dtype=np.float32)
    except Exception:
        pass

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(raw)
        path = tmp.name
    try:
        audio, _sr = librosa.load(path, sr=SAMPLE_RATE, mono=True)
        return np.asarray(audio, dtype=np.float32)
    finally:
        try:
            os.unlink(path)
        except OSError:
            pass


@app.on_event("startup")
def warm_model() -> None:
    get_asr_pipeline()


@app.get("/health")
def health() -> dict[str, Any]:
    model_id = _env("STT_MODEL", DEFAULT_MODEL)
    device = pick_device()
    device_label = (
        "cuda"
        if device == 0 or device == "cuda"
        else "mps"
        if device == "mps"
        else "cpu"
    )
    return {
        "ok": True,
        "model": model_id,
        "device": device_label,
        "license": "Apache-2.0",
        "auth_required": bool(_env("STT_API_KEY")),
        "default_model": DEFAULT_MODEL,
    }


@app.post("/transcribe")
async def transcribe(
    file: UploadFile = File(...),
    _: None = Depends(require_api_key),
) -> JSONResponse:
    started = time.perf_counter()
    raw = await file.read()
    if not raw:
        raise HTTPException(status_code=400, detail="Audio file is empty")
    if len(raw) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=400, detail="Audio file is larger than 25MB")

    try:
        audio = load_audio_mono_16k(raw, file.filename or "audio.webm")
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=400,
            detail=f"Failed to decode audio: {exc}",
        ) from exc

    if audio.size == 0:
        raise HTTPException(status_code=400, detail="Decoded audio is empty")

    asr = get_asr_pipeline()
    try:
        result = asr(audio)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Transcription failed: {exc}",
        ) from exc

    text = ""
    if isinstance(result, dict):
        text = str(result.get("text") or "").strip()
    elif isinstance(result, str):
        text = result.strip()

    if not text:
        raise HTTPException(status_code=502, detail="Model returned empty transcript")

    elapsed_ms = int((time.perf_counter() - started) * 1000)
    model_id = _env("STT_MODEL", DEFAULT_MODEL)
    return JSONResponse(
        {
            "text": text,
            "output": text,
            "model": model_id,
            "provider": "self_hosted",
            "lang": "bo",
            "responseTime": elapsed_ms,
            "license": "Apache-2.0",
        }
    )
