import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { gunzipSync, gzipSync } from "zlib";
import { getSessionSigningSecret } from "@/lib/server/auth";

export const PROPOSAL_COOKIE = "voice_gh_proposal";
export const PROPOSAL_TTL_MS = 10 * 60 * 1000;
const MAX_COOKIE_CHARS = 3500;
const MAX_STEPS = 5;

export type WriteAction =
  | "create_or_update_file"
  | "create_branch"
  | "create_pull_request";

export type FileWriteStep = {
  action: "create_or_update_file";
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
  branch: string;
  writes_to_default: boolean;
};

export type BranchWriteStep = {
  action: "create_branch";
  owner: string;
  repo: string;
  branch: string;
  from: string;
};

export type PullRequestStep = {
  action: "create_pull_request";
  owner: string;
  repo: string;
  title: string;
  body: string;
  head: string;
  base: string;
};

export type ProposalStep = FileWriteStep | BranchWriteStep | PullRequestStep;

export type StoredProposal = {
  id: string;
  sessionHash: string;
  steps: ProposalStep[];
  createdAt: number;
  expiresAt: number;
};

type CookieStub = {
  id: string;
  sessionHash: string;
  expiresAt: number;
  digest: string;
  memoryOnly: true;
};

const memoryStore = new Map<string, StoredProposal>();

function sessionHash(sessionToken: string) {
  return createHash("sha256").update(sessionToken).digest("hex").slice(0, 16);
}

function proposalId() {
  return `p_${randomBytes(9).toString("hex")}`;
}

