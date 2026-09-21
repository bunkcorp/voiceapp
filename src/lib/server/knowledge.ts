import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod/v4";
import {
  KNOWLEDGE_TOOL_NAMES,
  type KnowledgeToolName,
} from "@/lib/realtime/knowledgeTools";

const SECTION_CHAR_LIMIT = 12_000;
const SEARCH_SNIPPET_LIMIT = 4_000;
const MAX_SEARCH_RESULTS = 6;

type KnowledgeKind = "formula-sheet" | "problem-sheet";

type KnowledgeDocMeta = {
  id: string;
  title: string;
  exam: "ALTAM" | "FAM";
  kind: KnowledgeKind;
  filename: string;
  description: string;
  topics: string[];
};

type KnowledgeSection = {
  id: string;
  docId: string;
  heading: string;
  level: number;
  text: string;
};

type LoadedDoc = KnowledgeDocMeta & {
  sections: KnowledgeSection[];
};

const FORMULA_DOC_META: Omit<KnowledgeDocMeta, "kind">[] = [
  {
    id: "altam-fs",
    title: "ALTAM Formula Sheet Memorization Script",
    exam: "ALTAM",
    filename: "ALTAM_FS_Memorization_Script.md",
    description:
      "ACTEX ALTAM formula & review sheet memorization script (Parts A–G: multi-state through pensions, including equity-linked / embedded options).",
    topics: [
      "ALTAM",
      "formula sheet",
      "multi-state",
      "Thiele",
      "multiple decrement",
      "multiple life",
      "profit testing",
      "universal life",
      "equity-linked",
      "GMDB",
      "put",
      "pensions",
      "Part F",
    ],
  },
  {
    id: "fam-fs",
    title: "FAM Formula Sheet Memorization Script (from G Option Pricing)",
    exam: "FAM",
    filename: "FAM_FS_Memorization_Script_from_G.md",
    description:
      "ACTEX FAM formula sheet memorization script from G. Option Pricing through FAM-L (Black–Scholes, binomial, survival, insurance, annuities, premiums, reserves).",
    topics: [
      "FAM",
      "formula sheet",
      "option pricing",
      "Black-Scholes",
      "Black–Scholes",
      "put",
      "call",
      "binomial",
      "put-call parity",
      "survival",
      "annuities",
      "reserves",
    ],
  },
];

let cache: LoadedDoc[] | null = null;

function formulaSheetsRoot() {
  return path.join(process.cwd(), "docs", "formula-sheets");
}

function problemSheetsRoot() {
  return path.join(process.cwd(), "docs", "problem-sheets");
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/\$[^$]*\$/g, " ")
    .replace(/\\\([^)]*\\\)/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseSections(docId: string, markdown: string): KnowledgeSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: KnowledgeSection[] = [];
  let currentHeading = "Introduction";
  let currentLevel = 1;
  let buffer: string[] = [];
  const usedIds = new Map<string, number>();

  function pushSection() {
    const text = buffer.join("\n").trim();
    if (!text && sections.length === 0) {
      buffer = [];
      return;
    }
    const base = slugify(currentHeading) || "section";
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    sections.push({
      id,
      docId,
      heading: currentHeading,
      level: currentLevel,
      text: text || currentHeading,
    });
    buffer = [];
  }

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.+)$/.exec(line);
    if (match) {
      pushSection();
      currentLevel = match[1].length;
      currentHeading = match[2].trim();
      buffer.push(line);
      continue;
    }
    buffer.push(line);
  }
  pushSection();
  return sections;
}

function firstHeading(markdown: string): string | null {
  const match = /^#\s+(.+)$/m.exec(markdown);
  return match?.[1]?.trim() ?? null;
}

async function loadFormulaDocs(): Promise<LoadedDoc[]> {
  const root = formulaSheetsRoot();
  let available: Set<string>;
  try {
    available = new Set(await readdir(root));
  } catch {
    console.warn(`[knowledge] missing formula-sheets dir ${root}`);
    return [];
  }

  const loaded: LoadedDoc[] = [];
  for (const meta of FORMULA_DOC_META) {
    if (!available.has(meta.filename)) {
      console.warn(`[knowledge] missing ${meta.filename} in ${root}`);
      continue;
    }
    const markdown = await readFile(path.join(root, meta.filename), "utf8");
    loaded.push({
      ...meta,
      kind: "formula-sheet",
      sections: parseSections(meta.id, markdown),
    });
  }
  return loaded;
}

const PROBLEM_SCRIPT_RE = /^Q(\d{2})_solution_script\.md$/i;

