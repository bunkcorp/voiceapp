import { z } from "zod/v4";
import { GITHUB_TOOL_NAMES, type GitHubToolName } from "@/lib/realtime/githubTools";
import {
  type FileWriteStep,
  type ProposalStep,
  clearProposal,
  encodeProposalCookie,
  hashesEqual,
  loadProposal,
  requireProposal,
  stepsMatch,
  summarizeProposal,
  upsertProposalStep,
} from "@/lib/server/githubProposals";

const envSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
});

export function getGitHubConfig() {
  const result = envSchema.safeParse({
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  });

  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.error.message}`);
  }

  return result.data;
}

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_LIST_LIMIT = 20;
const MAX_LIST_LIMIT = 50;
const MAX_PAGES = 5;
const FILE_CHAR_LIMIT = 8000;
const README_CHAR_LIMIT = 2500;
const WRITE_CONTENT_BYTE_LIMIT = 32_768;
const BLOCKED_PATH_PATTERN =
  /(^|\/)(\.env(\.|$)|\.env\.[^/]+|credentials\.json|secrets?(\.|$)|id_rsa|\.npmrc|\.pypirc|\.git(\/|$)|.*\.(pem|key|p12|pfx)$)/i;

class GitHubRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GitHubRequestError";
    this.status = status;
  }
}

function redact(text: string, token: string) {
  return text.replaceAll(token, "[redacted]");
}

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;

  for (const part of linkHeader.split(",")) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="next"/);
    if (match) return match[1];
  }

  return null;
}

async function githubRequest<T>(
  token: string,
  path: string,
  options?: {
    method?: string;
    params?: Record<string, string | undefined>;
    body?: unknown;
    accept?: string;
  }
): Promise<{ data: T; headers: Headers; status: number }> {
  const url = new URL(path.startsWith("https://") ? path : `${GITHUB_API}${path}`);

  for (const [key, value] of Object.entries(options?.params ?? {})) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: options?.accept ?? "application/vnd.github+json",
    "X-GitHub-Api-Version": API_VERSION,
    "User-Agent": "voiceapp",
  };

  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    let detail = "";

    try {
      const body = (await response.json()) as { message?: string };
      detail = body.message ?? "";
    } catch {
      detail = "";
    }

    const message = redact(
      detail || `GitHub request failed (${response.status})`,
      token
    );

    throw new GitHubRequestError(response.status, message);
  }

  if (response.status === 204) {
    return { data: null as T, headers: response.headers, status: response.status };
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
    status: response.status,
  };
}

async function githubRequestOptional<T>(
  token: string,
  path: string,
  options?: {
    method?: string;
    params?: Record<string, string | undefined>;
    body?: unknown;
    accept?: string;
  }
) {
  try {
    return await githubRequest<T>(token, path, options);
  } catch (error) {
    if (error instanceof GitHubRequestError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

type GitHubUser = { login: string };
type GitHubOrg = { login: string };

type GitHubRepo = {
  full_name: string;
  name: string;
  private: boolean;
  description: string | null;
  language: string | null;
  updated_at: string;
  html_url: string;
  default_branch?: string;
  stargazers_count?: number;
  open_issues_count?: number;
  topics?: string[];
  owner?: { login: string };
};

type GitHubSearchRepos = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
};

type GitHubCodeSearchItem = {
  name: string;
  path: string;
  html_url: string;
  repository: { full_name: string; html_url: string; private?: boolean };
  text_matches?: Array<{ fragment?: string }>;
};

type GitHubSearchCode = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubCodeSearchItem[];
};

type GitHubContentFile = {
  type: "file";
  name: string;
  path: string;
  size: number;
  sha?: string;
  encoding?: string;
  content?: string;
  html_url?: string;
};

type GitHubContentDirEntry = {
  type: "file" | "dir" | "symlink" | "submodule";
  name: string;
  path: string;
  size?: number;
};

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name?: string; date?: string } | null;
  };
  author: { login?: string } | null;
};

type GitHubRef = {
  ref: string;
  object: { sha: string; type: string };
};

type GitHubContentWrite = {
  content: { path: string; html_url?: string; sha?: string };
  commit: { sha: string; html_url?: string; message?: string };
};

type GitHubPullRequest = {
  number: number;
  html_url: string;
  title: string;
  state: string;
};

async function getAuthenticatedLogin(token: string) {
  const { data } = await githubRequest<GitHubUser>(token, "/user");
  return data.login;
}

async function getSearchScopeQuery(token: string) {
  const login = await getAuthenticatedLogin(token);
  const { data: orgs } = await githubRequest<GitHubOrg[]>(token, "/user/orgs", {
    params: { per_page: "100" },
  });

  const scopes = [`user:${login}`, ...orgs.map((org) => `org:${org.login}`)];
  return scopes.length === 1 ? scopes[0] : `(${scopes.join(" OR ")})`;
}

function hasOwnerQualifier(query: string) {
  return /\b(user|org|repo):/i.test(query);
}

function summarizeRepo(repo: GitHubRepo) {
  return {
    name: repo.full_name || repo.name,
    private: repo.private,
    description: repo.description,
    language: repo.language,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
  };
}

function parseRepoRef(repo: string, defaultOwner: string) {
  const trimmed = repo
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "");
  const parts = trimmed.split("/").filter(Boolean);

  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1] };
  }

  if (parts.length === 1) {
    return { owner: defaultOwner, repo: parts[0] };
  }

  throw new Error("repo must be owner/name");
}

function decodeBase64Content(content: string) {
  const raw = Buffer.from(content.replace(/\n/g, ""), "base64");
  if (raw.includes(0)) {
    return { text: null, binary: true, bytes: raw.length };
  }

  return { text: raw.toString("utf8"), binary: false, bytes: raw.length };
}

function truncateText(text: string, limit: number) {
  if (text.length <= limit) {
    return { text, truncated: false };
  }

  return {
    text: text.slice(0, limit),
    truncated: true,
    omitted_chars: text.length - limit,
  };
}

const listReposArgs = z.object({
  query: z.string().optional(),
  visibility: z.enum(["all", "public", "private"]).optional(),
  org: z.string().optional(),
  limit: z.number().int().min(1).max(MAX_LIST_LIMIT).optional(),
});

const searchReposArgs = z.object({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(MAX_LIST_LIMIT).optional(),
});

const searchCodeArgs = z.object({
  query: z.string().min(1),
  repo: z.string().optional(),
  limit: z.number().int().min(1).max(MAX_LIST_LIMIT).optional(),
});

const getFileArgs = z.object({
  repo: z.string().min(1),
  path: z.string().min(1),
  ref: z.string().optional(),
});

const getRepoArgs = z.object({
  repo: z.string().min(1),
});

const listCommitsArgs = z.object({
  repo: z.string().min(1),
  limit: z.number().int().min(1).max(10).optional(),
});

const repoWriteRefArgs = z.object({
  owner: z.string().min(1).optional(),
  repo: z.string().min(1),
});

const createOrUpdateFileArgs = repoWriteRefArgs.extend({
  path: z.string().min(1).max(4096),
  content: z.string().max(WRITE_CONTENT_BYTE_LIMIT),
  message: z.string().min(1).max(1000),
  branch: z.string().min(1).max(255).optional(),
  commit_to_default: z.boolean().optional(),
  confirm: z.boolean().optional(),
  proposal_id: z.string().min(1).max(80).optional(),
});

const createBranchArgs = repoWriteRefArgs.extend({
  branch: z.string().min(1).max(255),
  from: z.string().min(1).max(255).optional(),
  confirm: z.boolean().optional(),
  proposal_id: z.string().min(1).max(80).optional(),
});

const createPullRequestArgs = repoWriteRefArgs.extend({
  title: z.string().min(1).max(256),
  body: z.string().max(8000).optional(),
  head: z.string().min(1).max(255),
  base: z.string().min(1).max(255).optional(),
  confirm: z.boolean().optional(),
  proposal_id: z.string().min(1).max(80).optional(),
});

const confirmWriteArgs = z.object({
  proposal_id: z.string().min(1).max(80),
});

const discardWriteArgs = z.object({
  proposal_id: z.string().min(1).max(80).optional(),
});

async function listRepos(token: string, args: z.infer<typeof listReposArgs>) {
  const limit = args.limit ?? DEFAULT_LIST_LIMIT;
  const visibility = args.visibility ?? "all";
  const query = args.query?.trim().toLowerCase();
  const matches: ReturnType<typeof summarizeRepo>[] = [];
  let page = 1;
  let truncated = false;

  while (page <= MAX_PAGES && matches.length < limit) {
    const path = args.org
      ? `/orgs/${encodeURIComponent(args.org)}/repos`
      : "/user/repos";

    const { data, headers } = await githubRequest<GitHubRepo[]>(token, path, {
      params: args.org
        ? {
            type: "all",
            sort: "updated",
            direction: "desc",
            per_page: "100",
            page: String(page),
          }
        : {
            affiliation: "owner,collaborator,organization_member",
            visibility,
            sort: "updated",
            direction: "desc",
            per_page: "100",
            page: String(page),
          },
    });

    const visible = args.org
      ? data.filter((repo) => {
          if (visibility === "private") return repo.private;
          if (visibility === "public") return !repo.private;
          return true;
        })
      : data;

    for (const repo of visible) {
      if (query) {
        const haystack = `${repo.full_name} ${repo.name} ${repo.description ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) continue;
      }

      matches.push(summarizeRepo(repo));
      if (matches.length >= limit) break;
    }

    if (!parseNextLink(headers.get("link")) || data.length === 0) {
      break;
    }

    page += 1;
    if (page > MAX_PAGES && matches.length < limit) {
      truncated = true;
    }
  }

  return {
    count: matches.length,
    limit,
    truncated: truncated || matches.length >= limit,
    repos: matches,
  };
}

