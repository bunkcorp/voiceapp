export const GITHUB_READ_TOOL_NAMES = [
  "list_repos",
  "search_repos",
  "search_code",
  "get_file",
  "get_repo",
  "list_commits",
] as const;

export const GITHUB_WRITE_TOOL_NAMES = [
  "create_or_update_file",
  "create_branch",
  "create_pull_request",
  "confirm_github_write",
  "discard_github_write",
] as const;

export const GITHUB_TOOL_NAMES = [
  ...GITHUB_READ_TOOL_NAMES,
  ...GITHUB_WRITE_TOOL_NAMES,
] as const;

export type GitHubToolName = (typeof GITHUB_TOOL_NAMES)[number];
export type GitHubWriteToolName = (typeof GITHUB_WRITE_TOOL_NAMES)[number];

export function isGitHubToolName(name: string): name is GitHubToolName {
  return (GITHUB_TOOL_NAMES as readonly string[]).includes(name);
}

export function isGitHubWriteToolName(name: string): name is GitHubWriteToolName {
  return (GITHUB_WRITE_TOOL_NAMES as readonly string[]).includes(name);
}
