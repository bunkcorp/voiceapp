import { NextRequest, NextResponse } from "next/server";
import { getOpenAIConfig, DEFAULT_INSTRUCTIONS } from "@/lib/server/openai";

export const runtime = "nodejs";

const OPENAI_REALTIME_URL = "https://api.openai.com/v1/realtime/calls";

export async function POST(request: NextRequest) {
  try {
    const sdp = await request.text();

    if (!sdp || !sdp.includes("v=0")) {
      return NextResponse.json(
        { error: "Invalid SDP offer" },
        { status: 400 }
      );
    }

    const config = getOpenAIConfig();

    const sessionConfig = JSON.stringify({
      type: "realtime",
      model: config.OPENAI_REALTIME_MODEL,
      instructions: DEFAULT_INSTRUCTIONS,
      audio: {
        output: {
          voice: config.OPENAI_REALTIME_VOICE,
        },
      },
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      },
      input_audio_transcription: {
        model: "whisper-1",
      },
    });

    const formData = new FormData();
    formData.set("sdp", sdp);
    formData.set("session", sessionConfig);

    const response = await fetch(OPENAI_REALTIME_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[api/realtime/session] OpenAI error:", errorText);
      return NextResponse.json(
        { error: "Failed to create realtime session" },
        { status: response.status }
      );
    }

    const answerSdp = await response.text();

    return new NextResponse(answerSdp, {
      status: 200,
      headers: {
        "Content-Type": "application/sdp",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/realtime/session] Error:", error);

    if (error instanceof Error && error.message.includes("Environment")) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