async function searchRepos(token: string, args: z.infer<typeof searchReposArgs>) {
  const limit = args.limit ?? DEFAULT_LIST_LIMIT;
  const rawQuery = args.query.trim();
  const scopedQuery = hasOwnerQualifier(rawQuery)
    ? rawQuery
    : `${rawQuery} ${await getSearchScopeQuery(token)}`;

  const { data } = await githubRequest<GitHubSearchRepos>(token, "/search/repositories", {
    params: {
      q: scopedQuery,
      per_page: String(Math.min(limit, 30)),
      sort: "updated",
      order: "desc",
    },
  });

  return {
    query: scopedQuery,
    total_count: data.total_count,
    incomplete_results: data.incomplete_results,
    repos: data.items.slice(0, limit).map(summarizeRepo),
  };
}

async function searchCode(token: string, args: z.infer<typeof searchCodeArgs>) {
  const limit = args.limit ?? 10;
  let rawQuery = args.query.trim();

  if (args.repo && !/\brepo:/i.test(rawQuery)) {
    const login = await getAuthenticatedLogin(token);
    const { owner, repo } = parseRepoRef(args.repo, login);
    rawQuery = `${rawQuery} repo:${owner}/${repo}`;
  }

  const scopedQuery = hasOwnerQualifier(rawQuery)
    ? rawQuery
    : `${rawQuery} ${await getSearchScopeQuery(token)}`;

  const { data } = await githubRequest<GitHubSearchCode>(token, "/search/code", {
    params: {
      q: scopedQuery,
      per_page: String(Math.min(limit, 30)),
    },
    accept: "application/vnd.github.text-match+json",
  });

  return {
    query: scopedQuery,
    total_count: data.total_count,
    incomplete_results: data.incomplete_results,
    results: data.items.slice(0, limit).map((item) => ({
      name: item.name,
      path: item.path,
      repo: item.repository.full_name,
      html_url: item.html_url,
      snippet: item.text_matches?.[0]?.fragment ?? null,
    })),
  };
}

