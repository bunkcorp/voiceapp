"use client";

import { useEffect, useState, useCallback } from "react";
import { useVoiceStore } from "@/stores/voiceStore";
import { VoiceOrb } from "./VoiceOrb";
import { VoiceControls } from "./VoiceControls";
import { ConnectionStatus } from "./ConnectionStatus";
import { TranscriptPanel } from "./TranscriptPanel";
import { ErrorDisplay } from "./ErrorDisplay";

export function VoiceScreen() {
  const {
    state,
    messages,
    error,
    isMuted,
    audioLevels,
    sessionStartTime,
    isTranscriptVisible,
    setState,
    setError,
    setMuted,
    setSessionStartTime,
    setTranscriptVisible,
    reset,
  } = useVoiceStore();

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!sessionStartTime) {
      const resetTimer = () => setElapsedTime(0);
      resetTimer();
      return;
    }

    const updateElapsed = () => {
      setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sessionStartTime]);

  const handleStart = useCallback(() => {
    setState("requesting_permission");
    setSessionStartTime(Date.now());

    setTimeout(() => {
      setState("connecting");
      setTimeout(() => {
        setState("listening");
      }, 1500);
    }, 500);
  }, [setState, setSessionStartTime]);

  const handleEnd = useCallback(() => {
    setState("ended");
    setSessionStartTime(null);
    setTimeout(() => {
      reset();
    }, 2000);
  }, [setState, setSessionStartTime, reset]);

  const handleToggleMute = useCallback(() => {
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  const handleToggleTranscript = useCallback(() => {
    setTranscriptVisible(!isTranscriptVisible);
  }, [isTranscriptVisible, setTranscriptVisible]);

  const handleSettings = useCallback(() => {
    console.log("Settings clicked");
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    handleStart();
  }, [setError, handleStart]);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, [setError]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black safe-area-inset">
      <header className="flex items-center justify-center py-4 px-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Voice Assistant
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="flex flex-col items-center gap-8">
          <VoiceOrb
            state={state}
            microphoneLevel={audioLevels.microphone}
            speakerLevel={audioLevels.speaker}
          />

          <ConnectionStatus state={state} elapsedTime={elapsedTime} />
        </div>
      </main>

      <footer className="pb-8 pt-4 px-4 safe-area-bottom">
        <VoiceControls
          state={state}
          isMuted={isMuted}
          onStart={handleStart}
          onEnd={handleEnd}
          onToggleMute={handleToggleMute}
          onToggleTranscript={handleToggleTranscript}
          onSettings={handleSettings}
        />
      </footer>

      <TranscriptPanel
        messages={messages}
        isVisible={isTranscriptVisible}
        onClose={() => setTranscriptVisible(false)}
      />

      <ErrorDisplay
        error={error}
        onRetry={handleRetry}
        onDismiss={handleDismissError}
      />
    </div>
  );
}
