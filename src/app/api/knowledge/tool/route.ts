import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { KNOWLEDGE_TOOL_NAMES } from "@/lib/realtime/knowledgeTools";
import { executeKnowledgeTool } from "@/lib/server/knowledge";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

const toolRequestSchema = z.object({
  name: z.enum(KNOWLEDGE_TOOL_NAMES),
  arguments: z.record(z.string(), z.unknown()).default({}),
});

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionToken || !isValidSessionToken(sessionToken)) {
    return jsonError("Unauthorized", 401);
  }

  try {
    const body: unknown = await request.json();
    const payload =
      body && typeof body === "object"
        ? (body as { name?: unknown; arguments?: unknown })
        : {};

    let toolArguments = payload.arguments;
    if (typeof toolArguments === "string") {
      try {
        toolArguments = JSON.parse(toolArguments || "{}");
      } catch {
        return jsonError("Invalid tool arguments", 400);
      }
    }

    const parsed = toolRequestSchema.safeParse({
      name: payload.name,
      arguments: toolArguments ?? {},
    });

    if (!parsed.success) {
      return jsonError("Unknown or invalid knowledge tool request", 400);
    }

    const result = await executeKnowledgeTool(
      parsed.data.name,
      parsed.data.arguments
    );
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (error) {
    console.error("[api/knowledge/tool] Error:", error);

    if (error instanceof z.ZodError) {
      return jsonError("Invalid tool arguments", 400);
    }

    return jsonError("Knowledge tool failed", 500);
  }
}
