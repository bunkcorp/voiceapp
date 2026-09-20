export const KNOWLEDGE_TOOL_NAMES = [
  "list_knowledge_docs",
  "search_knowledge",
  "get_knowledge_section",
] as const;

export type KnowledgeToolName = (typeof KNOWLEDGE_TOOL_NAMES)[number];

export function isKnowledgeToolName(name: string): name is KnowledgeToolName {
  return (KNOWLEDGE_TOOL_NAMES as readonly string[]).includes(name);
}
