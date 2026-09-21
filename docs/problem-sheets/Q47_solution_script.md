# ALTAM Sample Question 47 — Solution Script
*(Fall 2021 Form B WA Q6 · 9 points)*

---

## 1. Problem restatement

**Product.** DC pension: employee + employer each **6%** of salary from age **35**; retire at **60**.
- Initial salary rate **50,000**; continuous salary force **2%**; continuous fund force **6%**.
- (a) Projected DC balance at 60 ≈ **425,000**.
- (b) Monthly life annuity with **10-year** guarantee (SULT, \(i=0.05\), Woolhouse 2-term); income + replacement ratio.
- Actual fund at 60 = **750,000**; spouse **C** also 60, independent lifetimes.
- (c) Monthly joint life with **2/3** survivor ≈ **4,200**.
- (d) Combine with GPP **1,000**/month from 65 (50% to C after M’s death): three survival states.
- (e) Integrated pension: start **X** at 60, drop to **X−1000** at 65; 2/3 survivor option.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Projected DC balance at 60

**How to say it in English.** Integrate twelve percent of the growing salary path, each contribution compounded forward at six percent force to age sixty.

**Formula:**

\[
C=\int_{0}^{25}(0.12)(50{,}000)\,e^{0.02t}\,e^{0.06(25-t)}\,dt
=6000\,e^{1.5}\frac{1-e^{-1}}{0.04}=\mathbf{424{,}945.17}
\]

**Answer to report:** show **425,000** (nearest 1,000).

---

### Part (b)(i) — Monthly income with 10-year guarantee

**Formulas:**

\[
\ddot{a}_{\overline{10}|}^{(12)}=\frac{1-1.05^{-10}}{0.04869}=7.92949
\]

\[
424{,}945.17=12X\bigl[7.92949+(0.57864)(14.9041-\tfrac{11}{24})\bigr]=12X(14.61276)
\]

**Answer to report:** \(X=\mathbf{2{,}423.37}\).

---

### Part (b)(ii) — Replacement ratio

\[
\text{Final salary}=\int_{24}^{25}50{,}000\,e^{0.02t}\,dt=81{,}617.17
\]

\[
R=\frac{12\times 2{,}423.37}{81{,}617.17}=\mathbf{0.3563}\ (35.63\%)
\]

---

### Part (c) — Monthly joint + 2/3 survivor

**How to say it in English.** Twelve X times four-thirds of a single-life monthly annuity at sixty, minus one-third of the joint-life monthly annuity.

**Formula:**

\[
750{,}000=12X\Bigl(\tfrac43\bigl(14.9041-\tfrac{11}{24}\bigr)-\tfrac13\bigl(13.2497-\tfrac{11}{24}\bigr)\Bigr)=12X(14.9972)
\]

**Answer to report:** \(X=\mathbf{4{,}167.44}\) → show **4,200**.

---

### Part (d) — Combined DC + GPP (eight years after retirement)

| State | Monthly income |
|-------|----------------|
| (i) Both alive | \(4167.44+1000=\mathbf{5167.44}\) |
| (ii) Only M | \(\frac23(4167.44)+1000=\mathbf{3778.29}\) |
| (iii) Only C | \(\frac23(4167.44)+500=\mathbf{3278.29}\) |

---

### Part (e) — Integrated X with GPP offset

**Official identity** (with \({}_{5}E_{60:60}=0.75057\), \({}_{5}E_{60}=0.76687\), \(q=0.02126\)):

\[
750{,}000=12X(14.9972)-123{,}516.35-3{,}414.95
\Rightarrow X=\mathbf{4{,}872.74}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| DC accumulation | \(\int_0^{25}0.12\,S_0 e^{0.02t}e^{\delta(25-t)}\,dt\) |
| Guaranteed annuity | \(\mathrm{Fund}=12X(\ddot{a}_{\overline{10}|}^{(12)}+{}_{10}E_{60}\ddot{a}_{70}^{(12)})\) |
| Replacement ratio | \(12X/(\text{last-year salary})\) |
| 2/3 survivor | \(\mathrm{Fund}=12X(\frac43\ddot{a}_x^{(12)}-\frac13\ddot{a}_{xy}^{(12)})\) |

**Official targets:** \(C=424{,}945.17\); \(X_{\text{guar}}=2{,}423.37\); \(R=35.63\%\); joint \(X=4{,}167.44\); (d) 5167.44 / 3778.29 / 3278.29; integrated \(X=4{,}872.74\).
