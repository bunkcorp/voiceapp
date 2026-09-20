#!/usr/bin/env npx tsx
/**
 * Copy ALTAM/FAM formula memorization scripts from ActuarialExams into docs/formula-sheets.
 *
 * Usage:
 *   npm run sync:formula-sheets
 *   ACTUARIAL_EXAMS_ROOT=/path/to/ActuarialExams npm run sync:formula-sheets
 */
import { copyFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot =
  process.env.ACTUARIAL_EXAMS_ROOT ||
  path.resolve(root, "..", "ActuarialExams");

const files = [
  {
    from: path.join(
      sourceRoot,
      "Exam_Prep",
      "ALTAM",
      "Formula Sheet",
      "ALTAM_FS_Memorization_Script.md"
    ),
    to: path.join(
      root,
      "docs",
      "formula-sheets",
      "ALTAM_FS_Memorization_Script.md"
    ),
  },
  {
    from: path.join(
      sourceRoot,
      "Exam_Prep",
      "FAM",
      "Formula Sheet",
      "FAM_FS_Memorization_Script_from_G.md"
    ),
    to: path.join(
      root,
      "docs",
      "formula-sheets",
      "FAM_FS_Memorization_Script_from_G.md"
    ),
  },
];

async function main() {
  await mkdir(path.join(root, "docs", "formula-sheets"), { recursive: true });

  for (const file of files) {
    try {
      await access(file.from);
    } catch {
      console.error(`Missing source: ${file.from}`);
      console.error(
        "Set ACTUARIAL_EXAMS_ROOT to your ActuarialExams checkout and retry."
      );
      process.exit(1);
    }
    await copyFile(file.from, file.to);
    console.log(`Synced ${path.basename(file.to)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
