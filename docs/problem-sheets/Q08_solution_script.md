# ALTAM Sample Question 8 — Solution Script
*(MLC Spring 2015 Q1 · 9 points)*

---

## 1. Problem restatement

**Model.** Three-state continuous Markov disability product over **10 years**:

| State | Meaning |
|------:|---------|
| 0 | Healthy |
| 1 | Temporarily disabled |
| 2 | Dead |

**Product (issued Healthy at age \(x\)):**
- Continuous disability benefit **1,000**/yr while in State 1.
- Death benefit **10,000** at moment of death.
- Net premiums continuous while Healthy.
- \(\delta=0.1\).

**Given factors:**

\[
\bar{a}_{x:\overline{10}|}^{00}=4.49,\quad
\bar{a}_{x:\overline{10}|}^{02}=1.36,\quad
\bar{A}_{x:\overline{10}|}^{02}=0.3871
\]

\[
\mu_{x+t}^{01}=0.04,\quad
\mu_{x+t}^{02}=0.02\,t,\quad
\mu_{x+t}^{10}=0.05,\quad
\mu_{x+t}^{12}=0.04\,t
\]

**Reserves at \(t=3\):** \({}_3V^{(0)}=1304.54\), \({}_3V^{(1)}=7530.09\).

**Parts.** (a) Show \(\sum_{j=0}^{2}\bar{a}_{x:\overline{10}|}^{0j}=\bar{a}_{\overline{10}|}\). (b) Net premium ≈970. (c) \(\frac{d}{dt}{}_tV^{(0)}\) at \(t=3\). (d) Premium increase if 10-year ROP of premiums without interest when no benefits paid.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Occupancy sum identity (2 pts)

**Intuition.** Starting Healthy, at each \(t\le 10\) the life is in exactly one of {0,1,2}. Discounting and integrating recovers the temporary continuous annuity-certain.

**How to say it in English.** The three state-annuities just carve up the same “one dollar per year for ten years if alive in any state” cash flow — and death is still a state, so together they equal the interest-only temporary annuity.

**Proof:**

\[
{}_tp_x^{00}+{}_tp_x^{01}+{}_tp_x^{02}=1
\qquad(0\le t\le 10)
\]

\[
\sum_{j=0}^{2}\bar{a}_{x:\overline{10}|}^{0j}
=\int_0^{10}e^{-\delta t}\,dt
=\bar{a}_{\overline{10}|}
=\frac{1-e^{-1}}{0.1}
\]

**Answer to report:** the identity \(\bar{a}^{00}+\bar{a}^{01}+\bar{a}^{02}=\bar{a}_{\overline{10}|}\).

---

### Part (b) — Net premium rate (2 pts)

**Intuition.** Equivalence: \(P\cdot\bar{a}^{00}=\) EPV disability + EPV death. First back out \(\bar{a}^{01}\) from part (a).

**Disability annuity factor:**

\[
\bar{a}_{x:\overline{10}|}^{01}
=\bar{a}_{\overline{10}|}-\bar{a}^{00}-\bar{a}^{02}
=\frac{1-e^{-1}}{0.1}-4.49-1.36
=\mathbf{0.47121}
\]

**EPVs:**

\[
\mathrm{EPV}_{\mathrm{dis}}=1000\times 0.47121=\mathbf{471.21}
\]

\[
\mathrm{EPV}_{\mathrm{death}}=10{,}000\times 0.3871=\mathbf{3{,}871}
\]

**Premium:**

\[
P=\frac{471.21+3{,}871}{4.49}=\mathbf{967.14}
\]

**Answer to report:** **967** (show **970** to nearest 10). Keep \(P=967.14\) for Thiele.

---

### Part (c) — Thiele derivative at \(t=3\) (2 pts)

**Intuition.** In Healthy, reserve grows with interest and premium, and is drained by expected transitions to Disabled (reserve jump) and Dead (claim minus reserve).

**Thiele (state 0):**

\[
\frac{d}{dt}{}_tV^{(0)}
=\delta\,{}_tV^{(0)}+P
-\mu_{x+t}^{01}\bigl({}_tV^{(1)}-{}_tV^{(0)}\bigr)
-\mu_{x+t}^{02}\bigl(10{,}000-{}_tV^{(0)}\bigr)
\]

**At \(t=3\):** \(\mu^{01}=0.04\), \(\mu^{02}=0.02\times 3=0.06\), \(P=967.14\).

**Plug-in:**

\[
\begin{aligned}
\frac{d}{dt}{}_3V^{(0)}
&=0.1(1304.54)+967.14\\
&\quad-0.04(7530.09-1304.54)\\
&\quad-0.06(10{,}000-1304.54)\\
&=\mathbf{326.80}
\end{aligned}
\]

**Answer to report:** **326.80**.

---

### Part (d) — Return-of-premium rider (3 pts)

**Intuition.** New premium \(P^*\). Extra benefit: pay \(10P^*\) at \(t=10\) only if the life stayed Healthy the whole term (never disabled, never dead) — “no benefits paid.” Discount that contingent payment at \(\delta\).

**How to say it in English.** The ROP is a pure endowment of ten years of premiums, payable only on the path that never left Healthy. You still discount it at force 0.1 even though the contract returns premiums without interest — that discount is the insurer’s interest, not a policyholder accumulation.

**Survival in Healthy only:**

\[
{}_{10}p_x^{00}
=\exp\!\Bigl(-\int_0^{10}(\mu^{01}+\mu^{02})\,dt\Bigr)
=\exp\!\Bigl(-\int_0^{10}(0.04+0.02t)\,dt\Bigr)
=e^{-1.4}
=\mathbf{0.24660}
\]

**EPV of ROP:**

\[
10P^*\cdot e^{-\delta\cdot 10}\cdot{}_{10}p_x^{00}
=10P^*\,e^{-1}\cdot 0.24660
=P^*\cdot\mathbf{0.90718}
\]

**New equivalence** (same benefits as before, plus ROP):

\[
P^*\cdot 4.49=3{,}871+471.21+P^*\cdot 0.90718
\]

\[
P^*=\frac{4{,}342.21}{4.49-0.90718}=\mathbf{1{,}211.95}\approx\mathbf{1{,}212}
\]

**Increase:**

\[
P^*-P=\mathbf{244.9}
\]

**Answer to report:** increase **≈244.9** (new rate ≈1212).

---

## 4. Formula cheat sheet

| Part | Target |
|------|--------|
| (a) | \(\sum_j\bar{a}^{0j}=\bar{a}_{\overline{10}|}\) |
| (b) \(P\) | **967.14** (show 970) |
| (c) \(d{}_3V^{(0)}/dt\) | **326.80** |
| (d) \(P^*-P\) | **≈244.9** |