async function getFile(token: string, args: z.infer<typeof getFileArgs>) {
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = parseRepoRef(args.repo, login);
  const encodedPath = args.path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");

  const { data } = await githubRequest<GitHubContentFile | GitHubContentDirEntry[]>(
    token,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodedPath}`,
    { params: { ref: args.ref } }
  );

  if (Array.isArray(data)) {
    return {
      repo: `${owner}/${repo}`,
      path: args.path,
      type: "dir" as const,
      entries: data.slice(0, 50).map((entry) => ({
        name: entry.name,
        path: entry.path,
        type: entry.type,
      })),
      truncated: data.length > 50,
    };
  }

  if (data.type !== "file" || !data.content) {
    return {
      repo: `${owner}/${repo}`,
      path: data.path,
      type: data.type,
      note: "This path is not a regular file with readable contents.",
    };
  }

  const decoded = decodeBase64Content(data.content);
  if (decoded.binary || decoded.text === null) {
    return {
      repo: `${owner}/${repo}`,
      path: data.path,
      type: "file" as const,
      size: data.size,
      html_url: data.html_url,
      note: "File looks binary and was not decoded.",
    };
  }

  const truncated = truncateText(decoded.text, FILE_CHAR_LIMIT);
  return {
    repo: `${owner}/${repo}`,
    path: data.path,
    type: "file" as const,
    size: data.size,
    html_url: data.html_url,
    truncated: truncated.truncated,
    omitted_chars: truncated.truncated ? truncated.omitted_chars : undefined,
    note: truncated.truncated
      ? `File truncated for speech; showing first ${FILE_CHAR_LIMIT} characters.`
      : undefined,
    content: truncated.text,
  };
}

async function getRepo(token: string, args: z.infer<typeof getRepoArgs>) {
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = parseRepoRef(args.repo, login);
  const { data } = await githubRequest<GitHubRepo>(
    token,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );

  let readme: { truncated: boolean; text: string } | null = null;
  try {
    const { data: readmeFile } = await githubRequest<GitHubContentFile>(
      token,
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`
    );
    if (readmeFile.content) {
      const decoded = decodeBase64Content(readmeFile.content);
      if (decoded.text) {
        const truncated = truncateText(decoded.text, README_CHAR_LIMIT);
        readme = { truncated: truncated.truncated, text: truncated.text };
      }
    }
  } catch {
    readme = null;
  }

  return {
    name: data.full_name,
    private: data.private,
    description: data.description,
    language: data.language,
    default_branch: data.default_branch ?? null,
    updated_at: data.updated_at,
    html_url: data.html_url,
    stars: data.stargazers_count ?? 0,
    open_issues: data.open_issues_count ?? 0,
    topics: data.topics ?? [],
    readme,
  };
}

