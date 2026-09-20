# Quality-first Tibetan STT for local Mac / VPS with ample RAM.
# Default: billingsmoore/tibetan-asr-nict-tib1-whisper-small (Apache-2.0, ~244M).
FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    STT_MODEL=billingsmoore/tibetan-asr-nict-tib1-whisper-small \
    HF_HOME=/models \
    TRANSFORMERS_CACHE=/models \
    TORCH_HOME=/models \
    HF_HUB_ENABLE_HF_TRANSFER=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install torch==2.6.0 torchaudio==2.6.0 \
      --index-url https://download.pytorch.org/whl/cpu \
    && pip install -r requirements.txt \
    && pip install hf_transfer

COPY app ./app

# Prefetch default high-quality weights (~1GB) so cold start skips Hugging Face.
RUN python -c "from transformers import pipeline; pipeline('automatic-speech-recognition', model='billingsmoore/tibetan-asr-nict-tib1-whisper-small')"

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]
