"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TibetanSttStatus =
  | "idle"
  | "recording"
  | "uploading"
  | "error";

/** @deprecated Use TibetanSttStatus */
export type MonlamSttStatus = TibetanSttStatus;

interface UseTibetanSttOptions {
  onTranscript?: (text: string) => void;
  /** Mute OpenAI mic while recording Tibetan so both don't compete. */
  onRecordingChange?: (recording: boolean) => void;
}

interface UseTibetanSttReturn {
  status: TibetanSttStatus;
  error: string | null;
  configured: boolean | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  toggleRecording: () => Promise<void>;
  clearError: () => void;
}

function pickRecorderMimeType() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export function useTibetanStt(
  options: UseTibetanSttOptions = {}
): UseTibetanSttReturn {
  const { onTranscript, onRecordingChange } = options;
  const [status, setStatus] = useState<TibetanSttStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const onTranscriptRef = useRef(onTranscript);
  const onRecordingChangeRef = useRef(onRecordingChange);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    onRecordingChangeRef.current = onRecordingChange;
  }, [onRecordingChange]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/stt/tibetan", {
          credentials: "same-origin",
        });
        if (!response.ok) {
          if (!cancelled) setConfigured(false);
          return;
        }
        const data = (await response.json()) as { configured?: boolean };
        if (!cancelled) setConfigured(Boolean(data.configured));
      } catch {
        if (!cancelled) setConfigured(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  const uploadRecording = useCallback(async (blob: Blob) => {
    setStatus("uploading");
    onRecordingChangeRef.current?.(false);

    const form = new FormData();
    const extension = blob.type.includes("mp4")
      ? "m4a"
      : blob.type.includes("ogg")
        ? "ogg"
        : "webm";
    form.set("file", blob, `tibetan-recording.${extension}`);
    form.set("lang", "bo");

    const response = await fetch("/api/stt/tibetan", {
      method: "POST",
      credentials: "same-origin",
      body: form,
    });

    const data = (await response.json().catch(() => ({}))) as {
      text?: string;
      error?: string;
      code?: string;
    };

    if (!response.ok) {
      throw new Error(
        data.error ||
          (response.status === 503
            ? "Tibetan STT is not configured on the server."
            : "Tibetan transcription failed")
      );
    }

    const text = data.text?.trim();
    if (!text) {
      throw new Error("Tibetan STT returned an empty transcript");
    }

    onTranscriptRef.current?.(text);
    setStatus("idle");
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);

    if (configured === false) {
      setError(
        "Tibetan STT is not configured. Run services/tibetan-stt on your Mac and set TIBETAN_STT_URL or SELF_HOSTED_STT_URL, or set MONLAM_API_KEY as an optional fallback."
      );
      setStatus("error");
      return;
    }

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setError("This browser cannot record microphone audio.");
      setStatus("error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = pickRecorderMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        setError("Recording failed");
        setStatus("error");
        onRecordingChangeRef.current?.(false);
        cleanupStream();
      };

      recorder.start(250);
      setStatus("recording");
      onRecordingChangeRef.current?.(true);
    } catch (err) {
      cleanupStream();
      const message =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone access is blocked. Allow microphone access, then try again."
          : err instanceof Error
            ? err.message
            : "Failed to start recording";
      setError(message);
      setStatus("error");
    }
  }, [cleanupStream, configured]);

  const stopRecording = useCallback(async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return;
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        resolve(new Blob(chunksRef.current, { type }));
      };
      recorder.onerror = () => reject(new Error("Recording failed"));
      try {
        recorder.stop();
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Recording failed"));
      }
    });

    cleanupStream();

    if (blob.size === 0) {
      setError("Recording was empty. Try again.");
      setStatus("error");
      onRecordingChangeRef.current?.(false);
      return;
    }

    try {
      await uploadRecording(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tibetan transcription failed");
      setStatus("error");
      onRecordingChangeRef.current?.(false);
    }
  }, [cleanupStream, uploadRecording]);

  const toggleRecording = useCallback(async () => {
    if (status === "recording") {
      await stopRecording();
      return;
    }
    if (status === "uploading") {
      return;
    }
    await startRecording();
  }, [startRecording, status, stopRecording]);

  const clearError = useCallback(() => {
    setError(null);
    if (status === "error") {
      setStatus("idle");
    }
  }, [status]);

  useEffect(() => {
    return () => {
      try {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      } catch {
        // ignore
      }
      cleanupStream();
    };
  }, [cleanupStream]);

  return {
    status,
    error,
    configured,
    startRecording,
    stopRecording,
    toggleRecording,
    clearError,
  };
}

/** @deprecated Use useTibetanStt */
export const useMonlamStt = useTibetanStt;