async function listCommits(token: string, args: z.infer<typeof listCommitsArgs>) {
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = parseRepoRef(args.repo, login);
  const limit = args.limit ?? 10;

  const { data } = await githubRequest<GitHubCommit[]>(
    token,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits`,
    { params: { per_page: String(limit) } }
  );

  return {
    repo: `${owner}/${repo}`,
    commits: data.map((commit) => ({
      sha: commit.sha.slice(0, 7),
      message: commit.commit.message.split("\n")[0],
      author: commit.author?.login || commit.commit.author?.name || null,
      date: commit.commit.author?.date ?? null,
      html_url: commit.html_url,
    })),
  };
}

export type GitHubToolContext = {
  sessionToken: string;
  proposalCookie?: string;
};

export type GitHubToolExecution = {
  result: unknown;
  proposalCookie?: string | null;
};

function encodeContentPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function resolveOwnerRepo(
  args: { owner?: string; repo: string },
  defaultOwner: string
) {
  if (args.owner && !args.repo.includes("/")) {
    return { owner: args.owner, repo: args.repo };
  }
  return parseRepoRef(args.repo, args.owner || defaultOwner);
}

function assertSafePath(path: string) {
  const normalized = path.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized || normalized.includes("..") || normalized.includes("\0")) {
    throw new Error("Invalid file path");
  }
  if (BLOCKED_PATH_PATTERN.test(normalized)) {
    throw new Error("Refusing to write a secret or sensitive path");
  }
  return normalized;
}

function assertSafeBranch(name: string) {
  const branch = name.trim();
  if (
    !branch ||
    branch.length > 200 ||
    branch.includes("..") ||
    branch.startsWith("-") ||
    branch.includes("\\") ||
    !/^[A-Za-z0-9._\-\/]+$/.test(branch)
  ) {
    throw new Error("Invalid branch name");
  }
  return branch;
}

function assertSafeFileContent(content: string) {
  if (content.includes("\u0000")) {
    throw new Error("Binary file content is not allowed");
  }
  if (Buffer.byteLength(content, "utf8") > WRITE_CONTENT_BYTE_LIMIT) {
    throw new Error(`File content exceeds ${WRITE_CONTENT_BYTE_LIMIT} bytes`);
  }
}

function proposalResult(proposal: ReturnType<typeof summarizeProposal>) {
  return {
    proposed: true,
    mutated: false,
    ...proposal,
    note: "Nothing was written to GitHub. Summarize this plan and wait for the user to say yes, then call confirm_github_write.",
  };
}

function pendingProposalCookie(proposal: Parameters<typeof encodeProposalCookie>[0]) {
  return {
    result: proposalResult(summarizeProposal(proposal)),
    proposalCookie: encodeProposalCookie(proposal),
  } satisfies GitHubToolExecution;
}

async function getRepoMeta(token: string, owner: string, repo: string) {
  const { data } = await githubRequest<GitHubRepo>(
    token,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );
  return {
    owner,
    repo,
    defaultBranch: data.default_branch || "main",
    htmlUrl: data.html_url,
  };
}

async function getRefSha(token: string, owner: string, repo: string, ref: string) {
  if (/^[0-9a-f]{40}$/i.test(ref)) {
    return ref;
  }

  const encodedRef = encodeContentPath(ref.startsWith("heads/") ? ref : `heads/${ref}`);
  const found = await githubRequestOptional<GitHubRef>(
    token,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/ref/${encodedRef}`
  );
  return found?.data.object.sha ?? null;
}

async function createBranchOnGitHub(
  token: string,
  step: Extract<ProposalStep, { action: "create_branch" }>
) {
  const sha = await getRefSha(token, step.owner, step.repo, step.from);
  if (!sha) {
    throw new GitHubRequestError(404, `Base ref not found: ${step.from}`);
  }

  try {
    const { data } = await githubRequest<GitHubRef>(
      token,
      `/repos/${encodeURIComponent(step.owner)}/${encodeURIComponent(step.repo)}/git/refs`,
      {
        method: "POST",
        body: {
          ref: `refs/heads/${step.branch}`,
          sha,
        },
      }
    );
    return {
      action: step.action,
      repo: `${step.owner}/${step.repo}`,
      branch: step.branch,
      sha: data.object.sha,
      ref: data.ref,
    };
  } catch (error) {
    if (error instanceof GitHubRequestError && error.status === 422) {
      const existing = await getRefSha(token, step.owner, step.repo, step.branch);
      if (existing) {
        return {
          action: step.action,
          repo: `${step.owner}/${step.repo}`,
          branch: step.branch,
          sha: existing,
          ref: `refs/heads/${step.branch}`,
          note: "Branch already existed.",
        };
      }
    }
    throw error;
  }
}

