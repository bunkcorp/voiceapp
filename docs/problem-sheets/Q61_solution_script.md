# ALTAM Sample Question 61 — Solution Script
*(2-year equity-linked GMDB hedge / reset · multi-part)*

---

## 1. Problem restatement

**Product.** 2-year equity-linked to age **85**; single premium **10,000**; management charge **3%** of fund at start of each year (incl. first); fund price 1/share at inception; **no** GMMB.
- Death benefit end year of death = \(\max(\text{fund},\,\mathrm{GMDB})\); GMDB = premium accumulated at force **6%**.
- Hedge at issue after MC, Black–Scholes; \(r=0.04\) continuous, \(\sigma=0.30\), SULT, exits = death only.
- Mid-contract: fund price **doubles**; reset accepted.
- Optional GMMB product comparison.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Highest \(S_2/S_0\) so year-2 death still pays GMDB (show 1.20)

**Intuition.** Fund at \(t=2\) after two 3% MCs equals GMDB at force 6% for 2 years; solve for the return ratio.

**How to say it in English.** Set the managed fund after two three-percent charges equal to ten thousand e to the point-twelve, and solve for the stock-price ratio.

**Formulas:**

\[
F_2=10{,}000(0.97)^2\frac{S_2}{S_0}=9409\,\frac{S_2}{S_0}
\]

\[
\mathrm{GMDB}_2=10{,}000\,e^{0.12}=11{,}274.97
\]

\[
\frac{S_2}{S_0}=\frac{11{,}274.97}{9409}=\mathbf{1.1983}
\]

Anything **higher** → death benefit is the fund.  
**Answer to report:** **1.1983** → show **1.20** (nearest 0.01).

---

### Part (b)(i) — \(d_1\) for year-1 put contribution (show −0.018)

**Intuition.** Year-1 GMDB claim = \(9700\max(e^{0.06}/0.97-S_1/S_0,0)\) — put with strike \(K=e^{0.06}/0.97=1.09468\).

**Formula:**

\[
d_1(0,1)=\frac{\ln\bigl((1-0.03)/e^{0.06}\bigr)+\bigl(0.04+\tfrac12 0.30^2\bigr)(1)}{0.30\sqrt{1}}=\mathbf{-0.018197}
\]

**Answer to report:** show **−0.018** (nearest 0.001).

---

### Part (b)(ii)–(iii) — Year-1 hedge cost and total hedge

**Official:**

\[
d_2=d_1-0.30=-0.318197
\]

\[
v(0,1)=9700\bigl[1.09468\,e^{-0.04}\Phi(0.318197)-\Phi(0.018197)\bigr]=1{,}454.13
\]

\[
\text{Year-1 contribution}=q_{85}\times 1454.13=0.057665\times 1454.13=\mathbf{83.85}
\]

*(Stem says show **77** nearest 1; official arithmetic gives **83.85**—report solution value.)*

Year-2 put contribution:

\[
v(0,2)=10{,}000(0.97)^2[\cdots]=2{,}210.27
\]

\[
{}_{1|}q_{85}\times 2210.27=0.060831\times 2210.27=\mathbf{134.45}
\]

\[
\text{Hedge @ issue}=83.85+134.45=\mathbf{218.30}
\]

---

### Part (b)(iv) — Charge component \(c\) funding GMDB

**Formula (AMLCR-style):**

\[
218.30=10{,}000\,c\bigl(1+(1-0.03)p_{85}\bigr)=10{,}000\bigl(1+0.97\times 0.942335\bigr)\,c
\]

\[
c=\frac{218.30}{19{,}140.65}=\mathbf{0.0114}
\]

**Answer to report:** \(\mathbf{0.0114}\).

---

### Part (b)(v) — If fund price were 2 per share at inception

**Answer:** Hedge cost would **not** change. \(S_0\) is an arbitrary index level; only ratios \(S_t/S_0\) matter.

---

### Part (c)(i) — Reset \(d_1\) ratio

After reset, new GMDB multiples of the **new** starting assets are the same; lognormal dynamics restart.  
\(d_1\) after reset = **−0.018197** again → ratio to (b)(i) = **1.00**.

---

### Part (c)(ii) — Hedge value at time 1 after reset

Assets end year 1: \(10{,}000\times 2\times 0.97=\mathbf{19{,}400}\).  
Put notional scales to **18,818** (= \(19{,}400\times 0.97\) path in SOA write-up).

\[
v(1,2)=2821.02,\quad q_{86}\times 2821.02=\mathbf{182.11}
\]

\[
v(1,3)=4287.93,\quad {}_{1|}q_{86}\times 4287.93=\mathbf{289.76}
\]

\[
\text{Hedge @ }t=1:\ 182.11+289.76=\mathbf{471.87}
\]

---

### Part (d) — Colleague on Value\(_\text{both}\) vs sum

**Disagree.** Expectations are **additive** regardless of correlation of GMDB and GMMB payoffs. Correlation affects variance/risk, not the sum of values under linear pricing.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Managed fund | \(F_t=P(0.97)^t(S_t/S_0)\) (annual MC at starts) |
| GMDB | \(P e^{0.06 t}\) |
| Put strike | \(K=e^{0.06}/0.97\) |
| Hedge piece | \(q\times(\text{put price on managed notional})\) |
| Charge solve | \(\text{Hedge}=P\,c(1+(1-m)p_x)\) |

**Official targets:** ratio **1.1983**; \(d_1=-0.018197\); yr1 contrib **83.85**; total hedge **218.30**; \(c=0.0114\); reset hedge **471.87**; (d) colleague wrong (additivity).