async function loadProblemDocs(): Promise<LoadedDoc[]> {
  const root = problemSheetsRoot();
  let entries: string[];
  try {
    entries = await readdir(root);
  } catch {
    console.warn(`[knowledge] missing problem-sheets dir ${root}`);
    return [];
  }

  const files = entries
    .filter((name) => PROBLEM_SCRIPT_RE.test(name))
    .sort((a, b) => {
      const na = Number(PROBLEM_SCRIPT_RE.exec(a)?.[1] ?? 0);
      const nb = Number(PROBLEM_SCRIPT_RE.exec(b)?.[1] ?? 0);
      return na - nb;
    });

  const loaded: LoadedDoc[] = [];
  for (const filename of files) {
    const match = PROBLEM_SCRIPT_RE.exec(filename);
    if (!match) continue;
    const padded = match[1];
    const question = Number(padded);
    const id = `q${padded}`;
    const markdown = await readFile(path.join(root, filename), "utf8");
    const title =
      firstHeading(markdown) ?? `ALTAM Sample Question ${question} — Solution Script`;
    loaded.push({
      id,
      title,
      exam: "ALTAM",
      kind: "problem-sheet",
      filename,
      description: `Tutor-style solution script for ALTAM sample question ${question} (${id}).`,
      topics: [
        "ALTAM",
        "problem sheet",
        "solution script",
        `Q${question}`,
        `Q${padded}`,
        id,
        `question ${question}`,
        "sample question",
      ],
      sections: parseSections(id, markdown),
    });
  }
  return loaded;
}

async function loadDocs(): Promise<LoadedDoc[]> {
  if (cache) {
    return cache;
  }

  cache = [...(await loadFormulaDocs()), ...(await loadProblemDocs())];
  return cache;
}

function truncate(text: string, limit: number) {
  if (text.length <= limit) {
    return { text, truncated: false as const };
  }
  return {
    text: `${text.slice(0, limit)}\n\n[Truncated: ${text.length - limit} more characters in this section]`,
    truncated: true as const,
  };
}

function normalizeSearchText(text: string) {
  return text.toLowerCase().replace(/[–—]/g, "-");
}

function tokenize(query: string) {
  return normalizeSearchText(query)
    .split(/[^a-z0-9.+-]+/)
    .filter((token) => token.length > 1);
}

function resolveDocId(docs: LoadedDoc[], docId: string): LoadedDoc[] {
  const lowered = docId.toLowerCase();
  const exact = docs.filter(
    (doc) =>
      doc.id === lowered ||
      doc.id === docId ||
      doc.exam.toLowerCase() === lowered
  );
  if (exact.length > 0) {
    return exact;
  }

  // Accept Q55 / q55 / question 55 style ids
  const questionMatch = /^(?:q|question\s*)?0*(\d{1,2})$/i.exec(docId.trim());
  if (questionMatch) {
    const padded = questionMatch[1].padStart(2, "0");
    const id = `q${padded}`;
    return docs.filter((doc) => doc.id === id);
  }

  return [];
}

function scoreSection(section: KnowledgeSection, doc: LoadedDoc, tokens: string[]) {
  const heading = normalizeSearchText(section.heading);
  const body = normalizeSearchText(section.text);
  const topicBlob = normalizeSearchText(
    `${doc.title} ${doc.description} ${doc.topics.join(" ")}`
  );
  let score = 0;

  for (const token of tokens) {
    if (heading.includes(token)) score += 8;
    if (topicBlob.includes(token)) score += 3;
    if (body.includes(token)) score += 1;
    if (doc.exam.toLowerCase() === token) score += 5;
    if (doc.id.includes(token)) score += 4;
  }

  if (
    tokens.some((t) => t === "formula" || t === "sheet") &&
    doc.kind === "formula-sheet"
  ) {
    score += 2;
  }

  if (
    tokens.some(
      (t) =>
        t === "problem" ||
        t === "solution" ||
        t === "sample" ||
        t.startsWith("q")
    ) &&
    doc.kind === "problem-sheet"
  ) {
    score += 2;
  }

  // Strong boost when query mentions this problem number
  const qTokens = tokens.filter((t) => /^q?\d{1,2}$/.test(t));
  for (const token of qTokens) {
    const num = token.replace(/^q/, "").replace(/^0+/, "") || "0";
    const padded = num.padStart(2, "0");
    if (doc.id === `q${padded}`) score += 20;
  }

  return score;
}

async function listKnowledgeDocs() {
  const docs = await loadDocs();
  return {
    docs: docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      exam: doc.exam,
      kind: doc.kind,
      filename: doc.filename,
      description: doc.description,
      topics: doc.topics,
      section_count: doc.sections.length,
      // Problem sheets can be many; keep section outlines short.
      sections: doc.sections
        .filter((section) => section.level <= 2)
        .slice(0, doc.kind === "problem-sheet" ? 12 : 40)
        .map((section) => ({
          id: section.id,
          heading: section.heading,
          level: section.level,
        })),
    })),
  };
}

const searchArgs = z.object({
  query: z.string().min(1).max(300),
  doc_id: z.string().optional(),
  limit: z.number().int().min(1).max(MAX_SEARCH_RESULTS).optional(),
});

