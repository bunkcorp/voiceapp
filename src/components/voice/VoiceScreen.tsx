"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useVoiceStore } from "@/stores/voiceStore";
import { useRealtimeVoice } from "@/hooks";
import { useChatSession } from "@/hooks/useChatSession";
import { VoiceOrb } from "./VoiceOrb";
import { VoiceControls } from "./VoiceControls";
import { ConnectionStatus } from "./ConnectionStatus";
import { TranscriptPanel } from "./TranscriptPanel";
import { ErrorDisplay } from "./ErrorDisplay";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatThread } from "@/components/chat/ChatThread";
import { Composer } from "@/components/chat/Composer";

function VoiceScreenInner() {
  const {
    messages,
    error,
    audioLevels,
    sessionStartTime,
    isTranscriptVisible,
    setError,
    setTranscriptVisible,
  } = useVoiceStore();

  const {
    state,
    connect,
    disconnect,
    toggleMute,
    sendText,
    sendAttachment,
    isMuted,
  } = useRealtimeVoice();

  const {
    conversations,
    activeId,
    sidebarOpen,
    loadingList,
    loadingChat,
    setSidebarOpen,
    selectChat,
    createChat,
    uploadFile,
  } = useChatSession();

  const [elapsedTime, setElapsedTime] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!sessionStartTime) {
      setElapsedTime(0);
      return;
    }

    const updateElapsed = () => {
      setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const handleStart = useCallback(() => {
    connect();
  }, [connect]);

  const handleEnd = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleToggleMute = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  const handleToggleTranscript = useCallback(() => {
    setTranscriptVisible(!isTranscriptVisible);
  }, [isTranscriptVisible, setTranscriptVisible]);

  const handleSettings = useCallback(() => {
    console.log("Settings clicked");
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    connect();
  }, [setError, connect]);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, [setError]);

  const handleSendText = useCallback(
    (text: string) => {
      sendText(text);
    },
    [sendText]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const message = await uploadFile(file);
        await sendAttachment(message);
      } finally {
        setUploading(false);
      }
    },
    [sendAttachment, uploadFile]
  );

  const activeTitle =
    conversations.find((chat) => chat.id === activeId)?.title ?? "New chat";

  const isVoiceSessionActive = [
    "requesting_permission",
    "connecting",
    "listening",
    "user_speaking",
    "assistant_processing",
    "assistant_speaking",
    "reconnecting",
  ].includes(state);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black safe-area-inset">
      <aside className="hidden w-72 shrink-0 border-r border-gray-200/80 bg-gray-100/80 dark:border-gray-800 dark:bg-black/40 md:flex md:flex-col">
        <div className="px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Recent chats
          </h2>
        </div>
        <div className="min-h-0 flex-1">
          <ChatSidebar
            conversations={conversations}
            activeId={activeId}
            loading={loadingList}
            onNewChat={() => {
              if (state !== "idle" && state !== "ended") {
                disconnect();
              }
              void createChat();
            }}
            onSelect={(id) => {
              if (state !== "idle" && state !== "ended") {
                disconnect();
              }
              selectChat(id);
            }}
          />
        </div>
      </aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close chats"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col bg-gray-100 dark:bg-gray-950">
            <div className="flex items-center justify-between px-4 py-4">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Recent chats
              </h2>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-full px-2 py-1 text-sm text-gray-500"
              >
                Close
              </button>
            </div>
            <ChatSidebar
              conversations={conversations}
              activeId={activeId}
              loading={loadingList}
              onNewChat={() => {
                if (state !== "idle" && state !== "ended") {
                  disconnect();
                }
                void createChat();
              }}
              onSelect={(id) => {
                if (state !== "idle" && state !== "ended") {
                  disconnect();
                }
                selectChat(id);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-full px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            >
              Chats
            </button>
          </div>
          <h1 className="max-w-[46vw] truncate text-center text-lg font-semibold text-gray-900 dark:text-white">
            {activeTitle}
          </h1>
          <div className="justify-self-end">
            <LogoutButton />
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          {isVoiceSessionActive ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 pb-2 pt-1">
              <VoiceOrb
                state={state}
                microphoneLevel={audioLevels.microphone}
                speakerLevel={audioLevels.speaker}
              />
              <ConnectionStatus state={state} elapsedTime={elapsedTime} />
              <button
                type="button"
                onClick={handleToggleTranscript}
                className="rounded-full px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Show transcript
              </button>
            </div>
          ) : (
            <>
              <div className="flex shrink-0 flex-col items-center gap-3 px-4 pb-2 pt-1">
                <div
                  className={
                    messages.length > 0 ? "origin-center scale-75" : undefined
                  }
                >
                  <VoiceOrb
                    state={state}
                    microphoneLevel={audioLevels.microphone}
                    speakerLevel={audioLevels.speaker}
                  />
                </div>
                <ConnectionStatus state={state} elapsedTime={elapsedTime} />
              </div>

              <div className="min-h-0 flex-1">
                {loadingChat ? (
                  <p className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading transcript…
                  </p>
                ) : (
                  <ChatThread conversationId={activeId} messages={messages} />
                )}
              </div>
            </>
          )}
        </main>

        <footer className="space-y-4 px-4 pt-3 pb-6 safe-area-bottom">
          <Composer
            uploading={uploading}
            onSendText={handleSendText}
            onUpload={handleUpload}
          />
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
      </div>

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

export function VoiceScreen() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 text-sm text-gray-500 dark:from-gray-900 dark:to-black dark:text-gray-400">
          Loading…
        </div>
      }
    >
      <VoiceScreenInner />
    </Suspense>
  );
}
