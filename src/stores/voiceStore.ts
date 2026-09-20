import { create } from "zustand";
import type {
  VoiceSessionState,
  Message,
  VoiceError,
  AudioLevels,
} from "@/types/voice";
import {
  isSttProvider,
  normalizeSttProvider,
  STT_PROVIDER_STORAGE_KEY,
  type SttProvider,
} from "@/lib/stt";

export function readStoredSttProvider(): SttProvider {
  if (typeof window === "undefined") {
    return "openai";
  }
  try {
    const stored = window.localStorage.getItem(STT_PROVIDER_STORAGE_KEY);
    if (isSttProvider(stored)) {
      return normalizeSttProvider(stored);
    }
  } catch {
    // ignore
  }
  return "openai";
}

interface VoiceStore {
  state: VoiceSessionState;
  messages: Message[];
  error: VoiceError | null;
  isMuted: boolean;
  audioLevels: AudioLevels;
  sessionStartTime: number | null;
  isTranscriptVisible: boolean;
  sttProvider: SttProvider;

  setState: (state: VoiceSessionState) => void;
  setError: (error: VoiceError | null) => void;
  setMuted: (muted: boolean) => void;
  setAudioLevels: (levels: Partial<AudioLevels>) => void;
  setSessionStartTime: (time: number | null) => void;
  setTranscriptVisible: (visible: boolean) => void;
  setSttProvider: (provider: SttProvider) => void;

  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;

  resetSession: () => void;
  reset: () => void;
}

const initialState = {
  state: "idle" as VoiceSessionState,
  messages: [] as Message[],
  error: null,
  isMuted: false,
  audioLevels: { microphone: 0, speaker: 0 },
  sessionStartTime: null,
  isTranscriptVisible: false,
  sttProvider: "openai" as SttProvider,
};

export const useVoiceStore = create<VoiceStore>((set) => ({
  ...initialState,

  setState: (state) => set({ state }),
  setError: (error) => set({ error }),
  setMuted: (isMuted) => set({ isMuted }),
  setAudioLevels: (levels) =>
    set((s) => ({ audioLevels: { ...s.audioLevels, ...levels } })),
  setSessionStartTime: (sessionStartTime) => set({ sessionStartTime }),
  setTranscriptVisible: (isTranscriptVisible) => set({ isTranscriptVisible }),
  setSttProvider: (sttProvider) => {
    const normalized = normalizeSttProvider(sttProvider);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STT_PROVIDER_STORAGE_KEY, normalized);
      }
    } catch {
      // ignore
    }
    set({ sttProvider: normalized });
  },
  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),
  updateMessage: (id, updates) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),

  resetSession: () =>
    set({
      state: "idle",
      error: null,
      isMuted: false,
      audioLevels: { microphone: 0, speaker: 0 },
      sessionStartTime: null,
    }),
  reset: () => set(initialState),
}));
