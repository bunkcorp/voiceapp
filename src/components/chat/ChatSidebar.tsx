"use client";

import { formatRelativeTime } from "@/lib/time";
import type { ChatSummary } from "@/lib/chats";

interface ChatSidebarProps {
  conversations: ChatSummary[];
  activeId: string | null;
  loading: boolean;
  onNewChat: () => void;
  onSelect: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeId,
  loading,
  onNewChat,
  onSelect,
}: ChatSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pt-3 pb-2">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600 active:bg-green-700"
        >
          New chat
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {loading && conversations.length === 0 ? (
          <p className="px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
            Loading chats…
          </p>
        ) : conversations.length === 0 ? (
          <p className="px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
            No chats yet
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {conversations.map((chat) => {
              const active = chat.id === activeId;
              return (
                <li key={chat.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(chat.id)}
                    className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "bg-white shadow-sm dark:bg-gray-800"
                        : "hover:bg-white/70 dark:hover:bg-gray-800/70"
                    }`}
                  >
                    <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {chat.title || "New chat"}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(chat.updated_at)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