async function searchKnowledge(args: z.infer<typeof searchArgs>) {
  const docs = await loadDocs();
  const tokens = tokenize(args.query);
  if (tokens.length === 0) {
    return { results: [], note: "Query had no searchable tokens." };
  }

  const scoped = args.doc_id ? resolveDocId(docs, args.doc_id) : docs;

  if (scoped.length === 0) {
    return {
      results: [],
      note: `No knowledge doc matched doc_id=${args.doc_id}. Use list_knowledge_docs.`,
    };
  }

  const scored = scoped.flatMap((doc) =>
    doc.sections.map((section) => ({
      doc,
      section,
      score: scoreSection(section, doc, tokens),
    }))
  );

  const limit = args.limit ?? 4;
  const results = scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc, section, score }) => {
      const snippet = truncate(section.text, SEARCH_SNIPPET_LIMIT);
      return {
        doc_id: doc.id,
        exam: doc.exam,
        kind: doc.kind,
        section_id: section.id,
        heading: section.heading,
        score,
        truncated: snippet.truncated,
        content: snippet.text,
      };
    });

  return {
    query: args.query,
    result_count: results.length,
    results,
    note:
      results.length === 0
        ? "No sections matched. Try list_knowledge_docs, then get_knowledge_section with a known heading."
        : undefined,
  };
}

const getSectionArgs = z.object({
  doc_id: z.string().min(1),
  section_id: z.string().optional(),
  heading_query: z.string().optional(),
});

async function getKnowledgeSection(args: z.infer<typeof getSectionArgs>) {
  const docs = await loadDocs();
  const matches = resolveDocId(docs, args.doc_id);
  const doc = matches[0];

  if (!doc) {
    return {
      error: `Unknown doc_id ${args.doc_id}. Use list_knowledge_docs for ids like altam-fs, fam-fs, or q01–q61.`,
    };
  }

  let section: KnowledgeSection | undefined;

  if (args.section_id) {
    section = doc.sections.find((item) => item.id === args.section_id);
  }

  if (!section && args.heading_query) {
    const tokens = tokenize(args.heading_query);
    section = doc.sections
      .map((item) => ({ item, score: scoreSection(item, doc, tokens) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.item;
  }

  // Default: first section (usually title / restatement) so the model can start a walkthrough.
  if (!section && !args.section_id && !args.heading_query) {
    section = doc.sections[0];
  }

  if (!section) {
    return {
      error: "Section not found. Pass section_id from search_knowledge or a heading_query.",
      doc_id: doc.id,
      available_top_sections: doc.sections
        .filter((item) => item.level <= 2)
        .slice(0, 30)
        .map((item) => ({ id: item.id, heading: item.heading })),
    };
  }

  const body = truncate(section.text, SECTION_CHAR_LIMIT);
  return {
    doc_id: doc.id,
    exam: doc.exam,
    kind: doc.kind,
    section_id: section.id,
    heading: section.heading,
    truncated: body.truncated,
    content: body.text,
  };
}

export const KNOWLEDGE_TOOL_DEFINITIONS = [
  {
    type: "function" as const,
    name: "list_knowledge_docs",
    description:
      "List bundled actuarial knowledge docs: ALTAM/FAM formula memorization scripts and ALTAM sample-question solution scripts (q01–q61). Use when the user asks what formula sheets or problem sheets are available.",
    parameters: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "search_knowledge",
    description:
      "Search bundled formula memorization scripts and ALTAM problem solution scripts by topic, formula name, or question (e.g. Q55, Black-Scholes put, Part F equity-linked, Thiele). When a problem is selected, pass doc_id like q55.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search text, e.g. Black-Scholes put, Part F equity-linked GMDB, or Q30 NPV.",
        },
        doc_id: {
          type: "string",
          description:
            "Optional doc id: altam-fs, fam-fs, q01–q61 (or ALTAM / FAM / Q55).",
        },
        limit: {
          type: "integer",
          description: "Max sections to return (1-6). Default 4.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    type: "function" as const,
    name: "get_knowledge_section",
    description:
      "Read one section from a bundled formula or problem solution script. Use section_id from search_knowledge or list_knowledge_docs, or heading_query to resolve a heading. For problem sheets, doc_id is q01–q61.",
    parameters: {
      type: "object",
      properties: {
        doc_id: {
          type: "string",
          description: "altam-fs, fam-fs, or q01–q61 (or ALTAM / FAM / Q55).",
        },
        section_id: {
          type: "string",
          description: "Section id from search or list results.",
        },
        heading_query: {
          type: "string",
          description: "Optional heading keywords if section_id is unknown.",
        },
      },
      required: ["doc_id"],
      additionalProperties: false,
    },
  },
];

export async function executeKnowledgeTool(
  name: KnowledgeToolName,
  rawArgs: Record<string, unknown>
) {
  switch (name) {
    case "list_knowledge_docs":
      return listKnowledgeDocs();
    case "search_knowledge":
      return searchKnowledge(searchArgs.parse(rawArgs));
    case "get_knowledge_section":
      return getKnowledgeSection(getSectionArgs.parse(rawArgs));
    default: {
      const _exhaustive: never = name;
      return { error: `Unknown knowledge tool: ${_exhaustive}` };
    }
  }
}

export { KNOWLEDGE_TOOL_NAMES };
