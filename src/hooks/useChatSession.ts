"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fileKind, titleFromUtterance } from "@/lib/chats";
import type { ConversationDetail } from "@/lib/chats";
import { useChatStore } from "@/stores/chatStore";
import { useVoiceStore } from "@/stores/voiceStore";
import type { Message } from "@/types/voice";

function detailToMessages(detail: ConversationDetail): Message[] {
  const files = new Map(detail.files.map((file) => [file.id, file]));
  return detail.messages.map((message) => {
    const file = message.file_id ? files.get(message.file_id) : undefined;
    return {
      id: message.id,
      role: message.role,
      text: message.text,
      status: "complete" as const,
      timestamp: message.created_at,
      file: file
        ? {
            id: file.id,
            filename: file.filename,
            mimeType: file.mime_type,
            size: file.size,
            kind: fileKind(file.mime_type, file.filename),
            extractedText: file.extracted_text ?? undefined,
          }
        : undefined,
    };
  });
}

function persistableMessages(messages: Message[]) {
  return messages
    .filter((message) => message.status === "complete" && (message.text.trim() || message.file))
    .map((message) => ({
      id: message.id,
      role: message.role,
      kind: message.file ? ("file" as const) : ("text" as const),
      text: message.text,
      file_id: message.file?.id ?? null,
      created_at: message.timestamp,
    }));
}

export function useChatSession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("c");
  const persistTimer = useRef<number>(0);
  const lastSaved = useRef("");
  const titleSetFor = useRef<string>("");
  const creatingRef = useRef(false);

  const {
    conversations,
    activeId,
    sidebarOpen,
    loadingList,
    loadingChat,
    setConversations,
    upsertConversation,
    setActiveId,
    setSidebarOpen,
    setLoadingList,
    setLoadingChat,
  } = useChatStore();

  const { messages, setMessages, addMessage } = useVoiceStore();

  const selectChat = useCallback(
    (id: string, replace = false) => {
      const method = replace ? router.replace : router.push;
      method(`/voice?c=${encodeURIComponent(id)}`);
    },
    [router]
  );

  const loadConversation = useCallback(async (id: string) => {
    setLoadingChat(true);
    try {
      const response = await fetch(`/api/chats/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load chat");
      }
      const detail = (await response.json()) as ConversationDetail;
      setActiveId(detail.conversation.id);
      upsertConversation(detail.conversation);
      setMessages(detailToMessages(detail));
      lastSaved.current = JSON.stringify(persistableMessages(detailToMessages(detail)));
      if (detail.conversation.title !== "New chat") {
        titleSetFor.current = detail.conversation.id;
      }
    } finally {
      setLoadingChat(false);
    }
  }, [setActiveId, setLoadingChat, setMessages, upsertConversation]);

  const createChat = useCallback(async () => {
    if (creatingRef.current) {
      return useChatStore.getState().activeId ?? "";
    }
    creatingRef.current = true;
    try {
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error("Failed to create chat");
    }
    const conversation = await response.json();
    upsertConversation(conversation);
    setActiveId(conversation.id);
    setMessages([]);
    lastSaved.current = "[]";
    titleSetFor.current = "";
    selectChat(conversation.id);
    setSidebarOpen(false);
    return conversation.id as string;
    } finally {
      creatingRef.current = false;
    }
  }, [selectChat, setActiveId, setMessages, setSidebarOpen, upsertConversation]);

  const persistMessages = useCallback(async (conversationId: string, next: Message[]) => {
    const payload = persistableMessages(next);
    const serialized = JSON.stringify(payload);
    if (serialized === lastSaved.current) {
      return;
    }

    const response = await fetch(`/api/chats/${conversationId}/messages`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: payload }),
    });
    if (response.ok) {
      lastSaved.current = serialized;
      const firstUser = payload.find((message) => message.role === "user" && message.text.trim());
      if (firstUser && titleSetFor.current !== conversationId) {
        const title = titleFromUtterance(firstUser.text.replace(/^Attached (image|file): /i, ""));
        await fetch(`/api/chats/${conversationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        titleSetFor.current = conversationId;
        const current = useChatStore
          .getState()
          .conversations.find((item) => item.id === conversationId);
        upsertConversation({
          id: conversationId,
          title,
          created_at: current?.created_at ?? Date.now(),
          updated_at: Date.now(),
        });
      } else {
        const current = useChatStore
          .getState()
          .conversations.find((item) => item.id === conversationId);
        if (current) {
          upsertConversation({ ...current, updated_at: Date.now() });
        }
      }
    }
  }, [upsertConversation]);

  const uploadFile = useCallback(
    async (file: File) => {
      let conversationId = useChatStore.getState().activeId;
      if (!conversationId) {
        conversationId = await createChat();
      }

      const form = new FormData();
      form.set("file", file);
      const response = await fetch(`/api/chats/${conversationId}/files`, {
        method: "POST",
        body: form,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const stored = data.file as {
        id: string;
        filename: string;
        mime_type: string;
        size: number;
        extracted_text?: string;
        created_at: number;
      };
      const message: Message = {
        id: data.message.id,
        role: "user",
        text: data.message.text,
        status: "complete",
        timestamp: stored.created_at,
        file: {
          id: stored.id,
          filename: stored.filename,
          mimeType: stored.mime_type,
          size: stored.size,
          kind: fileKind(stored.mime_type, stored.filename),
          extractedText: stored.extracted_text,
        },
      };
      addMessage(message);
      return message;
    },
    [addMessage, createChat]
  );

  useEffect(() => {
    let cancelled = false;
    async function loadList() {
      setLoadingList(true);
      try {
        const response = await fetch("/api/chats");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { conversations: typeof conversations };
        if (!cancelled) {
          setConversations(data.conversations ?? []);
        }
      } finally {
        if (!cancelled) {
          setLoadingList(false);
        }
      }
    }
    void loadList();
    return () => {
      cancelled = true;
    };
  }, [setConversations, setLoadingList]);

  useEffect(() => {
    if (requestedId) {
      if (requestedId !== activeId) {
        void loadConversation(requestedId);
      }
      return;
    }

    if (loadingList) {
      return;
    }

    if (conversations[0]) {
      selectChat(conversations[0].id, true);
      return;
    }

    void createChat();
  }, [
    activeId,
    conversations,
    createChat,
    loadConversation,
    loadingList,
    requestedId,
    selectChat,
  ]);

  useEffect(() => {
    if (!activeId) {
      return;
    }
    window.clearTimeout(persistTimer.current);
    persistTimer.current = window.setTimeout(() => {
      void persistMessages(activeId, messages);
    }, 700);
    return () => window.clearTimeout(persistTimer.current);
  }, [activeId, messages, persistMessages]);

  return {
    conversations,
    activeId,
    sidebarOpen,
    loadingList,
    loadingChat,
    setSidebarOpen,
    selectChat,
    createChat,
    uploadFile,
  };
}
