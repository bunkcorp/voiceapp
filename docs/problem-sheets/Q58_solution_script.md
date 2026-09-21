# ALTAM Sample Question 58 — Solution Script
*(Official Excel sample stub · Topic 4 / LO 4c · Profit testing)*

---

## 1. Problem restatement

**Excel-engine walkthrough.** Sheet **Question 58** in official ALTAM Excel sample workbooks.

**Contract:** Fully discrete **20-year term**, issue age **70**, SA **100,000**, SULT; **5%** lapses years **1–10**. Pre-contract **300**; maint **100**@\(t=0\) inflating **2.5%**/yr; commission **5%** of GP. Reserves given; earned **6%**; hurdle **12%**.

**Parts:** (a) Pr and \(\Pi\) for \(t=0,\ldots,20\); (b) NPV@12%; (c) profit margin; (d)–(f) charts / zeroized reserves / critique in workbook.

---

## 2–3. Part-by-part walkthrough (Excel / stub)

### Part (a) — Profit vector and signature

**How to say it in English.** Fill a twenty-one-row grid: what you held and collected, grown at six percent, minus claims and end reserves for survivors.

Do **not** invent a closed-form Pr table—use workbook reserve schedule + SULT/lapse.

---

### Part (b) — NPV @ 12%

\[
\mathrm{NPV}=\sum_{t=0}^{20}\Pi_t\,v_{0.12}^{t}
\]

**Official target:** ≈ **3441.59** → show **3440**.

---

### Part (c) — Profit margin

**Official target:** ≈ **0.1924** (**19.24%**).

---

### Parts (d)–(f)

Charts / zeroized-reserve NPV / written critique in official workbook.

**Official (e)(ii):** zeroized NPV ≈ **2803.11** → show **2800**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Profit \(t\ge 1\) | \((V_{t-1}+P-E)(1.06)-\mathbb{E}[\mathrm{DB}]-{}_{1}p V_t\) |
| Signature | \(\Pi_t={}_{t-1}p\,\mathrm{Pr}_t\) |
| NPV / margin | \(\sum\Pi_t v^{t}\); \(\mathrm{NPV}/\mathrm{EPV}[\mathrm{GP}]\) |

**Official targets (verify_q58.py):** NPV ≈ **3441.59**; margin ≈ **0.1924**; zeroized NPV ≈ **2803.11**.

See `ALTAM_Q58_PQ_Dev/EXCEL_SAMPLE_STUB.md`.
