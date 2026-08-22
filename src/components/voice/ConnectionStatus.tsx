"use client";

import type { VoiceSessionState } from "@/types/voice";

interface ConnectionStatusProps {
  state: VoiceSessionState;
  elapsedTime: number;
}

const stateLabels: Record<VoiceSessionState, string> = {
  idle: "Ready to start",
  requesting_permission: "Requesting microphone access...",
  connecting: "Connecting...",
  listening: "Listening",
  user_speaking: "Listening...",
  assistant_processing: "Thinking...",
  assistant_speaking: "Speaking",
  reconnecting: "Reconnecting...",
  error: "Connection error",
  ended: "Session ended",
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ConnectionStatus({ state, elapsedTime }: ConnectionStatusProps) {
  const label = stateLabels[state];
  const isActive = ["listening", "user_speaking", "assistant_processing", "assistant_speaking"].includes(state);
  const isConnecting = state === "connecting" || state === "reconnecting";
  const isError = state === "error";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isActive
              ? "bg-green-500 animate-pulse"
              : isConnecting
              ? "bg-yellow-500 animate-pulse"
              : isError
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
          aria-hidden="true"
        />
        <span
          className={`text-sm font-medium ${
            isError ? "text-red-500" : "text-gray-700 dark:text-gray-300"
          }`}
          role="status"
          aria-live="polite"
        >
          {label}
        </span>
      </div>
      {isActive && (
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
          {formatTime(elapsedTime)}
        </span>
      )}
    </div>
  );
}
