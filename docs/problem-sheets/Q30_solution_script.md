# ALTAM Sample Question 30 — Solution Script
*(Fall 2019 WA Q6 · 9 points · FAM-L covers part (a))*

---

## 1. Problem restatement

**Product.** Issue a **20-year deferred annuity** to **(65)**.
- Level annual premiums for **at most 10 years**.
- On survival to **85**, pay **36,000** per year **annually in advance**.
- If death occurs **after 10 years but before the first annuity payment**, return **premiums paid without interest** at end of year of death (**ROP = 10P**).
- **No** death benefit in the first 10 years.

**Part (a) — pricing.** Equivalence principle on SULT Ultimate, **i = 5%**, with given expenses → show **P ≈ 10,260** (compute to nearest **0.1**).

**Parts (b)–(c) — profit test.** Different basis: 90% SULT mortality, 3% lapse for 5 years, pre-contract expense 7,000, maintenance starting at 70 growing 2%/year, 5% of every premium, fund **i = 7%**, hurdle **10%**, given reserves. Find **Pr_t** at **t = 0, 1, 12, 30**, then **NPV at start of year 2** per policy then in force (given issued NPV = **8,860**).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Premium by equivalence (2 pts)

**Intuition.** Equivalence: EPV of premiums net of **percent** expenses equals EPV of benefits (ROP + deferred annuity) plus **fixed** expenses. Fold the 30% initial / 5% renewal premium expenses into a **net premium annuity**, and put ROP, deferred annuity, and dollar expenses on the other side.

**How to say it in English.** The present value of the premiums—adjusted for a five percent ongoing commission and a twenty-five percent first-year setup cost—must equal the sum of four components: (1) the cost of returning the total premiums paid if the insured dies between ages 75 and 85; (2) the cost of providing a 36,000 annual life annuity starting at age 85; (3) a 900 immediate fixed expense; and (4) a 100 annual maintenance expense for the life of the individual.

**Contract timeline (write this once):**
| Phase | Duration | Cash |
|--------|----------|------|
| Premiums | t = 0…9 (ages 65–74) | Level **P** |
| Deferral ROP | t = 10…19 (ages 75–84) | On death: **10P** at year-end |
| Annuity | t = 20+ (from 85) | **36,000** in advance |

**Pricing expenses → how they enter the formula:**
- Initial: **1,000 + 30% of P**
- Premium expense with 2nd+ premiums: **5% of P**
- Renewal: **100**/year from year 2, in advance

Net of percent expenses, the official identity is:

\[
P\bigl(0.95\,\ddot{a}_{65:\overline{10}|}-0.25\bigr)
=
(10P)\,{}_{10}E_{65}\,A^{1}_{75:\overline{10}|}
+ 36{,}000\,{}_{20}E_{65}\,\ddot{a}_{85}
+ 900 + 100\,\ddot{a}_{65}
\]

**Why those coefficients (exam language):**
- Left: premiums for 10 years, but initial has **extra 25%** of P beyond the ongoing 5% → the **−0.25** adjusts the first premium; ongoing percent expense is **0.95**.
- Right, ROP: death benefit of **10P** for 10 years starting at age 75 → \((10P)\,{}_{10}E_{65}\,A^{1}_{75:\overline{10}|}\).
- Annuity: \(36{,}000\,{}_{20}E_{65}\,\ddot{a}_{85}\).
- Fixed expenses: initial **1,000** minus the “first-year double-count” style adjustment that produces **900**, plus **100** \(\ddot{a}_{65}\) (renewals from year 2 packaged with whole-life style annuity as in the SOA write-up).

**Solve for P:**

\[
P=\dfrac{36{,}000\,{}_{20}E_{65}\,\ddot{a}_{85}+900+100\,\ddot{a}_{65}}{0.95\,\ddot{a}_{65:\overline{10}|}-0.25-(10)\,{}_{10}E_{65}\,A^{1}_{75:\overline{10}|}}
\]

**Official SOA rounded factors (do not invent others):**

\[
P=\dfrac{36{,}000(0.24381)(6.7993)+900+100(13.5498)}{(0.95)(7.8435)-0.25-(10)(0.55305)(0.65142-0.44085)}
\]

**Arithmetic:**
- Numerator: \(36{,}000\times 0.24381\times 6.7993 + 900 + 100\times 13.5498\)
- Denominator: \(0.95\times 7.8435 - 0.25 - 10\times 0.55305\times(0.65142-0.44085)\)

**Answer to report:** \(P = \mathbf{10{,}259.385}\) → show **\(\mathbf{10{,}260}\)** to nearest 10.  
**Keep \(P = 10{,}259.385\)** for the profit test.

---

### Part (b) — Profit vector \(\mathrm{Pr}_t\) at t = 0, 1, 12, 30 (4 pts)

