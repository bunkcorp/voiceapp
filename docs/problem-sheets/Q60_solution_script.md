# ALTAM Sample Question 60 — Solution Script
*(Official Excel sample stub · Topic 5 / LO 5e · FAS DB / PUC)*

---

## 1. Problem restatement

**Excel-engine walkthrough.** Sheet **Question 60** in official ALTAM Excel sample workbooks.

**Plan:** FAS DB; accrual \(\alpha=1.7\%\); **3-year** final average; **PUC**; service table + salary scale. Member age **55**, **25** years service, salary **100,000**. No ER reduction before **65**. Monthly life annuity-due; \(i=5\%\).

**Parts:** (a) final salary@65 show **114,350**; (b) AL show **389,600**; (c) NC; (d)–(f) early-retirement narrative/schedules in official file.

---

## 2–3. Part-by-part walkthrough (Excel / stub)

### Part (a) — Final salary at 65

**How to say it in English.** Grow today’s salary along the plan scale to age sixty-five.

**Official target:** ≈ **114,354.47** → show **114,350**.

---

### Part (b) — PUC actuarial liability

Past service × accrual × projected FAS × annuities × exits—unit-credit columns in workbook.

**Official target:** ≈ **389,607.16** → show **389,600**.

---

### Part (c) — Normal contribution

Published identity: \(\mathrm{NC}=\mathrm{AL}/25\).

**Official target:** ≈ **15,584.29**.

---

### Parts (d)–(f)

Purpose of ER reductions, fair schedule, replacement rates—official solutions sheet only; no invented closed forms.

---

## 4. Formula cheat sheet

| Use | Formula / idea |
|-----|----------------|
| Projected salary | \(S_{65}=S_{55}\times(\text{scale})\) |
| PUC AL | Past service × \(\alpha\) × proj. FAS × annuity × exits |
| NC (this stub) | \(\mathrm{AL}/25\) |

**Official targets (verify_q60.py):** salary@65 ≈ **114,354**; AL ≈ **389,607**; NC ≈ **15,584**.

See `ALTAM_Q60_PQ_Dev/EXCEL_SAMPLE_STUB.md`.
