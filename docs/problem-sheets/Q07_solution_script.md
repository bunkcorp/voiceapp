# ALTAM Sample Question 7 — Solution Script
*(MLC Spring 2014 Q2 · 7 points)*

---

## 1. Problem restatement

**Model.** Three-state continuous Markov warranty for a TV purchased at \(t=0\):

| State | Meaning |
|------:|---------|
| 0 | Working |
| 1 | Under repair |
| 2 | Broken beyond repair (absorbing) |

**Intensities** (\(t\) = years since purchase):

\[
\mu_t^{01}=0.5+0.6t,\qquad
\mu_t^{10}=0.2,\qquad
\mu_t^{12}=2^{t}
\]

**Product.**
- Replacement benefit **1,000** at end of half-year of transition into State 2.
- Semi-annual premiums due at start of each half-year, **waived** if not Working.
- All TVs start in Working.

**Given:** Euler step \(h=0.5\) yields \({}_{0.5}p_0^{00}=0.75\). Interest: \(i^{(2)}=0.08\) (so effective 4% per half-year).

**Parts.** (a) Kolmogorov forwards + BCs. (b) Euler for \({}_{0.5}p^{01}\) and \({}_1p^{02}\). (c) APV of replacement and semi-annual net premium. (d) Accuracy improvement.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Kolmogorov forward equations (2 pts)

**Intuition.** Mass in Working trades with Repair; mass in Broken grows only from Repair via \(\mu^{12}\).

**Formulas:**

\[
\frac{d}{dt}\,{}_tp_0^{00}
=-{}_tp_0^{00}\,\mu_t^{01}+{}_tp_0^{01}\,\mu_t^{10}
\]

\[
\frac{d}{dt}\,{}_tp_0^{01}
={}_tp_0^{00}\,\mu_t^{01}
-{}_tp_0^{01}\bigl(\mu_t^{10}+\mu_t^{12}\bigr)
\]

\[
\frac{d}{dt}\,{}_tp_0^{02}
={}_tp_0^{01}\,\mu_t^{12}
\]

**Boundary conditions:** \({}_0p_0^{00}=1\), \({}_0p_0^{01}=0\), \({}_0p_0^{02}=0\).

**Answer to report:** the three ODEs with those BCs.

---

### Part (b)(i) — Euler for \({}_{0.5}p_0^{01}\) (1 pt)

**Intuition.** Forward Euler: \(p(t+h)\approx p(t)+h\cdot p'(t)\), evaluating intensities at the left endpoint.

**How to say it in English.** Start with certainty of Working. Over the first half-year, add half a year times the inflow rate into Repair.

**At \(t=0\):** \(\mu_0^{01}=0.5\), \(\mu_0^{10}=0.2\), \(\mu_0^{12}=2^{0}=1\), and \(p^{00}=1\), \(p^{01}=0\).

\[
{}_{0.5}p_0^{01}
\approx 0+0.5\Bigl[(1)(0.5)-(0)(0.2+1)\Bigr]
=\mathbf{0.25}
\]

(Consistent with given \({}_{0.5}p_0^{00}\approx 0+0.5(-0.5)=0.75\).)

**Answer to report:** **0.25**.

---

### Part (b)(ii) — Show \({}_1p_0^{02}\approx 0.18\) (1 pt)

**Intuition.** Broken probability only grows while in Repair. Step from \(t=0\) then from \(t=0.5\).

**Euler for \(p^{02}\):**

\[
{}_{t+h}p_0^{02}\approx {}_tp_0^{02}+h\cdot{}_tp_0^{01}\,\mu_t^{12}
\]

**Step \(t=0\to 0.5\):** \(p^{01}=0\) ⇒ \({}_{0.5}p^{02}=0\).

**Step \(t=0.5\to 1\):** \(\mu_{0.5}^{12}=2^{0.5}=\sqrt{2}\approx 1.41421\), \(p^{01}=0.25\):

\[
{}_1p_0^{02}
\approx 0+0.5\times 0.25\times\sqrt{2}
=\mathbf{0.1768}\approx\mathbf{0.177}
\]

**Answer to report:** **0.177** (show **0.18** to nearest 0.01).

---

### Part (c)(i) — APV of replacement cost (1 pt)

**Intuition.** Benefit paid at end of the half-year of failure. With Euler probs, no failure in (0, 0.5]; failure probability 0.177 in (0.5, 1], paid at \(t=1\).

**Discount at 4% per half-year:** \(v=1/1.04\).

**Formula:**

\[
\mathrm{APV}
=1000\Bigl[
v\cdot\bigl({}_{0.5}p^{02}-{}_0p^{02}\bigr)
+v^2\cdot\bigl({}_1p^{02}-{}_{0.5}p^{02}\bigr)
\Bigr]
\]

**Plug-in (official SOA rounded 0.177):**

\[
\mathrm{APV}
=1000\Bigl[(1.04)^{-1}(0)+(1.04)^{-2}(0.177)\Bigr]
=\mathbf{163.64}
\]

**Answer to report:** **163.64**.

---

### Part (c)(ii) — Semi-annual net premium (1 pt)

**Intuition.** Premiums at \(t=0\) (certain) and at \(t=0.5\) only if still Working (\(p^{00}=0.75\)).

**Equivalence:**

\[
P\bigl(1+{}_{0.5}p_0^{00}\,v\bigr)=\mathrm{APV}
\]

\[
P=\frac{163.64}{1+0.75/1.04}=\mathbf{95.08}
\]

**Answer to report:** **95.08**.

---

### Part (d) — Improve accuracy (1 pt)

**Intuition.** Euler truncation error shrinks with smaller steps (or use a higher-order ODE method).

**Answer to report:** use a **smaller \(h\)** (or a higher-order method such as Runge–Kutta).

---

## 4. Formula cheat sheet

| Part | Target |
|------|--------|
| (a) | Kolmogorov ODEs + BCs \(1,0,0\) |
| (b)(i) \({}_{0.5}p^{01}\) | **0.25** |
| (b)(ii) \({}_1p^{02}\) | **0.177** (show 0.18) |
| (c)(i) APV | **163.64** |
| (c)(ii) semi-annual \(P\) | **95.08** |
| (d) | smaller \(h\) |
