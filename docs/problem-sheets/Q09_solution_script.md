# ALTAM Sample Question 9 — Solution Script
*(7 points · Hybrid LTC + life)*

---

## 1. Problem restatement

**Product.** 10-year hybrid LTC + life, issued **1/1/2009**.

| Feature | Detail |
|---------|--------|
| LTC | Reimbursement, max **2,000**/mo when needing help with ≥2 of 6 ADLs |
| Waiting / off | **3**-month waiting period; **6**-month off period (part (d) changes off to **12**) |
| Life sum insured | **100,000** |
| Premium | **150**/mo while Active (≥5 ADLs) |

**Experience timeline:**

| Period | Status | Care cost |
|--------|--------|-----------|
| Most of 1/1/2009–6/30/2018 | Active (≥5 ADLs) | — |
| 1/1/2012–6/30/2012 (6 mo) | 4 ADLs | 1,000/mo outpatient |
| 3/31/2013–11/30/2013 (8 mo) | 3 ADLs | 2,500/mo inpatient (cap at 2,000) |
| 7/1/2018 | Death | — |

**Parts.** (a) List six ADLs. (b) Sketch a Markov model. (c) Death benefit under ROP vs accelerated. (d) Δ total benefits if off period → 12 months.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Six ADLs (1 pt)

**Intuition.** Standard LTC exam list — memorize once.

**Answer to report:** Bathing, Dressing, Eating, Toileting, Continence, Transferring.

---

### Part (b) — Markov sketch (2 pts)

**Intuition.** Track ADL capacity and death; LTC eligibility depends on how many ADLs remain.

**One acceptable model:**

| State | Meaning |
|------:|---------|
| 0 | Active (≥5 ADLs) |
| 1 | Impaired (4 ADLs) |
| 2 | Severely impaired (≤3 ADLs) |
| 3 | Dead |

Transitions: \(0\leftrightarrow 1\leftrightarrow 2\), and each living state → Dead. (Other reasonable sketches also earn credit.)

**Answer to report:** a labeled 4-state diagram as above (or equivalent).

---

### Part (c)(i) — Death benefit, return-of-premium approach (1 pt)

**Intuition.** ROP death benefit = face + \(\max(\text{premiums paid}-\text{LTC benefits},0)\).

**How to say it in English.** Add back any unused premium (premiums minus LTC reimbursements) onto the 100,000 life cover.

**Active months / premiums:**

\[
36+9+55=100\text{ months active}
\qquad\Rightarrow\qquad
100\times 150=\mathbf{15{,}000}\text{ premiums}
\]

**LTC reimbursements (6-month off → second claim has waiting period):**

\[
\text{Claim 1: }(6-3)\times 1{,}000=\mathbf{3{,}000}
\]

\[
\text{Claim 2: }(8-3)\times 2{,}000=\mathbf{10{,}000}
\quad\text{(capped; care was 2,500)}
\]

\[
\text{Total LTC}=13{,}000
\qquad
\text{ROP add-on}=15{,}000-13{,}000=2{,}000
\]

\[
\mathrm{DB}_{\mathrm{ROP}}=100{,}000+2{,}000=\mathbf{102{,}000}
\]

**Answer to report:** **102,000**.

---

### Part (c)(ii) — Death benefit, accelerated approach (1 pt)

**Intuition.** Accelerated: LTC draws down the life sum insured.

\[
\mathrm{DB}_{\mathrm{accel}}=100{,}000-13{,}000=\mathbf{87{,}000}
\]

**Answer to report:** **87,000**.

---

### Part (d)(i) — Δ total benefits, ROP, 12-month off (1 pt)

**Intuition.** Gap between claims is **9 months**. With a **12**-month off period, the second claim is a continuation → **no** new 3-month wait. Extra LTC = \(3\times 2{,}000=6{,}000\), but ROP add-on disappears.

**New LTC:** \(3{,}000+16{,}000=19{,}000\) (exceeds 15,000 premiums) ⇒ \(\mathrm{DB}_{\mathrm{ROP}}=100{,}000\) (no add-on).

| | Base (6-mo off) | Alt (12-mo off) | Δ |
|--|----------------:|----------------:|--:|
| LTC | 13,000 | 19,000 | +6,000 |
| Death | 102,000 | 100,000 | −2,000 |
| **Total** | 115,000 | 119,000 | **+4,000** |

**Answer to report:** total benefits **increase by 4,000**.

---

### Part (d)(ii) — Δ total benefits, accelerated, 12-month off (1 pt)

**Intuition.** Same extra 6,000 LTC, but accelerated DB falls by the same 6,000 — net zero.

| | Base | Alt | Δ |
|--|-----:|----:|--:|
| LTC | 13,000 | 19,000 | +6,000 |
| Death | 87,000 | 81,000 | −6,000 |
| **Total** | 100,000 | 100,000 | **0** |

**Answer to report:** **no change** (Δ = 0).

---

## 4. Formula cheat sheet

| Object | Value |
|--------|------:|
| Premiums paid | 15,000 |
| LTC (6-mo off) | 13,000 |
| DB ROP / accel | **102,000** / **87,000** |
| LTC (12-mo off) | 19,000 |
| Δ total ROP / accel | **+4,000** / **0** |