**Intuition.** Emerging profit is “what you held + cash in − expenses, rolled at fund interest, minus claims and the year-end reserve for survivors.” Time 0 is special: only pre-contract expense and issue reserve.

**Profit-test givens to keep in view:**
- Mortality: **0.9 × SULT** \(q\)
- Lapse: **3%** of survivors at each of first **5** year-ends; none after
- Pre-contract expense \(E_0 = 7{,}000\)
- Maintenance: \(70(1.02)^{t-1}\) at start of year \(t\) (\(t\ge 1\))
- Premium expense: **5% of every P** (including first)
- Fund interest: **7%**
- Given reserves:  
  \(V_0=500,\ V_1=10{,}150,\ V_{11}=143{,}035,\ V_{12}=151{,}210,\ V_{29}=155{,}745,\ V_{30}=146{,}275\)

**Cash-flow pattern for CF (premium / annuity side):**
\[
\mathrm{CF}_t=
\begin{cases}
P=10{,}259.385 & t=0,1,\ldots,9\\
0 & t=10,\ldots,19\\
-36{,}000 & t=20,21,\ldots
\end{cases}
\]

**General law (\(t\ge 1\)):**

\[
\mathrm{Pr}_t
= \bigl(V_{t-1}+\mathrm{CF}_{t-1}-E_t\bigr)(1+i)
- \mathbb{E}[\text{death benefit}_t]
- {}_1p^{\text{survive}}\,V_t
\]

with \(i=0.07\). Survival probability in early years includes **lapse**; later years lapse = 0.

---

#### (b) — \(\mathrm{Pr}_0\)

**Intuition.** At issue there is no fund yet; you pay pre-contract expense and set up \(V_0\).

**Formula:**

\[
\mathrm{Pr}_0=-E_0-V_0
\]

**Plug-in:**

\[
\mathrm{Pr}_0=-7{,}000-500=\mathbf{-7{,}500}
\]

---

#### (b) — \(\mathrm{Pr}_1\)

**Intuition.** Year 1: collect premium net of 5%, pay maintenance 70, earn 7%, no death benefit (first 10 years), set up \(V_1\) only for those who **survive and do not lapse**.

**Formula:**

\[
\mathrm{Pr}_1=\bigl(V_0+0.95P-70\bigr)(1.07)
-(1-0.03)(1-0.9q_{65})\,V_1
\]

Official survival factor:

\[
(1-0.03)(1-0.9q_{65})=0.9648362
\]

**Plug-in:**

\[
\mathrm{Pr}_1=\bigl(500+(0.95)(10{,}259.385)-70\bigr)(1.07)
-(0.9648362)(10{,}150)
=\mathbf{1{,}095.68}
\]

---

#### (b) — \(\mathrm{Pr}_{12}\)

**Intuition.** At duration 12 you are in the **ROP window** (ages 75–84): no premium, maintenance inflated 11 years past the year-1 level, death benefit **10P**, no lapse.

**Formulas:**
- Maintenance at start of year 12: \(70(1.02)^{11}\)
- Death claim EPV: \(0.9q_{76}\times(10P)\)
- Survivors: \((1-0.9q_{76})\,V_{12}\)

Official intermediates: \(0.9q_{76}=0.0186012\), so \(1-0.9q_{76}=0.9813988\), and \(10P=102{,}593.85\).

\[
\mathrm{Pr}_{12}
=\bigl(V_{11}-70(1.02)^{11}\bigr)(1.07)
-0.9q_{76}(10P)
-(1-0.9q_{76})\,V_{12}
\]

**Plug-in:**

\[
\mathrm{Pr}_{12}
=(143{,}035-70(1.02)^{11})(1.07)
-0.0186012(102{,}593.85)
-(0.9813988)(151{,}210)
=\mathbf{2{,}648.64}
\]

---

#### (b) — \(\mathrm{Pr}_{30}\)

**Intuition.** Annuity is in payment: pay **36,000** at the start of the year (with maintenance), earn 7%, **no** death benefit this year, set up \(V_{30}\) for survivors at age 94 (90% of SULT).

**Formula:**

\[
\mathrm{Pr}_{30}
=\bigl(V_{29}-36{,}000-70(1.02)^{29}\bigr)(1.07)
-(1-0.9q_{94})\,V_{30}
\]

Official survivor factor: \(1-0.9q_{94}=0.8595532\).

**Plug-in:**

\[
\mathrm{Pr}_{30}
=(155{,}745-36{,}000-70(1.02)^{29})(1.07)
-(0.8595532)(146{,}275)
=\mathbf{2{,}262.995}
\]

**Part (b) answers to box:**

| \(t\) | \(\mathrm{Pr}_t\) |
|------:|------------------:|
| 0 | **−7,500** |
| 1 | **1,095.68** |
| 12 | **2,648.64** |
| 30 | **2,262.995** |

