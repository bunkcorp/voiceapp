# ALTAM Sample Question 6 — Solution Script
*(LTAM Fall 2021 Form B Q3 · 9 points)*

---

## 1. Problem restatement

**Model.** Four-state continuous Markov eye-care network:

| State | Meaning |
|------:|---------|
| 0 | Healthy |
| 1 | Monitored (diagnosed) |
| 2 | Wait list for surgery |
| 3 | Surgery (absorbing) |

**Intensities:**
- \(\mu_{x+t}^{01}=a+be^{ct}\) with \(a=0.004\), \(b=0.015\), \(c=0.005\)
- \(\mu^{12}=0.2\), \(\mu^{23}=0.4\) (constant)
- \(\delta=0.05\)

**Parts.** (a) Prob Healthy (60) diagnosed before 65. (b) Show \({}_tp_x^{12}=e^{-0.2t}-e^{-0.4t}\). (c) Prob surgery within 5 years from Monitored. (d) Temporary occupancy annuities \(\bar{a}_{x:\overline{5}|}^{11}\), \(\bar{a}_{x:\overline{5}|}^{12}\), and identity with \(\bar{a}_{\overline{5}|}\). (e) Choose Option A vs B by 5-year QL EPV from State 1.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Diagnosis before age 65 (2 pts)

**Intuition.** Diagnosis is the only exit from Healthy, and \(\mu^{01}\) is Makeham. Probability of diagnosis within 5 years is \(1-{}_5p_{60}^{00}\).

**Makeham rewrite:** \(A=0.004\), \(B=0.015\), \(c^*=e^{0.005}\) (so \(\ln c^*=0.005\)).

**Formula:**

\[
{}_5p_{60}^{00}
=\exp\!\Bigl(-5A-\frac{B}{\ln c^*}\,(c^*)^{60}\bigl((c^*)^5-1\bigr)\Bigr)
=\mathbf{0.8846922}
\]

\[
\Pr(\text{diagnosis before 65})=1-{}_5p_{60}^{00}=\mathbf{0.11531}
\]

**Answer to report:** **0.11531**.

---

### Part (b) — Show \({}_tp_x^{12}=e^{-0.2t}-e^{-0.4t}\) (1 pt)

**Intuition.** Constant forces: stay in Monitored at rate 0.2; enter Wait List at 0.2 and leave Wait List at 0.4. Occupancy of Wait List is the classic difference of exponentials.

**How to say it in English.** Integrate “still monitored at time \(r\), jump to wait list, then stay on the wait list until \(t\).”

**Derivation:**

\[
{}_tp_x^{11}=e^{-0.2t}
\]

\[
{}_tp_x^{12}
=\int_0^t {}_rp_x^{11}\,\mu^{12}\,{}_{t-r}p_{x+r}^{22}\,dr
=\int_0^t 0.2\,e^{-0.2r}\,e^{-0.4(t-r)}\,dr
=e^{-0.2t}-e^{-0.4t}
\]

**Answer to report:** \({}_tp_x^{12}=\mathbf{e^{-0.2t}-e^{-0.4t}}\).

---

### Part (c) — Surgery within 5 years from Monitored (1 pt)

**Intuition.** Surgery by time 5 means not still in 1 and not still in 2: \({}_5p^{13}=1-{}_5p^{11}-{}_5p^{12}\).

**Plug-in:**

\[
{}_5p^{11}=e^{-0.2\cdot 5}=e^{-1},\qquad
{}_5p^{12}=e^{-1}-e^{-2}
\]

\[
{}_5p_x^{13}
=1-e^{-1}-(e^{-1}-e^{-2})
=1-2e^{-1}+e^{-2}
=\mathbf{0.399577}
\]

**Answer to report:** **0.399577**.

---

### Part (d)(i)–(ii) — Temporary occupancy annuities (≈1.3 pts)

