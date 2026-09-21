#!/usr/bin/env npx tsx
/**
 * Copy ALTAM sample-question solution scripts into docs/problem-sheets.
 *
 * Usage:
 *   npm run sync:problem-sheets
 *   SOA_ALTAM_ROOT=/path/to/soa-altam-videos npm run sync:problem-sheets
 */
import { copyFile, mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot =
  process.env.SOA_ALTAM_ROOT ||
  path.resolve(root, "..", "soa-altam-videos");

const sourceDir = path.join(
  sourceRoot,
  "Practice Problems",
  "solution_scripts"
);
const destDir = path.join(root, "docs", "problem-sheets");

const SCRIPT_RE = /^Q(\d{2})_solution_script\.md$/i;

async function main() {
  try {
    await access(sourceDir);
  } catch {
    console.error(`Missing source directory: ${sourceDir}`);
    console.error(
      "Set SOA_ALTAM_ROOT to your soa-altam-videos checkout and retry."
    );
    process.exit(1);
  }

  await mkdir(destDir, { recursive: true });

  const entries = await readdir(sourceDir);
  const scripts = entries
    .filter((name) => SCRIPT_RE.test(name))
    .sort((a, b) => {
      const na = Number(SCRIPT_RE.exec(a)?.[1] ?? 0);
      const nb = Number(SCRIPT_RE.exec(b)?.[1] ?? 0);
      return na - nb;
    });

  if (scripts.length === 0) {
    console.error(`No Q##_solution_script.md files found in ${sourceDir}`);
    process.exit(1);
  }

  const manifest: Array<{
    id: string;
    label: string;
    filename: string;
    question: number;
  }> = [];

  for (const filename of scripts) {
    const match = SCRIPT_RE.exec(filename);
    if (!match) continue;
    const padded = match[1];
    const question = Number(padded);
    const id = `q${padded}`;
    const label = `Q${question}`;
    await copyFile(path.join(sourceDir, filename), path.join(destDir, filename));
    console.log(`Synced ${filename}`);
    manifest.push({ id, label, filename, question });
  }

  // Keep a short study README in docs; do not overwrite with the source README
  // if one already exists from a previous sync of our template.
  const readmePath = path.join(destDir, "README.md");
  await writeFile(
    readmePath,
    `# ALTAM problem solution scripts

Bundled tutor-style solution scripts for SOA Exam ALTAM sample questions **Q1–Q${manifest[manifest.length - 1]?.question ?? 61}**.

| Doc id | File |
| --- | --- |
${manifest.map((row) => `| \`${row.id}\` | \`${row.filename}\` |`).join("\n")}

## How to ask (voice.karmadots.org)

Use the **Problem sheets** chip, pick a question (e.g. Q55), then ask follow-ups. Or say:

- “Walk me through ALTAM sample question 30”
- “What’s the intuition for part (a) of Q1?”
- “Quiz me on the formula cheat sheet for Q55”

The assistant uses \`search_knowledge\` / \`get_knowledge_section\` with doc ids like \`q01\` … \`q61\`.

## Refresh after script updates

From the voiceapp repo root (paths assume soa-altam-videos sits next to voiceapp on Desktop):

\`\`\`bash
npm run sync:problem-sheets
\`\`\`

Or with an explicit source root:

\`\`\`bash
SOA_ALTAM_ROOT=/path/to/soa-altam-videos npm run sync:problem-sheets
\`\`\`

Then commit \`docs/problem-sheets/\`, push, and redeploy if needed.

Do not point production at a Desktop path at runtime — only the copies in this folder ship with the app.
`,
    "utf8"
  );

  await writeFile(
    path.join(destDir, "manifest.json"),
    `${JSON.stringify({ problems: manifest }, null, 2)}\n`,
    "utf8"
  );

  console.log(`Synced ${manifest.length} problem sheets → ${destDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
