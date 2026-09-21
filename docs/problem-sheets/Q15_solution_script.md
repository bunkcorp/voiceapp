# ALTAM Sample Question 15 — Solution Script
*(LTAM Spring 2020 Q4 · 9 points)*

---

## 1. Problem restatement

**Product.** 10-year DI on \((x)\), issued Healthy:
- Death benefit **20,000** immediate within 10 years.
- Continuous sick benefit **1,000**/yr in Sick during the term.
- Continuous premiums while Healthy; commission **5%**; maintenance **60**/yr while alive.
- Nothing beyond 10 years (base product).

**Forces (constant):** \(\mu^{01}=0.03\), \(\mu^{02}=0.02\), \(\mu^{10}=0.01\), \(\mu^{12}=0.05\); \(\delta=0.07\).

**Given:** \(\bar{a}^{00}_{:\overline{10}|}=5.844\), \(\bar{a}^{01}_{:\overline{10}|}=0.684\), \(\bar{A}^{01}_{:\overline{10}|}=0.175\), \(\bar{A}^{02}_{:\overline{10}|}=0.151\).

**New product:** sick benefit continues after year 10 until death/recovery for spells that *started* within 10 years; **1-year** elimination period.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Gross premium by equivalence (2 pts)

**Intuition.** Equate EPV benefits + expenses to EPV premiums net of commission.

**How to say it in English.** Continuous healthy-state premium, after a five percent commission, must fund death benefits, sickness benefits, and sixty of maintenance while alive.

**Formulas:**

\[
\begin{align*}
\mathrm{EPV}_{\mathrm{death}}&=20{,}000\cdot\bar{A}^{02}_{:\overline{10}|}=3020\\
\mathrm{EPV}_{\mathrm{sick}}&=1000\cdot\bar{a}^{01}_{:\overline{10}|}=684\\
\mathrm{EPV}_{\mathrm{exp}}&=60(\bar{a}^{00}+\bar{a}^{01})_{:\overline{10}|}=391.68\\
\mathrm{EPV}_{\mathrm{prem\,net}}&=0.95P\cdot\bar{a}^{00}_{:\overline{10}|}=5.5518\,P
\end{align*}
\]

\[
P=\frac{3020+684+391.68}{5.5518}=\mathbf{737.72}
\]

**Answer to report:** **737.7** (nearest 0.1); show **738** to nearest 1.

---

### Part (b) — Die without becoming sick (2 pts)

**Intuition.** Path stays in Healthy until death via \(\mu^{02}\) only, within 10 years.

**Formula:**

\[
\int_0^{10}{}_tp^{00}\,\mu^{02}\,dt
=\mu^{02}\int_0^{10}e^{-(\mu^{01}+\mu^{02})t}\,dt
=\frac{0.02}{0.05}\bigl(1-e^{-0.5}\bigr)
=\mathbf{0.15739}
\]

**Answer to report:** \(\mathbf{0.15739}\).

---

### Part (c) — Elimination period definition (1 pt)

**Answer to report:** The waiting time from the **start of a disability/sickness spell** until **disability income payments begin**.

---

### Part (d) — 1-year sojourn annuity in Sick (2 pts)

**Intuition.** Continuous annuity while remaining in Sick without recovery or death for up to 1 year: force \(\delta+\mu^{10}+\mu^{12}=0.13\).

**Formula:**

\[
\bar{\bar{a}}^{11}_{:\overline{1}|}
=\int_0^1 e^{-0.13t}\,dt
=\frac{1-e^{-0.13}}{0.13}=\mathbf{0.9377}
\]

**Answer to report:** **0.9377** (show **0.94** to nearest 0.01).

---

### Part (e) — New-product premium (2 pts)

**Intuition.** Only the sickness benefit EPV changes: each transition into Sick (during the term) starts a deferred sojourn annuity (skip first year), which may run past \(t=10\).

**How to say it in English.** Price sickness as: on each onset, wait one year, then pay 1000 continuously until recovery or death—even after the policy’s tenth anniversary.

**Formulas:**

\[
\bar{\bar{a}}^{11}=\frac{1}{0.13}=7.6923
\]

\[
\mathrm{EPV}_{\mathrm{sick}}^{\mathrm{new}}
=1000\cdot\bar{A}^{01}_{:\overline{10}|}\cdot\bigl(7.6923-0.9377\bigr)
=1000(0.175)(6.7546)
=\mathbf{1{,}182.05}
\]

\[
P^*=\frac{3020+1182.05+391.68}{5.5518}=\mathbf{827.43}
\]

**Answer to report:** \(\mathbf{827.43}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Equivalence | \(0.95P\bar{a}^{00}=20{,}000\bar{A}^{02}+1000\bar{a}^{01}+60(\bar{a}^{00}+\bar{a}^{01})\) |
| Never-sick death | \(\mu^{02}/(\mu^{01}+\mu^{02})\,(1-e^{-(\mu^{01}+\mu^{02})n})\) |
| Sojourn 1-yr | \((1-e^{-(\delta+\mu^{10}+\mu^{12})})/(\delta+\mu^{10}+\mu^{12})\) |
| Deferred sojourn EPV | \(\bar{A}^{01}\cdot(1/(\delta+\lambda_1)-\bar{\bar{a}}^{11}_{:1|})\) |

**Official targets:** \(P=737.72\) (show 738); never-sick death \(0.15739\); \(\bar{\bar{a}}^{11}_{:1|}=0.9377\) (show 0.94); \(P^*=827.43\).
