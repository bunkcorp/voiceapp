import { create } from "zustand";
import type { ChatSummary } from "@/lib/chats";

interface ChatStore {
  conversations: ChatSummary[];
  activeId: string | null;
  sidebarOpen: boolean;
  loadingList: boolean;
  loadingChat: boolean;

  setConversations: (conversations: ChatSummary[]) => void;
  upsertConversation: (conversation: ChatSummary) => void;
  removeConversation: (id: string) => void;
  setActiveId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoadingList: (loading: boolean) => void;
  setLoadingChat: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  activeId: null,
  sidebarOpen: false,
  loadingList: true,
  loadingChat: false,

  setConversations: (conversations) => set({ conversations }),
  upsertConversation: (conversation) =>
    set((state) => {
      const others = state.conversations.filter((item) => item.id !== conversation.id);
      return {
        conversations: [conversation, ...others].sort(
          (a, b) => b.updated_at - a.updated_at
        ),
      };
    }),
  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((item) => item.id !== id),
      activeId: state.activeId === id ? null : state.activeId,
    })),
  setActiveId: (activeId) => set({ activeId }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setLoadingList: (loadingList) => set({ loadingList }),
  setLoadingChat: (loadingChat) => set({ loadingChat }),
}));