async function createOrUpdateFileOnGitHub(token: string, step: FileWriteStep) {
  const encodedPath = encodeContentPath(step.path);
  const existing = await githubRequestOptional<GitHubContentFile>(
    token,
    `/repos/${encodeURIComponent(step.owner)}/${encodeURIComponent(step.repo)}/contents/${encodedPath}`,
    { params: { ref: step.branch } }
  );

  const { data } = await githubRequest<GitHubContentWrite>(
    token,
    `/repos/${encodeURIComponent(step.owner)}/${encodeURIComponent(step.repo)}/contents/${encodedPath}`,
    {
      method: "PUT",
      body: {
        message: step.message,
        content: Buffer.from(step.content, "utf8").toString("base64"),
        branch: step.branch,
        sha: existing?.data.sha,
      },
    }
  );

  return {
    action: step.action,
    repo: `${step.owner}/${step.repo}`,
    path: data.content.path,
    branch: step.branch,
    commit_sha: data.commit.sha,
    html_url: data.content.html_url ?? data.commit.html_url ?? null,
  };
}

async function createPullRequestOnGitHub(
  token: string,
  step: Extract<ProposalStep, { action: "create_pull_request" }>
) {
  try {
    const { data } = await githubRequest<GitHubPullRequest>(
      token,
      `/repos/${encodeURIComponent(step.owner)}/${encodeURIComponent(step.repo)}/pulls`,
      {
        method: "POST",
        body: {
          title: step.title,
          body: step.body,
          head: step.head,
          base: step.base,
        },
      }
    );
    return {
      action: step.action,
      repo: `${step.owner}/${step.repo}`,
      number: data.number,
      title: data.title,
      html_url: data.html_url,
      state: data.state,
    };
  } catch (error) {
    if (error instanceof GitHubRequestError && error.status === 422) {
      const { data } = await githubRequest<GitHubPullRequest[]>(
        token,
        `/repos/${encodeURIComponent(step.owner)}/${encodeURIComponent(step.repo)}/pulls`,
        {
          params: {
            head: `${step.owner}:${step.head}`,
            base: step.base,
            state: "open",
          },
        }
      );
      const existing = data[0];
      if (existing) {
        return {
          action: step.action,
          repo: `${step.owner}/${step.repo}`,
          number: existing.number,
          title: existing.title,
          html_url: existing.html_url,
          state: existing.state,
          note: "An open pull request for this branch already existed.",
        };
      }
    }
    throw error;
  }
}

async function executeProposalSteps(token: string, steps: ProposalStep[]) {
  const results: unknown[] = [];
  for (const step of steps) {
    if (step.action === "create_branch") {
      results.push(await createBranchOnGitHub(token, step));
    } else if (step.action === "create_or_update_file") {
      results.push(await createOrUpdateFileOnGitHub(token, step));
    } else {
      results.push(await createPullRequestOnGitHub(token, step));
    }
  }
  return results;
}

async function confirmStoredProposal(
  token: string,
  context: GitHubToolContext,
  proposalId: string
): Promise<GitHubToolExecution> {
  const proposal = requireProposal(context.sessionToken, context.proposalCookie, proposalId);
  if (!proposal) {
    return {
      result: {
        error: "No matching pending proposal. Propose the write first and wait for the user to say yes.",
        mutated: false,
      },
    };
  }

  const results = await executeProposalSteps(token, proposal.steps);
  clearProposal(context.sessionToken);
  return {
    result: {
      confirmed: true,
      mutated: true,
      proposal_id: proposal.id,
      results,
    },
    proposalCookie: null,
  };
}

function matchingConfirmProposal(
  context: GitHubToolContext,
  step: ProposalStep,
  proposalId?: string
) {
  const proposal = loadProposal(context.sessionToken, context.proposalCookie);
  if (!proposal) {
    return null;
  }
  if (proposalId && !hashesEqual(proposal.id, proposalId)) {
    return null;
  }
  if (!proposal.steps.some((stored) => stepsMatch(stored, step))) {
    return null;
  }
  return proposal;
}

