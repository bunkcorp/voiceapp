# ALTAM Sample Question 26 — Solution Script
*(Modified Spring 2014 WA Q4 · 8 points · FAM-L covers parts (a)–(b))*

---

## 1. Problem restatement

**Block.** 10,000 independent fully discrete whole life policies of **100,000** issued at age **45**. Gross premiums by equivalence. Pricing: **i = 5%**, SULT; expenses 75% of P + 100 in year 1, then 10% of P + 20; settlement **200**.

**Year 1 experience:** interest **7%**; expenses 75% of P + **105**; mortality as pricing.

**Year 2 experience:** interest as pricing; expenses as pricing except settlement **220**; **10** deaths.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Gross premium (2 pts)

**How to say it in English.** Equivalence sets EPV of death benefits plus expenses equal to EPV of gross premiums; solve for \(P\).

**Official factors:** \(A_{45}=0.15161\), \(\ddot{a}_{45}=17.8162\).

\[
\mathrm{EPV\,benefits}=100{,}000\times 0.15161=15{,}161
\]

Expense EPV (fixed + percent of \(P\)):

\[
20\,\ddot{a}_{45}+80+200 A_{45}+\bigl(0.1\,\ddot{a}_{45}+0.65\bigr)P
=466.646+2.43162\,P
\]

*(80 = 100 − 20 first-year extra fixed; 0.65 = 0.75 − 0.10 first-year extra percent.)*

\[
15{,}161+466.646+2.43162\,P=P\times 17.8162
\Rightarrow P=\dfrac{15{,}627.646}{15.38458}=\mathbf{1{,}015.80}
\]

Show **1,020** (nearest 10). Keep **1,015.80**.

---

### Part (b) — Gross premium policy value end year 1 (2 pts)

Prospective at age 46 (pricing basis):

\[
{}_{1}V=(100{,}000+200)A_{46}-\bigl(0.9 P-20\bigr)\ddot{a}_{46}
\]

**Plug-in** (\(A_{46}=0.15854\), \(\ddot{a}_{46}=17.6706\)):

\[
{}_{1}V=(100{,}200)(0.15854)-\bigl(0.9\times 1{,}015.80-20\bigr)(17.6706)=\mathbf{84.30}
\]

---

### Part (c) — Gain/loss by source, year 1 (3 pts)

On 10,000 policies; actual interest 7%, expense fixed 105 vs assumed 100; mortality as assumed.

**Interest gain:**

\[
10{,}000(0.07-0.05)\bigl[P-(0.75P+100)\bigr]=\mathbf{30{,}790}
\quad\text{(gain)}
\]

**Expense gain:**

\[
10{,}000\bigl[(0.75P+100)-(0.75P+105)\bigr](1.07)=\mathbf{-53{,}500}
\quad\text{(loss)}
\]

**Mortality gain:** \(\mathbf{0}\) (experience = assumption).

---

### Part (d) — Year 2 qualitative (1 pt)

| Source | Direction | Why |
|--------|-----------|-----|
| Interest | **None** | Experience = pricing 5% |
| Expense | **Loss** | Settlement 220 > assumed 200 |
| Mortality | **Loss** | Expected deaths \(10{,}000\,p_{45}q_{46}\approx 8.4\); actual 10 |

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Equivalence | \(S A + E_{\mathrm{fixed}}+E_P P = P\,\ddot{a}\) |
| Prospective \(V\) | \((S+\mathrm{sett})A-(0.9P-\mathrm{maint})\ddot{a}\) |
| Interest gain | \(N(i'-i)(P-E_{\mathrm{assumed}})\) |
| Expense gain | \(N(E_{\mathrm{ass}}-E_{\mathrm{act}})(1+i')\) |

**Official targets:** \(P=1{,}015.80\) (show 1,020); \({}_{1}V=84.30\); interest +30,790; expense −53,500; mortality 0.
