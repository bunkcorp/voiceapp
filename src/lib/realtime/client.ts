import type { RealtimeSessionConfig } from "./types";

export const DEFAULT_SESSION_CONFIG: RealtimeSessionConfig = {
  type: "realtime",
  model: "gpt-realtime-2.1",
  audio: {
    input: {
      noise_suppression: true,
    },
    output: {
      voice: "marin",
    },
  },
  turn_detection: {
    type: "server_vad",
    threshold: 0.5,
    prefix_padding_ms: 300,
    silence_duration_ms: 500,
  },
  input_audio_transcription: {
    model: "whisper-1",
  },
};

export async function createRealtimeSession(
  sdpOffer: string
): Promise<string> {
  const response = await fetch("/api/realtime/session", {
    method: "POST",
    body: sdpOffer,
    headers: {
      "Content-Type": "application/sdp",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Failed to create session: ${response.status}`
    );
  }

  return response.text();
}

export function isWebRTCSupported(): boolean {
  return !!(
    typeof window !== "undefined" &&
    window.RTCPeerConnection &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}

export function isAudioContextSupported(): boolean {
  return !!(
    typeof window !== "undefined" &&
    (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
  );
}
