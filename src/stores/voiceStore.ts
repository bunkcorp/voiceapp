import { create } from "zustand";
import type {
  VoiceSessionState,
  Message,
  VoiceError,
  AudioLevels,
} from "@/types/voice";

interface VoiceStore {
  state: VoiceSessionState;
  messages: Message[];
  error: VoiceError | null;
  isMuted: boolean;
  audioLevels: AudioLevels;
  sessionStartTime: number | null;
  isTranscriptVisible: boolean;

  setState: (state: VoiceSessionState) => void;
  setError: (error: VoiceError | null) => void;
  setMuted: (muted: boolean) => void;
  setAudioLevels: (levels: Partial<AudioLevels>) => void;
  setSessionStartTime: (time: number | null) => void;
  setTranscriptVisible: (visible: boolean) => void;

  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;

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

  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),
  updateMessage: (id, updates) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  clearMessages: () => set({ messages: [] }),

  reset: () => set(initialState),
}));
