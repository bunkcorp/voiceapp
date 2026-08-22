import type { RealtimeEvent, RealtimeEventType } from "./types";

export function createResponseCancelEvent(): string {
  return JSON.stringify({
    type: "response.cancel",
  });
}

export function createSessionUpdateEvent(config: {
  instructions?: string;
  voice?: string;
  turn_detection?: {
    type: "server_vad";
    threshold?: number;
    prefix_padding_ms?: number;
    silence_duration_ms?: number;
  };
}): string {
  return JSON.stringify({
    type: "session.update",
    session: config,
  });
}

export function createInputAudioBufferClearEvent(): string {
  return JSON.stringify({
    type: "input_audio_buffer.clear",
  });
}

export function createConversationItemTruncateEvent(
  itemId: string,
  contentIndex: number,
  audioEndMs: number
): string {
  return JSON.stringify({
    type: "conversation.item.truncate",
    item_id: itemId,
    content_index: contentIndex,
    audio_end_ms: audioEndMs,
  });
}

export function parseRealtimeEvent(data: string): RealtimeEvent | null {
  try {
    return JSON.parse(data) as RealtimeEvent;
  } catch {
    console.error("[voice] Failed to parse realtime event:", data);
    return null;
  }
}

export function isEventType<T extends RealtimeEvent>(
  event: RealtimeEvent,
  type: RealtimeEventType
): event is T {
  return event.type === type;
}

export function logVoiceEvent(
  action: string,
  details?: Record<string, unknown>
): void {
  const timestamp = new Date().toISOString();
  const message = details
    ? `[voice] ${action} ${JSON.stringify(details)}`
    : `[voice] ${action}`;
  console.log(`${timestamp} ${message}`);
}