async function proposeOrConfirm(
  token: string,
  context: GitHubToolContext,
  step: ProposalStep,
  confirm: boolean,
  proposalId?: string
): Promise<GitHubToolExecution> {
  if (confirm) {
    const proposal = matchingConfirmProposal(context, step, proposalId);
    if (!proposal) {
      return {
        result: {
          error:
            "Refusing to write: there is no matching pending proposal. Call this tool without confirm first, summarize, and only confirm after the user says yes.",
          mutated: false,
        },
      };
    }
    return confirmStoredProposal(token, context, proposal.id);
  }

  const proposal = upsertProposalStep(context.sessionToken, context.proposalCookie, step);
  return pendingProposalCookie(proposal);
}

async function planCreateOrUpdateFile(
  token: string,
  args: z.infer<typeof createOrUpdateFileArgs>
): Promise<ProposalStep[]> {
  assertSafeFileContent(args.content);
  const path = assertSafePath(args.path);
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = resolveOwnerRepo(args, login);
  const meta = await getRepoMeta(token, owner, repo);
  const requestedBranch = args.branch ? assertSafeBranch(args.branch) : undefined;
  const writesToDefault =
    Boolean(args.commit_to_default) &&
    (!requestedBranch || requestedBranch === meta.defaultBranch);
  const branch = writesToDefault
    ? meta.defaultBranch
    : requestedBranch && requestedBranch !== meta.defaultBranch
      ? requestedBranch
      : `voice-bot/${Date.now().toString(36)}`;
  assertSafeBranch(branch);

  const steps: ProposalStep[] = [];
  const existingBranch = await getRefSha(token, owner, repo, branch);
  if (!existingBranch) {
    steps.push({
      action: "create_branch",
      owner,
      repo,
      branch,
      from: meta.defaultBranch,
    });
  }

  steps.push({
    action: "create_or_update_file",
    owner,
    repo,
    path,
    content: args.content,
    message: args.message,
    branch,
    writes_to_default: writesToDefault,
  });
  return steps;
}

async function planCreateBranch(
  token: string,
  args: z.infer<typeof createBranchArgs>
): Promise<ProposalStep> {
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = resolveOwnerRepo(args, login);
  const meta = await getRepoMeta(token, owner, repo);
  return {
    action: "create_branch",
    owner,
    repo,
    branch: assertSafeBranch(args.branch),
    from: assertSafeBranch(args.from || meta.defaultBranch),
  };
}

async function planCreatePullRequest(
  token: string,
  args: z.infer<typeof createPullRequestArgs>
): Promise<ProposalStep> {
  const login = await getAuthenticatedLogin(token);
  const { owner, repo } = resolveOwnerRepo(args, login);
  const meta = await getRepoMeta(token, owner, repo);
  return {
    action: "create_pull_request",
    owner,
    repo,
    title: args.title.trim(),
    body: (args.body ?? "").trim(),
    head: assertSafeBranch(args.head),
    base: assertSafeBranch(args.base || meta.defaultBranch),
  };
}

function validationError(error: unknown): GitHubToolExecution | null {
  if (
    error instanceof Error &&
    /^(Refusing|Invalid|Binary|File content exceeds|Too many pending|repo must be)/.test(
      error.message
    )
  ) {
    return { result: { error: error.message, mutated: false } };
  }
  return null;
}

async function handleCreateOrUpdateFile(
  token: string,
  rawArgs: Record<string, unknown>,
  context: GitHubToolContext
): Promise<GitHubToolExecution> {
  try {
  const args = createOrUpdateFileArgs.parse(rawArgs);
  if (args.confirm) {
    const login = await getAuthenticatedLogin(token);
    const { owner, repo } = resolveOwnerRepo(args, login);
    const path = assertSafePath(args.path);
    assertSafeFileContent(args.content);
    const proposal = loadProposal(context.sessionToken, context.proposalCookie);
    const fileStep = proposal?.steps.find((step) => {
      if (step.action !== "create_or_update_file") {
        return false;
      }
      return (
        step.owner === owner &&
        step.repo === repo &&
        step.path === path &&
        step.content === args.content &&
        step.message === args.message &&
        (!args.branch || step.branch === args.branch)
      );
    });
    if (!proposal || !fileStep) {
      return {
        result: {
          error:
            "Refusing to write: there is no matching pending proposal. Propose first, summarize, and only confirm after the user says yes.",
          mutated: false,
        },
      };
    }
    return confirmStoredProposal(token, context, args.proposal_id || proposal.id);
  }

  const steps = await planCreateOrUpdateFile(token, args);
  let proposal = loadProposal(context.sessionToken, context.proposalCookie);
  for (const step of steps) {
    proposal = upsertProposalStep(context.sessionToken, context.proposalCookie, step);
  }
  if (!proposal) {
    return { result: { error: "Could not store write proposal", mutated: false } };
  }
  return pendingProposalCookie(proposal);
  } catch (error) {
    const handled = validationError(error);
    if (handled) return handled;
    throw error;
  }
}

