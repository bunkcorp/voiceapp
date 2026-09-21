# ALTAM problem solution scripts

Bundled tutor-style solution scripts for SOA Exam ALTAM sample questions **Q1–Q61**.

| Doc id | File |
| --- | --- |
| `q01` | `Q01_solution_script.md` |
| `q02` | `Q02_solution_script.md` |
| `q03` | `Q03_solution_script.md` |
| `q04` | `Q04_solution_script.md` |
| `q05` | `Q05_solution_script.md` |
| `q06` | `Q06_solution_script.md` |
| `q07` | `Q07_solution_script.md` |
| `q08` | `Q08_solution_script.md` |
| `q09` | `Q09_solution_script.md` |
| `q10` | `Q10_solution_script.md` |
| `q11` | `Q11_solution_script.md` |
| `q12` | `Q12_solution_script.md` |
| `q13` | `Q13_solution_script.md` |
| `q14` | `Q14_solution_script.md` |
| `q15` | `Q15_solution_script.md` |
| `q16` | `Q16_solution_script.md` |
| `q17` | `Q17_solution_script.md` |
| `q18` | `Q18_solution_script.md` |
| `q19` | `Q19_solution_script.md` |
| `q20` | `Q20_solution_script.md` |
| `q21` | `Q21_solution_script.md` |
| `q22` | `Q22_solution_script.md` |
| `q23` | `Q23_solution_script.md` |
| `q24` | `Q24_solution_script.md` |
| `q25` | `Q25_solution_script.md` |
| `q26` | `Q26_solution_script.md` |
| `q27` | `Q27_solution_script.md` |
| `q28` | `Q28_solution_script.md` |
| `q29` | `Q29_solution_script.md` |
| `q30` | `Q30_solution_script.md` |
| `q31` | `Q31_solution_script.md` |
| `q32` | `Q32_solution_script.md` |
| `q33` | `Q33_solution_script.md` |
| `q34` | `Q34_solution_script.md` |
| `q35` | `Q35_solution_script.md` |
| `q36` | `Q36_solution_script.md` |
| `q37` | `Q37_solution_script.md` |
| `q38` | `Q38_solution_script.md` |
| `q39` | `Q39_solution_script.md` |
| `q40` | `Q40_solution_script.md` |
| `q41` | `Q41_solution_script.md` |
| `q42` | `Q42_solution_script.md` |
| `q43` | `Q43_solution_script.md` |
| `q44` | `Q44_solution_script.md` |
| `q45` | `Q45_solution_script.md` |
| `q46` | `Q46_solution_script.md` |
| `q47` | `Q47_solution_script.md` |
| `q48` | `Q48_solution_script.md` |
| `q49` | `Q49_solution_script.md` |
| `q50` | `Q50_solution_script.md` |
| `q51` | `Q51_solution_script.md` |
| `q52` | `Q52_solution_script.md` |
| `q53` | `Q53_solution_script.md` |
| `q54` | `Q54_solution_script.md` |
| `q55` | `Q55_solution_script.md` |
| `q56` | `Q56_solution_script.md` |
| `q57` | `Q57_solution_script.md` |
| `q58` | `Q58_solution_script.md` |
| `q59` | `Q59_solution_script.md` |
| `q60` | `Q60_solution_script.md` |
| `q61` | `Q61_solution_script.md` |

## How to ask (voice.karmadots.org)

Use the **Problem sheets** chip, pick a question (e.g. Q55), then ask follow-ups. Or say:

- “Walk me through ALTAM sample question 30”
- “What’s the intuition for part (a) of Q1?”
- “Quiz me on the formula cheat sheet for Q55”

The assistant uses `search_knowledge` / `get_knowledge_section` with doc ids like `q01` … `q61`.

## Refresh after script updates

From the voiceapp repo root (paths assume soa-altam-videos sits next to voiceapp on Desktop):

```bash
npm run sync:problem-sheets
```

Or with an explicit source root:

```bash
SOA_ALTAM_ROOT=/path/to/soa-altam-videos npm run sync:problem-sheets
```

Then commit `docs/problem-sheets/`, push, and redeploy if needed.

Do not point production at a Desktop path at runtime — only the copies in this folder ship with the app.