**Intuition.** Discounted time spent in Monitored / Wait List over a 5-year horizon, starting from Monitored.

**Formulas:**

\[
\bar{a}_{x:\overline{5}|}^{11}
=\int_0^5 e^{-\delta t}\,{}_tp^{11}\,dt
=\int_0^5 e^{-0.25t}\,dt
=\frac{1-e^{-1.25}}{0.25}
=\mathbf{2.85398}
\]

\[
\bar{a}_{x:\overline{5}|}^{12}
=\int_0^5 e^{-0.05t}(e^{-0.2t}-e^{-0.4t})\,dt
=\frac{1-e^{-1.25}}{0.25}-\frac{1-e^{-2.25}}{0.45}
=\mathbf{0.86598}
\]

**Answer to report:** **2.854** (show **2.85**); **0.866** (show **0.87**).

---

### Part (d)(iii) — Algebraic identity (≈0.7 pts)

**Intuition.** At every time \(t\le 5\), the life is in exactly one of states 1, 2, or 3. Summing occupancy annuities recovers the pure interest temporary annuity.

**Proof:**

\[
{}_tp^{11}+{}_tp^{12}+{}_tp^{13}=1
\qquad(t\ge 0,\text{ start in 1})
\]

\[
\bar{a}_{x:\overline{5}|}^{11}+\bar{a}_{x:\overline{5}|}^{12}+\bar{a}_{x:\overline{5}|}^{13}
=\int_0^5 e^{-\delta t}\,dt
=\bar{a}_{\overline{5}|}
\]

**Answer to report:** the identity above.

---

### Part (e) — Option A vs Option B (3 pts)

**QL rates:** State 1: 0.5; State 2: 0.2; State 3: 1.0 (baseline). Horizon 5 years from State 1; \(\delta=0.05\).

**Option A** — raise \(\mu^{23}\) to **1.0** (faster surgery). Then \({}_tp^{12}=e^{-0.2t}-e^{-1.0t}\), and

\[
\bar{a}_{x:\overline{5}|}^{11}=2.85398\quad\text{(unchanged)}
\]

\[
\bar{a}_{x:\overline{5}|}^{12}
=\int_0^5 e^{-0.05t}(e^{-0.2t}-e^{-t})\,dt
=\mathbf{0.47665}
\]

\[
\bar{a}_{x:\overline{5}|}^{13}
=\bar{a}_{\overline{5}|}-\bar{a}^{11}-\bar{a}^{12}
=4.42398-2.85398-0.47665
=\mathbf{1.09335}
\]

\[
\mathrm{QL}_A
=0.5(2.85398)+0.2(0.47665)+1.0(1.09335)
=\mathbf{2.61567}
\]

**Option B** — improve QL weights to 0.55 / 0.3 / 1.0; keep baseline annuities from (d):

\[
\bar{a}^{12}=0.86598,\qquad
\bar{a}^{13}=4.42398-2.85398-0.86598=0.70402
\]

\[
\mathrm{QL}_B
=0.55(2.85398)+0.3(0.86598)+1.0(0.70402)
=\mathbf{2.53354}
\]

**Decision:** \(\mathrm{QL}_A>\mathrm{QL}_B\) → select **Option A**.

**Answer to report:** **Option A** (\(\mathrm{QL}_A\approx 2.616\) vs \(\mathrm{QL}_B\approx 2.534\)).

---

## 4. Formula cheat sheet

| Part | Target |
|------|--------|
| (a) diagnosis before 65 | **0.11531** |
| (b) \({}_tp^{12}\) | \(e^{-0.2t}-e^{-0.4t}\) |
| (c) \({}_5p^{13}\) | **0.399577** |
| (d)(i)/(ii) | **2.854** / **0.866** |
| (d)(iii) | \(\bar{a}^{11}+\bar{a}^{12}+\bar{a}^{13}=\bar{a}_{\overline{5}|}\) |
| (e) | **Option A** |
