export interface RealtimeSessionConfig {
  type: "realtime";
  model: string;
  instructions?: string;
  audio?: {
    input?: {
      noise_suppression?: boolean;
    };
    output?: {
      voice?: string;
    };
  };
  turn_detection?: {
    type: "server_vad";
    threshold?: number;
    prefix_padding_ms?: number;
    silence_duration_ms?: number;
  };
  input_audio_transcription?: {
    model?: string;
  };
}

export type RealtimeEventType =
  | "session.created"
  | "session.updated"
  | "input_audio_buffer.speech_started"
  | "input_audio_buffer.speech_stopped"
  | "input_audio_buffer.committed"
  | "conversation.item.created"
  | "conversation.item.truncated"
  | "conversation.item.input_audio_transcription.completed"
  | "response.created"
  | "response.cancelled"
  | "response.output_text.delta"
  | "response.output_text.done"
  | "response.output_audio.delta"
  | "response.output_audio.done"
  | "response.output_audio_transcript.delta"
  | "response.output_audio_transcript.done"
  | "response.done"
  | "error";

export interface RealtimeEvent {
  type: RealtimeEventType;
  event_id?: string;
  [key: string]: unknown;
}

export interface SessionCreatedEvent extends RealtimeEvent {
  type: "session.created";
  session: {
    id: string;
    model: string;
  };
}

export interface SpeechStartedEvent extends RealtimeEvent {
  type: "input_audio_buffer.speech_started";
  audio_start_ms: number;
}

export interface SpeechStoppedEvent extends RealtimeEvent {
  type: "input_audio_buffer.speech_stopped";
  audio_end_ms: number;
}

export interface TranscriptDeltaEvent extends RealtimeEvent {
  type: "response.output_audio_transcript.delta";
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  delta: string;
}

export interface TranscriptDoneEvent extends RealtimeEvent {
  type: "response.output_audio_transcript.done";
  response_id: string;
  item_id: string;
  transcript: string;
}

export interface ResponseDoneEvent extends RealtimeEvent {
  type: "response.done";
  response: {
    id: string;
    status: string;
    output: Array<{
      id: string;
      type: string;
      role: string;
      content?: Array<{
        type: string;
        transcript?: string;
      }>;
    }>;
  };
}

export interface InputTranscriptionCompletedEvent extends RealtimeEvent {
  type: "conversation.item.input_audio_transcription.completed";
  item_id: string;
  content_index: number;
  transcript: string;
}

export interface ErrorEvent extends RealtimeEvent {
  type: "error";
  error: {
    type: string;
    code?: string;
    message: string;
  };
}
