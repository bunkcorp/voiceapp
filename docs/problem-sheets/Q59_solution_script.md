# ALTAM Sample Question 59 — Solution Script
*(Official Excel sample stub · Topic 6 / LO 6a · Type A UL)*

---

## 1. Problem restatement

**Excel-engine walkthrough.** Sheet **Question 59** in official ALTAM Excel sample workbooks.

**Contract:** Type **A** UL, issue age **60**, face **50,000**; terminates at **90** with AV paid. COI = **120%** SULT, \(i_q=0.03\), \(i_c=0.05\), declining corridor, SC schedule in workbook.

**Template:** Work in **K2:T32**; do not insert columns A–T.

**Parts:** (a) AV@90 for \(P=1600\) (show 85,000); (b) DB yrs 15/20/25; (c) CV yrs 1/2; (d) SC purpose; (e) Goal Seek \(P\) so AV(90)=0; (f)–(h) narrative / Type B / termination year.

---

## 2–3. Part-by-part walkthrough (Excel / stub)

### Part (a) — AV at age 90, \(P=1600\)

**How to say it in English.** Year by year charge expenses and COI on NAR, credit five percent, apply corridor.

**Official target:** AV@90 ≈ **84,726.91** → show **85,000**.

---

### Part (b) — Death benefits

**Official:** yr15 **50,000**; yr20 **50,000**; yr25 ≈ **60,410.40**.

---

### Part (c) — Cash values

**Official:** CV₁ = **0**; CV₂ ≈ **669.14**.

---

### Part (d) — Surrender charge purpose

Narrative on solutions sheet (recover acquisition costs / discourage early lapse / protect pool).

---

### Part (e) — Premium for AV(90)=0

**Official:** ≈ **957.94** (Goal Seek).

---

### Parts (f)–(h)

Type B variant / termination: official termination year = **27**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type A AV | \((\mathrm{AV}+P-e-\mathrm{CoI})(1+i_c)\); corridor on DB |
| CV | \(\max(0,\mathrm{AV}-\mathrm{SC})\) |
| Premium solve | Goal Seek AV₉₀(P)=0 |

**Official targets (verify_q59.py):** AV₉₀ ≈ **84,726.91**; DB 15/20/25 = **50k/50k/60,410**; CV 1/2 = **0/669.14**; \(P^*\) ≈ **957.94**; Type B term year **27**.

See `ALTAM_Q59_PQ_Dev/EXCEL_SAMPLE_STUB.md`.
