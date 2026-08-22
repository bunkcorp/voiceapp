"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { logVoiceEvent } from "@/lib/realtime/events";

interface UseMicrophoneOptions {
  onAudioLevel?: (level: number) => void;
}

interface UseMicrophoneReturn {
  stream: MediaStream | null;
  isPermissionGranted: boolean;
  isPermissionDenied: boolean;
  isMuted: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  stop: () => void;
}

export function useMicrophone(
  options: UseMicrophoneOptions = {}
): UseMicrophoneReturn {
  const { onAudioLevel } = options;

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const onAudioLevelRef = useRef(onAudioLevel);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    onAudioLevelRef.current = onAudioLevel;
  }, [onAudioLevel]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const startAudioAnalysis = useCallback(() => {
    const analyze = () => {
      if (!analyserRef.current || !onAudioLevelRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      const sum = dataArray.reduce((acc, val) => acc + val, 0);
      const average = sum / dataArray.length;
      const normalizedLevel = Math.min(average / 128, 1);

      onAudioLevelRef.current(isMutedRef.current ? 0 : normalizedLevel);

      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    analyze();
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      logVoiceEvent("requesting microphone permission");

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setStream(mediaStream);
      setIsPermissionGranted(true);
      setIsPermissionDenied(false);
      logVoiceEvent("microphone granted");

      if (onAudioLevel) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;

        const source =
          audioContextRef.current.createMediaStreamSource(mediaStream);
        source.connect(analyserRef.current);

        startAudioAnalysis();
      }

      return true;
    } catch (err) {
      logVoiceEvent("microphone permission denied", { error: err });

      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          setIsPermissionDenied(true);
          setError(
            "Microphone access is blocked. Allow microphone access for this site in your browser settings, then try again."
          );
        } else if (err.name === "NotFoundError") {
          setError(
            "No microphone found. Please connect a microphone and try again."
          );
        } else {
          setError(`Microphone error: ${err.message}`);
        }
      } else {
        setError("Failed to access microphone");
      }

      return false;
    }
  }, [onAudioLevel, startAudioAnalysis]);

  const mute = useCallback(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      setIsMuted(true);
      logVoiceEvent("microphone muted");
    }
  }, [stream]);

  const unmute = useCallback(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      setIsMuted(false);
      logVoiceEvent("microphone unmuted");
    }
  }, [stream]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  }, [isMuted, mute, unmute]);

  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      logVoiceEvent("microphone stopped");
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsPermissionGranted(false);
    setIsMuted(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stream]);

  return {
    stream,
    isPermissionGranted,
    isPermissionDenied,
    isMuted,
    error,
    requestPermission,
    mute,
    unmute,
    toggleMute,
    stop,
  };
}