function hmac(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function digestProposal(proposal: StoredProposal) {
  return createHash("sha256").update(JSON.stringify(proposal)).digest("hex");
}

function equalHex(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  if (leftBuffer.length === 0 || leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function equalText(left: string, right: string) {
  return equalHex(
    createHash("sha256").update(left).digest("hex"),
    createHash("sha256").update(right).digest("hex")
  );
}

export function hashesEqual(left: string, right: string) {
  return equalText(left, right);
}

function encodeSigned(payload: unknown, secret: string) {
  const compressed = gzipSync(Buffer.from(JSON.stringify(payload), "utf8"));
  const encoded = compressed.toString("base64url");
  return `${encoded}.${hmac(encoded, secret)}`;
}

function decodeSigned<T>(value: string, secret: string): T | null {
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const expected = hmac(encoded, secret);
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (
    actualBuffer.length === 0 ||
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const json = gunzipSync(Buffer.from(encoded, "base64url")).toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

function isStoredProposal(value: unknown): value is StoredProposal {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as StoredProposal;
  return (
    typeof record.id === "string" &&
    typeof record.sessionHash === "string" &&
    Array.isArray(record.steps) &&
    typeof record.expiresAt === "number"
  );
}

function pruneMemory() {
  const now = Date.now();
  for (const [key, proposal] of memoryStore) {
    if (proposal.expiresAt <= now) {
      memoryStore.delete(key);
    }
  }
}

function actionOrder(action: WriteAction) {
  if (action === "create_branch") return 0;
  if (action === "create_or_update_file") return 1;
  return 2;
}

function orderSteps(steps: ProposalStep[]) {
  return [...steps].sort((left, right) => actionOrder(left.action) - actionOrder(right.action));
}

function sameStepTarget(left: ProposalStep, right: ProposalStep) {
  if (left.action !== right.action) {
    return false;
  }
  if (left.owner !== right.owner || left.repo !== right.repo) {
    return false;
  }
  if (left.action === "create_or_update_file" && right.action === "create_or_update_file") {
    return left.path === right.path && left.branch === right.branch;
  }
  if (left.action === "create_branch" && right.action === "create_branch") {
    return left.branch === right.branch;
  }
  if (left.action === "create_pull_request" && right.action === "create_pull_request") {
    return left.head === right.head && left.base === right.base;
  }
  return false;
}

export function stepsMatch(left: ProposalStep, right: ProposalStep) {
  if (left.action !== right.action) {
    return false;
  }
  if (!equalText(`${left.owner}/${left.repo}`, `${right.owner}/${right.repo}`)) {
    return false;
  }

  if (left.action === "create_or_update_file" && right.action === "create_or_update_file") {
    return (
      equalText(left.path, right.path) &&
      equalText(left.branch, right.branch) &&
      equalText(left.content, right.content) &&
      equalText(left.message, right.message)
    );
  }

  if (left.action === "create_branch" && right.action === "create_branch") {
    return equalText(left.branch, right.branch) && equalText(left.from, right.from);
  }

  if (left.action === "create_pull_request" && right.action === "create_pull_request") {
    return (
      equalText(left.title, right.title) &&
      equalText(left.body, right.body) &&
      equalText(left.head, right.head) &&
      equalText(left.base, right.base)
    );
  }

  return false;
}

export function summarizeProposal(proposal: StoredProposal) {
  const lines = proposal.steps.map((step, index) => {
    const repo = `${step.owner}/${step.repo}`;
    if (step.action === "create_branch") {
      return `${index + 1}. Create branch ${step.branch} on ${repo} from ${step.from}.`;
    }
    if (step.action === "create_or_update_file") {
      const target = step.writes_to_default
        ? `default branch ${step.branch}`
        : `branch ${step.branch}`;
      return `${index + 1}. Put ${step.path} on ${repo} (${target}, ${step.content.length} chars). Message: ${step.message}`;
    }
    return `${index + 1}. Open PR "${step.title}" on ${repo}: ${step.head} → ${step.base}.`;
  });

  const writesToDefault = proposal.steps.some(
    (step) => step.action === "create_or_update_file" && step.writes_to_default
  );

  return {
    proposal_id: proposal.id,
    expires_in_seconds: Math.max(0, Math.ceil((proposal.expiresAt - Date.now()) / 1000)),
    summary: lines.join(" "),
    steps: proposal.steps.map((step) => {
      if (step.action === "create_or_update_file") {
        return {
          action: step.action,
          repo: `${step.owner}/${step.repo}`,
          path: step.path,
          branch: step.branch,
          message: step.message,
          bytes: Buffer.byteLength(step.content, "utf8"),
          preview: step.content.slice(0, 200),
          writes_to_default: step.writes_to_default,
        };
      }
      if (step.action === "create_branch") {
        return {
          action: step.action,
          repo: `${step.owner}/${step.repo}`,
          branch: step.branch,
          from: step.from,
        };
      }
      return {
        action: step.action,
        repo: `${step.owner}/${step.repo}`,
        title: step.title,
        body: step.body,
        head: step.head,
        base: step.base,
      };
    }),
    warning: writesToDefault
      ? "This writes to the default branch. Only proceed if the user explicitly asked to commit to main or master."
      : undefined,
  };
}

export function encodeProposalCookie(proposal: StoredProposal) {
  const secret = getSessionSigningSecret();
  if (!secret) {
    throw new Error("Session secret is not configured");
  }

  const full = encodeSigned(proposal, secret);
  if (full.length <= MAX_COOKIE_CHARS) {
    return full;
  }

  const stub: CookieStub = {
    id: proposal.id,
    sessionHash: proposal.sessionHash,
    expiresAt: proposal.expiresAt,
    digest: digestProposal(proposal),
    memoryOnly: true,
  };
  return encodeSigned(stub, secret);
}

export function loadProposal(
  sessionToken: string,
  cookieValue: string | undefined
): StoredProposal | null {
  pruneMemory();
  const secret = getSessionSigningSecret();
  if (!secret) {
    return null;
  }

  const hash = sessionHash(sessionToken);
  const fromMemory = memoryStore.get(hash);
  if (fromMemory && fromMemory.expiresAt > Date.now() && fromMemory.sessionHash === hash) {
    return fromMemory;
  }

  if (!cookieValue) {
    return null;
  }

  const decoded = decodeSigned<StoredProposal | CookieStub>(cookieValue, secret);
  if (!decoded || decoded.expiresAt <= Date.now() || decoded.sessionHash !== hash) {
    return null;
  }

  if (isStoredProposal(decoded)) {
    memoryStore.set(hash, decoded);
    return decoded;
  }

  if ("memoryOnly" in decoded && decoded.memoryOnly) {
    const cached = memoryStore.get(hash);
    if (
      cached &&
      cached.id === decoded.id &&
      equalHex(digestProposal(cached), decoded.digest)
    ) {
      return cached;
    }
  }

  return null;
}

export function saveProposal(sessionToken: string, proposal: StoredProposal) {
  const hash = sessionHash(sessionToken);
  const stored = { ...proposal, sessionHash: hash };
  memoryStore.set(hash, stored);
  return stored;
}

export function clearProposal(sessionToken: string) {
  memoryStore.delete(sessionHash(sessionToken));
}

export function createEmptyProposal(sessionToken: string): StoredProposal {
  const now = Date.now();
  return {
    id: proposalId(),
    sessionHash: sessionHash(sessionToken),
    steps: [],
    createdAt: now,
    expiresAt: now + PROPOSAL_TTL_MS,
  };
}

export function upsertProposalStep(
  sessionToken: string,
  cookieValue: string | undefined,
  step: ProposalStep
) {
  const existing = loadProposal(sessionToken, cookieValue);
  const now = Date.now();
  const base =
    existing && existing.expiresAt > now
      ? existing
      : createEmptyProposal(sessionToken);

  if (base.steps.length >= MAX_STEPS && !base.steps.some((item) => sameStepTarget(item, step))) {
    throw new Error("Too many pending write steps. Confirm or discard the current proposal first.");
  }

  const steps = base.steps.filter((item) => !sameStepTarget(item, step));
  steps.push(step);

  const proposal = saveProposal(sessionToken, {
    ...base,
    steps: orderSteps(steps),
    expiresAt: now + PROPOSAL_TTL_MS,
  });

  return proposal;
}

export function requireProposal(
  sessionToken: string,
  cookieValue: string | undefined,
  proposalIdValue: string
) {
  const proposal = loadProposal(sessionToken, cookieValue);
  if (!proposal || !equalText(proposal.id, proposalIdValue)) {
    return null;
  }
  return proposal;
}

export function proposalCookieOptions(maxAgeSeconds = Math.ceil(PROPOSAL_TTL_MS / 1000)) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
