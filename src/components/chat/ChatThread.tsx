"use client";

import { useLayoutEffect } from "react";
import { ThreadJumpButtons } from "@/components/chat/ThreadJumpButtons";
import { useStickyThreadScroll } from "@/hooks/useStickyThreadScroll";
import type { Message } from "@/types/voice";

interface ChatThreadProps {
  conversationId: string | null;
  messages: Message[];
  emptyLabel?: string;
}

function formatTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function FileCard({
  conversationId,
  message,
  onLoad,
}: {
  conversationId: string;
  message: Message;
  onLoad?: () => void;
}) {
  const file = message.file;
  if (!file) {
    return null;
  }

  const href = `/api/chats/${conversationId}/files/${file.id}`;

  if (file.kind === "image") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={href}
          alt={file.filename}
          className="max-h-56 max-w-full rounded-xl object-cover"
          onLoad={onLoad}
        />
        <p className="mt-1 text-xs opacity-80">{file.filename}</p>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm dark:bg-white/10"
    >
      <span className="truncate font-medium">{file.filename}</span>
      <span className="shrink-0 text-xs opacity-70">
        {Math.max(1, Math.round(file.size / 1024))} KB
      </span>
    </a>
  );
}

export function ChatThread({
  conversationId,
  messages,
  emptyLabel = "Start speaking or type a message.",
}: ChatThreadProps) {
  const lastMessage = messages[messages.length - 1];
  const {
    scrollRef,
    showJumpTop,
    showJumpBottom,
    scrollToTop,
    scrollToBottom,
    followLatest,
  } = useStickyThreadScroll(
    conversationId,
    messages.length
  );

  useLayoutEffect(() => {
    followLatest();
  }, [followLatest, lastMessage?.id, lastMessage?.text, lastMessage?.status]);

  return (
    <div className="absolute inset-0">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            {emptyLabel}
          </p>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
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
                  {message.file && conversationId ? (
                    <div className="mb-2">
                      <FileCard
                      conversationId={conversationId}
                      message={message}
                      onLoad={followLatest}
                    />
                    </div>
                  ) : null}
                  {message.text ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed">...</p>
                  )}
                </div>
                <span className="mt-1 px-1 text-xs text-gray-400">
                  {formatTimestamp(message.timestamp)}
                  {message.status === "partial" ? " (typing…)" : ""}
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
  );
}
