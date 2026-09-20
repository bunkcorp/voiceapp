# Formula sheet memorization scripts

Bundled study scripts the voice assistant can search and read when you ask about ALTAM or FAM formula sheets.

| Doc id | File | Source (ActuarialExams) |
| --- | --- | --- |
| `altam-fs` | `ALTAM_FS_Memorization_Script.md` | `Exam_Prep/ALTAM/Formula Sheet/ALTAM_FS_Memorization_Script.md` |
| `fam-fs` | `FAM_FS_Memorization_Script_from_G.md` | `Exam_Prep/FAM/Formula Sheet/FAM_FS_Memorization_Script_from_G.md` |

## How to ask (voice.karmadots.org)

Examples:

- “What’s on the ALTAM formula sheet for Part F equity-linked?”
- “Black-Scholes put from the FAM formula script”
- “Quiz me on Thiele’s equation from the ALTAM memorization script”
- “FAM option pricing put-call parity mnemonic”

The assistant uses `search_knowledge` / `get_knowledge_section` (not GitHub) for these files.

## Refresh after script updates

From the voiceapp repo root (paths assume ActuarialExams sits next to voiceapp on Desktop):

```bash
npm run sync:formula-sheets
```

Or with an explicit source root:

```bash
ACTUARIAL_EXAMS_ROOT=/path/to/ActuarialExams npm run sync:formula-sheets
```

Then commit the updated files under `docs/formula-sheets/`, push, and redeploy if needed:

```bash
git add docs/formula-sheets
git commit -m "Refresh ALTAM/FAM formula memorization scripts."
git push
vercel --prod   # only if git auto-deploy is unreliable
```

Do not point production at a Desktop path at runtime — only the copies in this folder ship with the app.