---

### Part (c) — NPV at start of year 2, per policy in force (3 pts)

**Intuition.** Issued NPV = **8,860** is the EPV at **issue** of the whole profit stream (including \(\mathrm{Pr}_0\) and \(\mathrm{Pr}_1\)). You want \(\mathrm{NPV}_1\): EPV at **time 1** of **future** emerging profits **per survivor then in force**. Unwind the first year’s contributions and divide by the probability of still being in force at time 1, discounted at the hurdle.

**Definitions (as in the SOA solution):**

\[
\mathrm{NPV}=\sum_{t=0}^{m}\pi_t\,v_{0.1}^{t}=8{,}860
\qquad\text{where }\pi_0=\mathrm{Pr}_0,\quad
\pi_t={}_{t-1}p_{x}^{00}\,\mathrm{Pr}_t\ (t\ge 1)
\]

\[
\mathrm{NPV}_1
=\mathrm{Pr}_2\,v_{0.1}
+{}_{1}p_{x+1}^{00}\,\mathrm{Pr}_3\,v_{0.1}^{2}+\cdots
\]

**Key split identity:**

\[
\mathrm{NPV}
=\mathrm{Pr}_0+\mathrm{Pr}_1\,v_{0.1}
+{}_{1}p_{x}^{00}\,v_{0.1}\,\mathrm{NPV}_1
\]

with hurdle discount \(v_{0.1}=1/1.1\) and

\[
{}_{1}p_{x}^{00}=(1-0.03)(1-0.9q_{65})=0.9648362.
\]

**Plug-in:**

\[
8{,}860=-7{,}500+\frac{1{,}095.68}{1.1}+(0.9648362)\frac{1}{1.1}\,\mathrm{NPV}_1
\]

**Isolate \(\mathrm{NPV}_1\):**

\[
\mathrm{NPV}_1
=\dfrac{8{,}860+7{,}500-1{,}095.68/1.1}{(0.9648362)/1.1}
=\dfrac{15{,}363.9273}{0.877124}
=\mathbf{17{,}516.25}
\]

**Answer to report:** \(\mathbf{17{,}516.25}\) per policy **in force at the start of year 2**.  
*(Do not report 8,860 — that is the issued NPV, already given.)*

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Equivalence (premium) | \(P(0.95\,\ddot{a}_{65:\overline{10}|}-0.25)=(10P)\,{}_{10}E_{65}\,A^{1}_{75:\overline{10}|}+36{,}000\,{}_{20}E_{65}\,\ddot{a}_{85}+900+100\,\ddot{a}_{65}\) |
| Premium solve | \(P=\dfrac{36{,}000\,{}_{20}E_{65}\,\ddot{a}_{85}+900+100\,\ddot{a}_{65}}{0.95\,\ddot{a}_{65:\overline{10}|}-0.25-(10)\,{}_{10}E_{65}\,A^{1}_{75:\overline{10}|}}\) |
| Time-0 profit | \(\mathrm{Pr}_0=-E_0-V_0\) |
| In-force profit (\(t\ge 1\)) | \(\mathrm{Pr}_t=(V_{t-1}+\mathrm{CF}_{t-1}-E_t)(1+i)-\mathbb{E}[\mathrm{DB}_t]-{}_1p^{\text{surv}}V_t\) |
| Year-1 survival (death + lapse) | \({}_{1}p^{00}=(1-w)(1-0.9q_x)\), here \(w=0.03\) |
| Maintenance (profit test) | \(E_t^{\mathrm{maint}}=70(1.02)^{t-1}\) for \(t\ge 1\) |
| Premium expense (profit test) | \(0.05P\) every premium year |
| ROP claim (deferral years) | \(\mathbb{E}[\mathrm{DB}]=0.9q_{x+t-1}\cdot(10P)\) |
| Issued NPV | \(\mathrm{NPV}=\sum_t \pi_t v_h^{t}\), \(v_h=1/(1+h)\), \(h=0.10\) |
| Split to in-force NPV₁ | \(\mathrm{NPV}=\mathrm{Pr}_0+\mathrm{Pr}_1 v_h+{}_{1}p_{x}^{00} v_h\,\mathrm{NPV}_1\) |
| Solve NPV₁ | \(\mathrm{NPV}_1=\dfrac{\mathrm{NPV}-\mathrm{Pr}_0-\mathrm{Pr}_1 v_h}{{}_{1}p_{x}^{00} v_h}\) |

**Official targets:** \(P=10{,}259.385\) (show \(10{,}260\)); \(\mathrm{Pr}_0=-7{,}500\); \(\mathrm{Pr}_1=1{,}095.68\); \(\mathrm{Pr}_{12}=2{,}648.64\); \(\mathrm{Pr}_{30}=2{,}262.995\); \(\mathrm{NPV}_1=17{,}516.25\).
