/** Catalog of bundled ALTAM sample-question solution scripts (Q1–Q61). */
export type ProblemSheet = {
  id: string;
  label: string;
  filename: string;
  question: number;
};

export const PROBLEM_SHEETS: ProblemSheet[] = Array.from(
  { length: 61 },
  (_, index) => {
    const question = index + 1;
    const padded = String(question).padStart(2, "0");
    return {
      id: `q${padded}`,
      label: `Q${question}`,
      filename: `Q${padded}_solution_script.md`,
      question,
    };
  }
);

/** User cue sent when a problem sheet is selected from the chip dropdown. */
export function problemSheetVoiceCue(problem: ProblemSheet): string {
  return `I selected Problem sheets ${problem.label} (doc_id ${problem.id}). Please ask whether I want to walk through ${problem.label}, then use search_knowledge / get_knowledge_section with doc_id ${problem.id} for that solution script. Prefer that document for follow-up questions until I pick a different problem.`;
}
