"use client";

import { useLayoutEffect } from "react";
import { ThreadJumpButtons } from "@/components/chat/ThreadJumpButtons";
import { useStickyThreadScroll } from "@/hooks/useStickyThreadScroll";
import type { Message } from "@/types/voice";

interface TranscriptPanelProps {
  messages: Message[];
  isVisible: boolean;
  onClose: () => void;
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function TranscriptPanel({
  messages,
  isVisible,
  onClose,
}: TranscriptPanelProps) {
  const lastMessage = messages[messages.length - 1];
  const {
    scrollRef,
    showJumpTop,
    showJumpBottom,
    scrollToTop,
    scrollToBottom,
    followLatest,
  } = useStickyThreadScroll(isVisible ? "open" : "closed", messages.length);

  useLayoutEffect(() => {
    if (!isVisible) {
      return;
    }
    followLatest();
  }, [followLatest, isVisible, lastMessage?.id, lastMessage?.text, lastMessage?.status]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950 safe-area-inset">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-white/10 dark:bg-neutral-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transcript
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 touch-manipulation"
          aria-label="Close transcript"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No messages yet. Start speaking to see the transcript.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                    } ${message.status === "partial" ? "opacity-75" : ""}`}
                  >
                    {message.file ? (
                      <p className="mb-1 text-xs font-medium opacity-80">
                        {message.file.filename}
                      </p>
                    ) : null}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text || "..."}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">
                    {formatTimestamp(message.timestamp)}
                    {message.status === "partial" && " (typing...)"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <ThreadJumpButtons
          showTop={showJumpTop}
          showBottom={showJumpBottom}
          onTop={() => scrollToTop()}
          onBottom={() => scrollToBottom()}
        />
      </div>
    </div>
  );
}
