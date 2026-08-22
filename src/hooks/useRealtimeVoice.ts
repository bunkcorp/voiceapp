"use client";

import { useRef, useCallback, useEffect } from "react";
import { useVoiceStore } from "@/stores/voiceStore";
import { useMicrophone } from "./useMicrophone";
import {
  parseRealtimeEvent,
  logVoiceEvent,
  createResponseCancelEvent,
} from "@/lib/realtime/events";
import type { VoiceSessionState } from "@/types/voice";
import type {
  RealtimeEvent,
  SessionCreatedEvent,
  SpeechStartedEvent,
  TranscriptDeltaEvent,
  TranscriptDoneEvent,
  ResponseDoneEvent,
  ErrorEvent,
} from "@/lib/realtime/types";

interface UseRealtimeVoiceReturn {
  state: VoiceSessionState;
  connect: () => Promise<void>;
  disconnect: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

export function useRealtimeVoice(): UseRealtimeVoiceReturn {
  const {
    state,
    isMuted,
    setState,
    setError,
    setMuted,
    setAudioLevels,
    setSessionStartTime,
    addMessage,
    updateMessage,
    clearMessages,
    reset,
  } = useVoiceStore();

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const currentAssistantMessageRef = useRef<string | null>(null);
  const currentUserMessageRef = useRef<string | null>(null);

  const {
    stream,
    requestPermission,
    mute: micMute,
    unmute: micUnmute,
    toggleMute: micToggle,
    stop: stopMicrophone,
    error: micError,
  } = useMicrophone({
    onAudioLevel: (level) => {
      setAudioLevels({ microphone: level });
    },
  });

  useEffect(() => {
    if (micError) {
      setError({
        code: "MICROPHONE_ERROR",
        message: micError,
        action: "Check your browser settings and try again.",
      });
      setState("error");
    }
  }, [micError, setError, setState]);

  const handleRealtimeEvent = useCallback(
    (event: RealtimeEvent) => {
      logVoiceEvent("received event", { type: event.type });

      switch (event.type) {
        case "session.created": {
          const sessionEvent = event as SessionCreatedEvent;
          logVoiceEvent("session created", { id: sessionEvent.session.id });
          setState("listening");
          break;
        }

        case "input_audio_buffer.speech_started": {
          const speechEvent = event as SpeechStartedEvent;
          logVoiceEvent("user speech started", {
            audio_start_ms: speechEvent.audio_start_ms,
          });
          setState("user_speaking");

          const messageId = `user-${Date.now()}`;
          currentUserMessageRef.current = messageId;
          addMessage({
            id: messageId,
            role: "user",
            text: "",
            status: "partial",
            timestamp: Date.now(),
          });
          break;
        }

        case "input_audio_buffer.speech_stopped": {
          logVoiceEvent("user speech stopped");
          setState("assistant_processing");

          if (currentUserMessageRef.current) {
            updateMessage(currentUserMessageRef.current, { status: "complete" });
          }
          break;
        }

        case "response.created": {
          logVoiceEvent("response created");
          setState("assistant_processing");

          const messageId = `assistant-${Date.now()}`;
          currentAssistantMessageRef.current = messageId;
          addMessage({
            id: messageId,
            role: "assistant",
            text: "",
            status: "partial",
            timestamp: Date.now(),
          });
          break;
        }

        case "response.output_audio_transcript.delta": {
          const deltaEvent = event as TranscriptDeltaEvent;
          if (currentAssistantMessageRef.current) {
            const store = useVoiceStore.getState();
            const message = store.messages.find(
              (m) => m.id === currentAssistantMessageRef.current
            );
            if (message) {
              updateMessage(currentAssistantMessageRef.current, {
                text: message.text + deltaEvent.delta,
              });
            }
          }
          break;
        }

        case "response.output_audio_transcript.done": {
          const doneEvent = event as TranscriptDoneEvent;
          if (currentAssistantMessageRef.current) {
            updateMessage(currentAssistantMessageRef.current, {
              text: doneEvent.transcript,
              status: "complete",
            });
          }
          break;
        }

        case "response.output_audio.delta": {
          setState("assistant_speaking");
          break;
        }

        case "response.done": {
          const responseEvent = event as ResponseDoneEvent;
          logVoiceEvent("response done", { id: responseEvent.response.id });
          setState("listening");
          currentAssistantMessageRef.current = null;
          break;
        }

        case "error": {
          const errorEvent = event as ErrorEvent;
          logVoiceEvent("error", { error: errorEvent.error });
          setError({
            code: errorEvent.error.code || "REALTIME_ERROR",
            message: errorEvent.error.message,
          });
          break;
        }
      }
    },
    [setState, setError, addMessage, updateMessage]
  );

  const connect = useCallback(async () => {
    try {
      setState("requesting_permission");
      logVoiceEvent("starting connection");

      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        return;
      }

      setState("connecting");
      setSessionStartTime(Date.now());
      clearMessages();

      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      audioElementRef.current = document.createElement("audio");
      audioElementRef.current.autoplay = true;

      pc.ontrack = (event) => {
        logVoiceEvent("received remote track");
        if (audioElementRef.current) {
          audioElementRef.current.srcObject = event.streams[0];
        }
      };

      pc.oniceconnectionstatechange = () => {
        logVoiceEvent("ICE connection state", {
          state: pc.iceConnectionState,
        });

        if (pc.iceConnectionState === "disconnected") {
          setState("reconnecting");
        } else if (pc.iceConnectionState === "failed") {
          setError({
            code: "CONNECTION_FAILED",
            message: "Connection to voice service failed.",
            action: "Check your network connection and try again.",
          });
          setState("error");
        }
      };

      if (stream) {
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
      }

      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;

      dc.onopen = () => {
        logVoiceEvent("data channel open");
      };

      dc.onmessage = (event) => {
        const realtimeEvent = parseRealtimeEvent(event.data);
        if (realtimeEvent) {
          handleRealtimeEvent(realtimeEvent);
        }
      };

      dc.onerror = (error) => {
        logVoiceEvent("data channel error", { error });
        setError({
          code: "DATA_CHANNEL_ERROR",
          message: "Communication channel error.",
        });
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      logVoiceEvent("sending SDP offer to server");

      const response = await fetch("/api/realtime/session", {
        method: "POST",
        body: offer.sdp,
        headers: {
          "Content-Type": "application/sdp",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to establish session");
      }

      const answerSdp = await response.text();
      logVoiceEvent("received SDP answer from server");

      await pc.setRemoteDescription({
        type: "answer",
        sdp: answerSdp,
      });

      logVoiceEvent("peer connection established");
    } catch (error) {
      logVoiceEvent("connection error", { error });

      setError({
        code: "CONNECTION_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to connect",
        action: "Please try again.",
      });
      setState("error");
    }
  }, [
    stream,
    requestPermission,
    setState,
    setError,
    setSessionStartTime,
    clearMessages,
    handleRealtimeEvent,
  ]);

  const disconnect = useCallback(() => {
    logVoiceEvent("disconnecting");

    if (
      dataChannelRef.current &&
      dataChannelRef.current.readyState === "open"
    ) {
      dataChannelRef.current.send(createResponseCancelEvent());
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    } else if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (audioElementRef.current) {
      audioElementRef.current.srcObject = null;
      audioElementRef.current = null;
    }

    stopMicrophone();
    setState("ended");
    setSessionStartTime(null);

    setTimeout(() => {
      reset();
    }, 2000);
  }, [stopMicrophone, setState, setSessionStartTime, reset]);

  const mute = useCallback(() => {
    micMute();
    setMuted(true);
  }, [micMute, setMuted]);

  const unmute = useCallback(() => {
    micUnmute();
    setMuted(false);
  }, [micUnmute, setMuted]);

  const toggleMute = useCallback(() => {
    micToggle();
    setMuted(!isMuted);
  }, [micToggle, setMuted, isMuted]);

  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (dataChannelRef.current) {
        dataChannelRef.current.close();
      }
      stopMicrophone();
    };
  }, [stopMicrophone]);

  return {
    state,
    connect,
    disconnect,
    mute,
    unmute,
    toggleMute,
    isMuted,
  };
}