async function handleCreateBranch(
  token: string,
  rawArgs: Record<string, unknown>,
  context: GitHubToolContext
) {
  try {
    const args = createBranchArgs.parse(rawArgs);
    const step = await planCreateBranch(token, args);
    return proposeOrConfirm(token, context, step, Boolean(args.confirm), args.proposal_id);
  } catch (error) {
    const handled = validationError(error);
    if (handled) return handled;
    throw error;
  }
}

async function handleCreatePullRequest(
  token: string,
  rawArgs: Record<string, unknown>,
  context: GitHubToolContext
) {
  try {
    const args = createPullRequestArgs.parse(rawArgs);
    const step = await planCreatePullRequest(token, args);
    return proposeOrConfirm(token, context, step, Boolean(args.confirm), args.proposal_id);
  } catch (error) {
    const handled = validationError(error);
    if (handled) return handled;
    throw error;
  }
}

async function handleConfirmWrite(
  token: string,
  rawArgs: Record<string, unknown>,
  context: GitHubToolContext
) {
  const args = confirmWriteArgs.parse(rawArgs);
  return confirmStoredProposal(token, context, args.proposal_id);
}

function handleDiscardWrite(rawArgs: Record<string, unknown>, context: GitHubToolContext) {
  const args = discardWriteArgs.parse(rawArgs);
  const proposal = loadProposal(context.sessionToken, context.proposalCookie);
  if (!proposal) {
    return {
      result: { discarded: false, mutated: false, note: "No pending GitHub write proposal." },
    } satisfies GitHubToolExecution;
  }
  if (args.proposal_id && !hashesEqual(proposal.id, args.proposal_id)) {
    return {
      result: { error: "proposal_id does not match the pending proposal", mutated: false },
    } satisfies GitHubToolExecution;
  }
  clearProposal(context.sessionToken);
  return {
    result: { discarded: true, mutated: false, proposal_id: proposal.id },
    proposalCookie: null,
  } satisfies GitHubToolExecution;
}

