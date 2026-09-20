"use client";

import { useRef, useCallback, useEffect } from "react";
import { useVoiceStore } from "@/stores/voiceStore";
import {
  parseRealtimeEvent,
  logVoiceEvent,
  createResponseCancelEvent,
  createFunctionCallOutputEvent,
  createResponseCreateEvent,
  createUserTextItemEvent,
  createAssistantTextItemEvent,
  createUserImageItemEvent,
} from "@/lib/realtime/events";
import { useChatStore } from "@/stores/chatStore";
import type { Message } from "@/types/voice";
import { isGitHubToolName } from "@/lib/realtime/githubTools";
import type { VoiceSessionState } from "@/types/voice";
import type {
  RealtimeEvent,
  SessionCreatedEvent,
  SpeechStartedEvent,
  TranscriptDeltaEvent,
  TranscriptDoneEvent,
  InputTranscriptionCompletedEvent,
  ResponseDoneEvent,
  FunctionCallArgumentsDoneEvent,
  ErrorEvent,
} from "@/lib/realtime/types";

interface UseRealtimeVoiceReturn {
  state: VoiceSessionState;
  connect: () => Promise<void>;
  disconnect: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  sendText: (text: string) => boolean;
  sendAttachment: (message: Message) => Promise<void>;
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
    resetSession,
  } = useVoiceStore();

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const currentAssistantMessageRef = useRef<string | null>(null);
  const currentUserMessageRef = useRef<string | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const maxReconnectAttempts = 3;
  const isConnectingRef = useRef<boolean>(false);
  const pendingFunctionCallsRef = useRef(0);
  const awaitingFunctionResultsRef = useRef(false);

  const startAudioAnalysis = useCallback(() => {
    const analyze = () => {
      if (!analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      const sum = dataArray.reduce((acc, val) => acc + val, 0);
      const average = sum / dataArray.length;
      const normalizedLevel = Math.min(average / 128, 1);

      const store = useVoiceStore.getState();
      setAudioLevels({ microphone: store.isMuted ? 0 : normalizedLevel });

      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    analyze();
  }, [setAudioLevels]);

  const stopAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  }, []);

  const sendOnDataChannel = useCallback((payload: string) => {
    const dataChannel = dataChannelRef.current;
    if (dataChannel && dataChannel.readyState === "open") {
      dataChannel.send(payload);
      return true;
    }
    return false;
  }, []);

  const blobToDataUrl = useCallback(async (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }, []);

  const sendHistoryItem = useCallback(
    async (message: Message) => {
      if (message.file?.kind === "image") {
        const conversationId = useChatStore.getState().activeId;
        if (!conversationId) {
          return;
        }
        const response = await fetch(
          `/api/chats/${conversationId}/files/${message.file.id}`
        );
        if (!response.ok) {
          sendOnDataChannel(
            createUserTextItemEvent(`Attached image: ${message.file.filename}`)
          );
          return;
        }
        const dataUrl = await blobToDataUrl(await response.blob());
        sendOnDataChannel(
          createUserImageItemEvent(
            dataUrl,
            message.text || `Attached image: ${message.file.filename}`
          )
        );
        return;
      }

      if (message.file?.extractedText) {
        sendOnDataChannel(
          createUserTextItemEvent(
            `${message.text || `Attached file: ${message.file.filename}`}\n\n${message.file.extractedText}`
          )
        );
        return;
      }

      if (!message.text.trim()) {
        return;
      }

      if (message.role === "assistant") {
        sendOnDataChannel(createAssistantTextItemEvent(message.text));
        return;
      }

      sendOnDataChannel(createUserTextItemEvent(message.text));
    },
    [blobToDataUrl, sendOnDataChannel]
  );

  const injectConversationHistory = useCallback(async () => {
    const history = useVoiceStore
      .getState()
      .messages.filter(
        (message) =>
          message.status === "complete" && (message.text.trim() || message.file)
      );

    for (const message of history) {
      try {
        await sendHistoryItem(message);
      } catch (error) {
        logVoiceEvent("failed to inject history item", {
          id: message.id,
          error: error instanceof Error ? error.message : "unknown",
        });
      }
    }
  }, [sendHistoryItem]);

  const finishFunctionCallsIfReady = useCallback(() => {
    if (
      awaitingFunctionResultsRef.current &&
      pendingFunctionCallsRef.current === 0
    ) {
      awaitingFunctionResultsRef.current = false;
      sendOnDataChannel(createResponseCreateEvent());
    }
  }, [sendOnDataChannel]);

  const handleFunctionCall = useCallback(
    async (event: FunctionCallArgumentsDoneEvent) => {
      pendingFunctionCallsRef.current += 1;
      setState("assistant_processing");
      logVoiceEvent("function call", {
        name: event.name,
        call_id: event.call_id,
      });

      let output: string;
      try {
        let args: Record<string, unknown> = {};
        if (event.arguments) {
          const parsed = JSON.parse(event.arguments) as unknown;
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            args = parsed as Record<string, unknown>;
          }
        }

        if (!isGitHubToolName(event.name)) {
          output = JSON.stringify({ error: `Unknown tool: ${event.name}` });
        } else {
          const response = await fetch("/api/github/tool", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ name: event.name, arguments: args }),
          });
          const data = await response.json().catch(() => ({
            error: "GitHub tool request failed",
          }));
          output = JSON.stringify(data);
        }
      } catch (error) {
        output = JSON.stringify({
          error:
            error instanceof Error ? error.message : "GitHub tool request failed",
        });
      }

      sendOnDataChannel(createFunctionCallOutputEvent(event.call_id, output));
      pendingFunctionCallsRef.current = Math.max(
        0,
        pendingFunctionCallsRef.current - 1
      );
      finishFunctionCallsIfReady();
    },
    [finishFunctionCallsIfReady, sendOnDataChannel, setState]
  );

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
          const currentState = useVoiceStore.getState().state;
          
          logVoiceEvent("user speech started", {
            audio_start_ms: speechEvent.audio_start_ms,
            wasInterruption: currentState === "assistant_speaking",
          });

          if (currentState === "assistant_speaking") {
            logVoiceEvent("interruption detected - cancelling response");
            
            if (
              dataChannelRef.current &&
              dataChannelRef.current.readyState === "open"
            ) {
              dataChannelRef.current.send(createResponseCancelEvent());
            }

            if (currentAssistantMessageRef.current) {
              const store = useVoiceStore.getState();
              const message = store.messages.find(
                (m) => m.id === currentAssistantMessageRef.current
              );
              if (message && message.text) {
                updateMessage(currentAssistantMessageRef.current, {
                  text: message.text + " [interrupted]",
                  status: "complete",
                });
              }
              currentAssistantMessageRef.current = null;
            }
          }

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
          break;
        }

        case "conversation.item.input_audio_transcription.completed": {
          const transcriptionEvent = event as InputTranscriptionCompletedEvent;
          logVoiceEvent("user transcription completed", {
            transcript: transcriptionEvent.transcript,
          });
          if (currentUserMessageRef.current) {
            updateMessage(currentUserMessageRef.current, {
              text: transcriptionEvent.transcript,
              status: "complete",
            });
            currentUserMessageRef.current = null;
          }
          break;
        }

        case "response.created": {
          logVoiceEvent("response created");
          setState("assistant_processing");
          currentAssistantMessageRef.current = null;
          break;
        }

        case "response.function_call_arguments.done": {
          void handleFunctionCall(event as FunctionCallArgumentsDoneEvent);
          break;
        }

        case "response.output_audio_transcript.delta": {
          const deltaEvent = event as TranscriptDeltaEvent;
          if (!currentAssistantMessageRef.current) {
            const messageId = `assistant-${Date.now()}`;
            currentAssistantMessageRef.current = messageId;
            addMessage({
              id: messageId,
              role: "assistant",
              text: deltaEvent.delta,
              status: "partial",
              timestamp: Date.now(),
            });
            break;
          }

          const store = useVoiceStore.getState();
          const message = store.messages.find(
            (m) => m.id === currentAssistantMessageRef.current
          );
          if (message) {
            updateMessage(currentAssistantMessageRef.current, {
              text: message.text + deltaEvent.delta,
            });
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

        case "response.cancelled": {
          logVoiceEvent("response cancelled");
          currentAssistantMessageRef.current = null;
          break;
        }

        case "response.done": {
          const responseEvent = event as ResponseDoneEvent;
          const hasFunctionCall = (responseEvent.response.output ?? []).some(
            (item) => item.type === "function_call"
          );

          logVoiceEvent("response done", {
            id: responseEvent.response.id,
            hasFunctionCall,
          });

          if (hasFunctionCall) {
            awaitingFunctionResultsRef.current = true;
            setState("assistant_processing");
            finishFunctionCallsIfReady();
            break;
          }

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
    [
      setState,
      setError,
      addMessage,
      updateMessage,
      handleFunctionCall,
      finishFunctionCallsIfReady,
    ]
  );

  const connect = useCallback(async () => {
    if (isConnectingRef.current) {
      logVoiceEvent("connection already in progress, skipping");
      return;
    }
    
    isConnectingRef.current = true;
    reconnectAttemptsRef.current = 0;
    pendingFunctionCallsRef.current = 0;
    awaitingFunctionResultsRef.current = false;
    
    try {
      setState("requesting_permission");
      logVoiceEvent("starting connection");

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStreamRef.current = micStream;
      logVoiceEvent("microphone granted");

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const source = audioContextRef.current.createMediaStreamSource(micStream);
      source.connect(analyserRef.current);
      startAudioAnalysis();

      setState("connecting");
      setSessionStartTime(Date.now());

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

        if (pc.iceConnectionState === "connected") {
          reconnectAttemptsRef.current = 0;
        } else if (pc.iceConnectionState === "disconnected") {
          setState("reconnecting");
          attemptReconnect();
        } else if (pc.iceConnectionState === "failed") {
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            setState("reconnecting");
            attemptReconnect();
          } else {
            setError({
              code: "CONNECTION_FAILED",
              message: "Connection to voice service failed after multiple attempts.",
              action: "Check your network connection and try again.",
            });
            setState("error");
          }
        }
      };

      const attemptReconnect = async () => {
        reconnectAttemptsRef.current++;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current - 1), 10000);
        
        logVoiceEvent("attempting reconnect", {
          attempt: reconnectAttemptsRef.current,
          maxAttempts: maxReconnectAttempts,
          delayMs: delay,
        });

        await new Promise(resolve => setTimeout(resolve, delay));

        if (peerConnectionRef.current?.iceConnectionState === "failed" ||
            peerConnectionRef.current?.iceConnectionState === "disconnected") {
          if (reconnectAttemptsRef.current <= maxReconnectAttempts) {
            logVoiceEvent("reconnecting - closing old connection");
            peerConnectionRef.current?.close();
            peerConnectionRef.current = null;
            dataChannelRef.current = null;
            isConnectingRef.current = false;
          }
        }
      };

      micStream.getTracks().forEach((track) => {
        pc.addTrack(track, micStream);
      });

      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;

      dc.onopen = () => {
        logVoiceEvent("data channel open");
        void injectConversationHistory();
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

      const conversationId = useChatStore.getState().activeId;
      const sessionParams = new URLSearchParams();
      if (conversationId) {
        sessionParams.set("c", conversationId);
      }
      const persona = new URLSearchParams(window.location.search).get(
        "persona"
      );
      if (persona === "buddachat") {
        sessionParams.set("persona", "buddachat");
      }
      const sessionQuery = sessionParams.toString();
      const sessionUrl = sessionQuery
        ? `/api/realtime/session?${sessionQuery}`
        : "/api/realtime/session";

      const response = await fetch(sessionUrl, {
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

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setError({
            code: "MICROPHONE_DENIED",
            message: "Microphone access is blocked.",
            action: "Allow microphone access for this site in your browser settings, then try again.",
          });
        } else if (error.name === "NotFoundError") {
          setError({
            code: "NO_MICROPHONE",
            message: "No microphone found.",
            action: "Please connect a microphone and try again.",
          });
        } else {
          setError({
            code: "CONNECTION_ERROR",
            message: error.message,
            action: "Please try again.",
          });
        }
      } else {
        setError({
          code: "CONNECTION_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to connect",
          action: "Please try again.",
        });
      }
      setState("error");
      isConnectingRef.current = false;
    }
  }, [
    startAudioAnalysis,
    setState,
    setError,
    setSessionStartTime,
    handleRealtimeEvent,
    injectConversationHistory,
  ]);

  const stopMicrophone = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
      logVoiceEvent("microphone stopped");
    }
    stopAudioAnalysis();
  }, [stopAudioAnalysis]);

  const disconnect = useCallback(() => {
    logVoiceEvent("disconnecting");
    isConnectingRef.current = false;
    reconnectAttemptsRef.current = maxReconnectAttempts + 1;
    pendingFunctionCallsRef.current = 0;
    awaitingFunctionResultsRef.current = false;

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
      resetSession();
    }, 2000);
  }, [stopMicrophone, setState, setSessionStartTime, resetSession]);

  const sendText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return false;
      }

      addMessage({
        id: `user-text-${Date.now()}`,
        role: "user",
        text: trimmed,
        status: "complete",
        timestamp: Date.now(),
      });

      const sent = sendOnDataChannel(createUserTextItemEvent(trimmed));
      if (sent) {
        sendOnDataChannel(createResponseCreateEvent());
      }
      return true;
    },
    [addMessage, sendOnDataChannel]
  );

  const sendAttachment = useCallback(
    async (message: Message) => {
      if (dataChannelRef.current?.readyState !== "open") {
        return;
      }
      await sendHistoryItem(message);
      sendOnDataChannel(createResponseCreateEvent());
    },
    [sendHistoryItem, sendOnDataChannel]
  );

  const mute = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      setMuted(true);
      logVoiceEvent("microphone muted");
    }
  }, [setMuted]);

  const unmute = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      setMuted(false);
      logVoiceEvent("microphone unmuted");
    }
  }, [setMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  }, [isMuted, mute, unmute]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logVoiceEvent("app backgrounded");
        if (audioContextRef.current?.state === "running") {
          audioContextRef.current.suspend();
        }
      } else {
        logVoiceEvent("app foregrounded");
        if (audioContextRef.current?.state === "suspended") {
          audioContextRef.current.resume();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (dataChannelRef.current) {
        dataChannelRef.current.close();
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      stopAudioAnalysis();
    };
  }, [stopAudioAnalysis]);

  return {
    state,
    connect,
    disconnect,
    mute,
    unmute,
    toggleMute,
    sendText,
    sendAttachment,
    isMuted,
  };
}
