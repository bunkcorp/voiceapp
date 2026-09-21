# ALTAM Sample Question 27 — Solution Script
*(Modified Fall 2014 WA Q5 · 11 points)*

---

## 1. Problem restatement

**Product.** Special **3-year term** to **(50)** with death benefit **100,000** and a **premium refund** of the last premium (no interest) at the end of year 3 if still alive.

**Givens:** \(q_{50}=0.00592\), \(q_{51}=0.00642\), \(q_{52}=0.00697\); pre-contract expense **155**; commission **5%** of each premium; hurdle **14%**; \(P=1{,}100\); reserves \(V_0=0\), \(V_1=400\), \(V_2=800\); earned interest **1%, 2%, 3%** in years 1–3.

**(a)** Show year-2 expected profit in force at start of year 2 is **37** (nearest 1; compute to 0.01).

**(b)** Full profit vector.

**(c)** Profit signature and NPV.

**(d)** Rank IRR of products A (this policy), B (signature \([-155,0,0,210]\)), and C (same as A but \(V_1=300\)).

---

## 2–3. Part-by-part walkthrough

### Part (a) — \(\mathrm{Pr}_2\) (1 pt)

**Intuition.** Year-2 profit: open with \(V_1\), collect premium net of commission, earn year-2 interest, pay expected DB, set up \(V_2\) for survivors.

**Formulas:**

\[
\mathrm{Pr}_2=(V_1+P-0.05P)(1.02)-q_{51}(100{,}000)-(1-q_{51})V_2
\]

**How to say it in English.** Take last year’s reserve plus this year’s premium after the 5% commission, grow it at 2%, then pay the expected death claim and the reserve for those who survive.

**Plug-in:**

\[
\mathrm{Pr}_2=(400+1{,}100-55)(1.02)-(0.00642)(100{,}000)-(0.99358)(800)=\mathbf{37.04}
\]

**Answer to report:** \(\mathbf{37.04}\) → show **37**.

---

### Part (b) — Profit vector (4 pts)

**Intuition.** Same recursion each year; year 0 is \(-\)pre-contract expense; year 3 includes the survival premium-refund “maturity” benefit of \(P=1{,}100\) for survivors (embedded in the SOA table as EMB).

**Official SOA table (use these numbers):**

| \(t\) | \(\mathrm{Pr}_t\) |
|------:|------------------:|
| 0 | **−155.00** |
| 1 | **65.82** |
| 2 | **37.04** |
| 3 | **111.02** |

**How to say it in English.** List emerging profit at each duration for a policy in force at the start of that year — that vector is the raw profit stream before survival weighting.

**Answer to report:** \(\mathbf{(-155.00,\ 65.82,\ 37.04,\ 111.02)}\).

---

### Part (c) — Signature and NPV (3 pts)

**Intuition.** Signature \(\Pi_t\) weights later profits by the probability of still being in force; NPV discounts the signature at the hurdle.

**Formulas:**

\[
\Pi_0=\mathrm{Pr}_0,\qquad
\Pi_t={}_{t-1}p_{50}\,\mathrm{Pr}_t\ (t\ge 1)
\]

\[
\mathrm{NPV}=\sum_{t=0}^{3}\Pi_t\,v_{0.14}^{t}
\]

**Official targets:**

\[
\Pi=(-155.00,\ 65.82,\ 36.82,\ 109.65),\qquad \mathrm{NPV}_{14\%}=\mathbf{5.08}
\]

**How to say it in English.** Multiply each year’s profit by the chance you are still around to earn it, then discount those weighted profits at 14%.

**Answer to report:** Signature as above; \(\mathrm{NPV}=\mathbf{5.08}\).

---

### Part (d) — IRR ranking (3 pts)

**Intuition.** IRR zeros NPV of the signature. Product B pays a single +210 at \(t=3\) after −155 at issue → closed-form yield about **10.65%**. Product C holds a smaller \(V_1\), so early profits are larger than A → higher IRR than A. A’s NPV at 14% is only 5.08, so its IRR is a bit above 14%, hence above B.

**Official order:** \(\mathbf{B < A < C}\).

**How to say it in English.** Rank by the internal yield of each profit signature — B is weakest, C releases reserve earlier so it wins, A sits in the middle.

**Answer to report:** \(\mathbf{B < A < C}\) (with IRR(B)≈10.65% as the SOA check).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| In-force profit | \(\mathrm{Pr}_t=(V_{t-1}+P-E_t)(1+i_t)-q\,S-(1-q)V_t\) |
| Time-0 | \(\mathrm{Pr}_0=-\text{pre-contract}\) |
| Signature | \(\Pi_t={}_{t-1}p\,\mathrm{Pr}_t\) |
| NPV | \(\sum \Pi_t/(1+h)^t\) |
| IRR | rate \(r\) with \(\mathrm{NPV}(r)=0\) |

**Official targets:** \(\mathrm{Pr}_2=37.04\) (show 37); vector \((-155, 65.82, 37.04, 111.02)\); signature \((-155, 65.82, 36.82, 109.65)\); \(\mathrm{NPV}=5.08\); IRR order \(B<A<C\).
