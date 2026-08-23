import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { GITHUB_TOOL_NAMES } from "@/lib/realtime/githubTools";
import {
  executeGitHubTool,
  GitHubRequestError,
} from "@/lib/server/github";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";
import {
  PROPOSAL_COOKIE,
  proposalCookieOptions,
} from "@/lib/server/githubProposals";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

const toolRequestSchema = z.object({
  name: z.enum(GITHUB_TOOL_NAMES),
  arguments: z.record(z.string(), z.unknown()).default({}),
});

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

function applyProposalCookie(
  response: NextResponse,
  proposalCookie: string | null | undefined
) {
  if (proposalCookie === undefined) {
    return response;
  }
  if (proposalCookie === null) {
    response.cookies.set(PROPOSAL_COOKIE, "", {
      ...proposalCookieOptions(0),
      maxAge: 0,
    });
    return response;
  }
  response.cookies.set(
    PROPOSAL_COOKIE,
    proposalCookie,
    proposalCookieOptions()
  );
  return response;
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
      return jsonError("Unknown or invalid GitHub tool request", 400);
    }

    const { result, proposalCookie } = await executeGitHubTool(
      parsed.data.name,
      parsed.data.arguments,
      {
        sessionToken,
        proposalCookie: request.cookies.get(PROPOSAL_COOKIE)?.value,
      }
    );
    const response = NextResponse.json(result, { headers: NO_STORE });
    return applyProposalCookie(response, proposalCookie);
  } catch (error) {
    console.error("[api/github/tool] Error:", error);

    if (error instanceof z.ZodError) {
      return jsonError("Invalid tool arguments", 400);
    }

    if (error instanceof GitHubRequestError) {
      const status = error.status === 401 || error.status === 403 ? 403 : 502;
      return NextResponse.json(
        {
          error:
            error.status === 401 || error.status === 403
              ? "GitHub denied access. The token may lack repo or org scope, or org SSO authorization."
              : error.message,
        },
        { status, headers: NO_STORE }
      );
    }

    if (error instanceof Error && error.message.includes("Environment")) {
      return jsonError("GitHub is not configured on the server", 503);
    }

    return jsonError("GitHub tool failed", 500);
  }
}