export const GITHUB_TOOL_DEFINITIONS = [
  {
    type: "function" as const,
    name: "list_repos",
    description:
      "List GitHub repositories the user can access, including private personal and organization repos. Use for questions like 'what repos do I have' or 'list my private repos'. Returns a short list suitable for speaking.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional name or description filter, e.g. voice or ios.",
        },
        visibility: {
          type: "string",
          enum: ["all", "public", "private"],
          description: "Filter by visibility. Default all.",
        },
        org: {
          type: "string",
          description: "Optional organization or owner login to filter, e.g. bunkcorp.",
        },
        limit: {
          type: "integer",
          description: "Max repos to return (1-50). Default 20.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "search_repos",
    description:
      "Search the user's GitHub repositories by name, description, or topic. Scoped to the authenticated user and their organizations when possible.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "GitHub repository search query, e.g. voice app or language:TypeScript.",
        },
        limit: {
          type: "integer",
          description: "Max results to return (1-50). Default 20.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "search_code",
    description:
      "Search code in the user's GitHub repositories. Use when asked to find a file, symbol, or snippet. Optionally scope to one repo.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Code search query, e.g. useRealtimeVoice or filename:route.ts session.",
        },
        repo: {
          type: "string",
          description: "Optional owner/name to search a single repository.",
        },
        limit: {
          type: "integer",
          description: "Max results to return (1-50). Default 10.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "get_file",
    description:
      "Read a file from a GitHub repository via the contents API. Large files are truncated. Use owner/name for repo.",
    parameters: {
      type: "object",
      properties: {
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
        path: {
          type: "string",
          description: "File path in the repository, e.g. src/lib/server/openai.ts.",
        },
        ref: {
          type: "string",
          description: "Optional branch, tag, or commit SHA. Defaults to the default branch.",
        },
      },
      required: ["repo", "path"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "get_repo",
    description:
      "Get metadata for one GitHub repository, including default branch and a short README excerpt when available.",
    parameters: {
      type: "object",
      properties: {
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
      },
      required: ["repo"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "list_commits",
    description: "List the most recent commits on a GitHub repository. Returns up to the last 10 commits.",
    parameters: {
      type: "object",
      properties: {
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
        limit: {
          type: "integer",
          description: "Number of commits to return (1-10). Default 10.",
        },
      },
      required: ["repo"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "create_or_update_file",
    description:
      "Propose creating or updating a UTF-8 file via the GitHub contents API. This does not write until the user says yes and you call confirm_github_write. Prefer a new branch; only set commit_to_default when the user explicitly asked to commit to main or master.",
    parameters: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Optional owner login if repo is not owner/name.",
        },
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
        path: {
          type: "string",
          description: "File path to create or update, e.g. docs/notes.md.",
        },
        content: {
          type: "string",
          description: "Full UTF-8 file contents. Secrets and .env files are rejected.",
        },
        message: {
          type: "string",
          description: "Commit message.",
        },
        branch: {
          type: "string",
          description:
            "Target branch. If omitted, a new voice-bot/* branch is created from the default branch.",
        },
        commit_to_default: {
          type: "boolean",
          description: "True only if the user explicitly asked to commit to the default branch.",
        },
        confirm: {
          type: "boolean",
          description:
            "If true, execute only when a matching pending proposal already exists. Default false proposes only.",
        },
        proposal_id: {
          type: "string",
          description: "Optional proposal id when confirm is true.",
        },
      },
      required: ["repo", "path", "content", "message"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "create_branch",
    description:
      "Propose creating a branch from the default branch or a specified base. Does not write until confirm_github_write.",
    parameters: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Optional owner login if repo is not owner/name.",
        },
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
        branch: {
          type: "string",
          description: "New branch name, e.g. voice-bot/docs-update.",
        },
        from: {
          type: "string",
          description: "Base branch or 40-character commit SHA. Defaults to the repository default branch.",
        },
        confirm: {
          type: "boolean",
          description:
            "If true, execute only when a matching pending proposal already exists. Default false proposes only.",
        },
        proposal_id: {
          type: "string",
          description: "Optional proposal id when confirm is true.",
        },
      },
      required: ["repo", "branch"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "create_pull_request",
    description:
      "Propose opening a pull request. Does not write until confirm_github_write.",
    parameters: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Optional owner login if repo is not owner/name.",
        },
        repo: {
          type: "string",
          description: "Repository as owner/name, e.g. bunkcorp/voiceapp.",
        },
        title: {
          type: "string",
          description: "Pull request title.",
        },
        body: {
          type: "string",
          description: "Optional pull request body.",
        },
        head: {
          type: "string",
          description: "Head branch containing the changes.",
        },
        base: {
          type: "string",
          description: "Base branch to merge into. Defaults to the repository default branch.",
        },
        confirm: {
          type: "boolean",
          description:
            "If true, execute only when a matching pending proposal already exists. Default false proposes only.",
        },
        proposal_id: {
          type: "string",
          description: "Optional proposal id when confirm is true.",
        },
      },
      required: ["repo", "title", "head"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "confirm_github_write",
    description:
      "Execute a pending GitHub write proposal after the user clearly said yes. Requires the proposal_id returned by the propose step. This is the only tool that mutates GitHub by itself.",
    parameters: {
      type: "object",
      properties: {
        proposal_id: {
          type: "string",
          description: "Proposal id from the pending write plan.",
        },
      },
      required: ["proposal_id"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "discard_github_write",
    description:
      "Discard a pending GitHub write proposal after the user said no or changed their mind. Does not change GitHub.",
    parameters: {
      type: "object",
      properties: {
        proposal_id: {
          type: "string",
          description: "Optional proposal id. Omit to discard the current pending proposal.",
        },
      },
      additionalProperties: false,
    },
  },
] as const;

export async function executeGitHubTool(
  name: GitHubToolName,
  rawArgs: Record<string, unknown>,
  context: GitHubToolContext
): Promise<GitHubToolExecution> {
  const { GITHUB_TOKEN } = getGitHubConfig();

  switch (name) {
    case "list_repos":
      return { result: await listRepos(GITHUB_TOKEN, listReposArgs.parse(rawArgs)) };
    case "search_repos":
      return { result: await searchRepos(GITHUB_TOKEN, searchReposArgs.parse(rawArgs)) };
    case "search_code":
      return { result: await searchCode(GITHUB_TOKEN, searchCodeArgs.parse(rawArgs)) };
    case "get_file":
      return { result: await getFile(GITHUB_TOKEN, getFileArgs.parse(rawArgs)) };
    case "get_repo":
      return { result: await getRepo(GITHUB_TOKEN, getRepoArgs.parse(rawArgs)) };
    case "list_commits":
      return { result: await listCommits(GITHUB_TOKEN, listCommitsArgs.parse(rawArgs)) };
    case "create_or_update_file":
      return handleCreateOrUpdateFile(GITHUB_TOKEN, rawArgs, context);
    case "create_branch":
      return handleCreateBranch(GITHUB_TOKEN, rawArgs, context);
    case "create_pull_request":
      return handleCreatePullRequest(GITHUB_TOKEN, rawArgs, context);
    case "confirm_github_write":
      return handleConfirmWrite(GITHUB_TOKEN, rawArgs, context);
    case "discard_github_write":
      return handleDiscardWrite(rawArgs, context);
    default: {
      const exhaustive: never = name;
      return { result: { error: `Unsupported tool: ${exhaustive}` } };
    }
  }
}

export { GITHUB_TOOL_NAMES, GitHubRequestError };
