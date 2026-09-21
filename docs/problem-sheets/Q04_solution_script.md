# ALTAM Sample Question 4 — Solution Script
*(LTAM Spring 2021 Q1 · 10 points · FAM-L covers part (a))*

---

## 1. Problem restatement

**Product.** **5-year term**, age **60**, death benefit **100,000** paid at end of half-year of death. Premiums **270** half-yearly. Expenses **10%** of each semi-annual premium. \(i=0.05\). Mortality: **SULT** (Makeham \(A=0.00022\), \(B=2.7\times 10^{-6}\), \(c=1.124\)).

**Parts.**
- (a) Show \(100{,}000\cdot{}_{0.5}q_{64}\approx 260\); show gross premium reserve at \(t=4\) is **≈30**.
- Virus multi-state at \(t=4\): Healthy (0) ↔ At Risk (1) → Sick (2) → Dead (3).
- (b) Prob stay Healthy all final year.
- (c) Revised reserve at \(t=4\) using given half-year transition probabilities.
- (d) Expected days per sojourn in At Risk.

**Intensities (all ages):** \(\mu^{01}=0.06\), \(\mu^{03}=\mu^{\mathrm{SULT}}\), \(\mu^{10}=20\), \(\mu^{12}=80\), \(\mu^{20}=4\), \(\mu^{23}=5\mu^{03}\). Premiums while in 0, 1, or 2.

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — \(100{,}000\cdot{}_{0.5}q_{64}\) (1.5 pts)

**Intuition.** Under Makeham, survival is closed-form from the force integral. Half-year \(q\) is \(1-{}_{0.5}p_{64}\).

**Formula (formula sheet Makeham):**

\[
{}_{t}p_x=\exp\!\Bigl(-At-\frac{B}{\ln c}\,c^x(c^t-1)\Bigr)
\]

**Plug-in** (\(x=64\), \(t=0.5\)):

\[
{}_{0.5}p_{64}=\exp\!\bigl(-0.00022\cdot 0.5-(2.7\times 10^{-6}/\ln 1.124)\,1.124^{64}(1.124^{0.5}-1)\bigr)
\approx 0.9974265
\]

\[
{}_{0.5}q_{64}=1-{}_{0.5}p_{64}\approx 0.0025735
\qquad\Rightarrow\qquad
100{,}000\cdot{}_{0.5}q_{64}=\mathbf{257.35}
\]

**Answer to report:** **257** (show **260** to nearest 10).

---

### Part (a)(ii) — Gross premium reserve at \(t=4\) (1.5 pts)

**Intuition.** At duration 4 the insured is age 64 with one year left. Prospective: EPV of remaining half-year death benefits minus EPV of net premiums still payable. Net premium per half-year is \(0.9\times 270=243\).

**How to say it in English.** Two possible death payment times in the final year: end of first half-year and end of second. Premiums due at \(t=4\) and at \(t=4.5\) if alive.

**Discount factors:** \(v=1/1.05\), \(v^{1/2}=\sqrt{v}\).

**Formulas:**

\[
{}_{0.5|}q_{64}={}_1q_{64}-{}_{0.5}q_{64}
\]

\[
{}_4V
=100{,}000\bigl({}_{0.5}q_{64}\,v^{1/2}+{}_{0.5|}q_{64}\,v\bigr)
-243\bigl(1+{}_{0.5}p_{64}\,v^{1/2}\bigr)
\]

**Official SOA arithmetic:** \(q\) pieces \(\approx 0.0025735\) and \(0.0027145\); result

\[
{}_4V=\mathbf{30.14}
\]

(Equivalently: recurse half-year by half-year from \({}_{4.5}V\).)

**Answer to report:** **30.1** (show **30** to nearest 10).

---

### Part (b) — Stay Healthy all final year (2 pts)

**Intuition.** To never leave Healthy for a full year you must avoid both exposure (\(\mu^{01}\)) and death (\(\mu^{03}=\mu^{\mathrm{SULT}}\)). Constant \(\mu^{01}\) multiplies the SULT survival.

**Formula:**

\[
{}_1\bar{p}_{64}^{00}
=\exp\!\Bigl(-\int_0^1\bigl(\mu_{64+t}^{01}+\mu_{64+t}^{03}\bigr)\,dt\Bigr)
=e^{-0.06}\cdot{}_1p_{64}^{\mathrm{SULT}}
\]

**Plug-in:**

\[
{}_1\bar{p}_{64}^{00}=\mathbf{0.9367845}
\]

**Answer to report:** **0.93678**.

---

### Part (c) — Revised reserve at \(t=4\) (3 pts)

**Intuition.** Same interest and expense basis, but death probabilities now come from the virus model. Benefit is paid if death occurs in a half-year; premium continues whenever not dead (states 0, 1, 2).

**Given half-year probs:**

| Age | \({}_{0.5}p^{00}\) | \({}_{0.5}p^{01}\) | \({}_{0.5}p^{02}\) | \({}_{0.5}p^{03}\) | \({}_{0.5}p^{13}\) | \({}_{0.5}p^{23}\) |
|----:|:-----------------:|:-----------------:|:-----------------:|:-----------------:|:-----------------:|:-----------------:|
| 64.0 | 0.98661 | 0.00059 | 0.01016 | 0.00264 | 0.00605 | 0.00700 |
| 64.5 | 0.98646 | 0.00059 | 0.01016 | 0.00279 | 0.00640 | 0.00740 |

**Death in first half-year:** \(p_1={}_{0.5}p_{64}^{03}=0.00264\).

**Death in second half-year** (alive at mid-year in 0, 1, or 2, then die):

\[
p_2
={}_{0.5}p_{64}^{00}\,{}_{0.5}p_{64.5}^{03}
+{}_{0.5}p_{64}^{01}\,{}_{0.5}p_{64.5}^{13}
+{}_{0.5}p_{64}^{02}\,{}_{0.5}p_{64.5}^{23}
\]

**Alive for second premium:** \(1-p_1=0.99736\).

**Reserve:**

\[
{}_4V^{(0)}
=100{,}000\bigl(p_1\,v^{1/2}+p_2\,v\bigr)
-243\bigl(1+(1-p_1)\,v^{1/2}\bigr)
=\mathbf{47.80}
\]

**Answer to report:** **47.80**.

---

### Part (d) — Expected At Risk sojourn (2 pts)

**Intuition.** Exit force from At Risk is \(\mu^{10}+\mu^{12}=20+80=100\). Mean sojourn is the reciprocal; convert years to days.

**Formula:**

\[
\mathbb{E}[\text{sojourn in 1}]
=\int_0^\infty {}_tp^{11}\,dt
=\frac{1}{\mu^{10}+\mu^{12}}
=\frac{1}{100}=0.01\text{ years}
\]

\[
0.01\times 365.25=\mathbf{3.65}\text{ days}
\]

**Answer to report:** **3.65 days**.

---

## 4. Formula cheat sheet

| Part | Target |
|------|--------|
| (a)(i) \(100{,}000\cdot{}_{0.5}q_{64}\) | **257.35** (show 260) |
| (a)(ii) \({}_4V\) | **30.14** (show 30) |
| (b) \({}_1\bar{p}_{64}^{00}\) | **0.93678** |
| (c) revised \({}_4V^{(0)}\) | **47.80** |
| (d) At Risk sojourn | **3.65 days** |
