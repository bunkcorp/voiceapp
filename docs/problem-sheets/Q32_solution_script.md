# ALTAM Sample Question 32 — Solution Script
*(Fall 2021 Form A WA Q1 · 10 points · FAM-L covers parts (a)–(c))*

---

## 1. Problem restatement

**Product.** Fully discrete WL **100,000** on **(50)** with ROP: none in first 10 years; after year 10, return all premiums without interest at year-end of death.

**Givens:** \(P=2000\); expenses 80% first / 5% renewals; term expense 1000; SULT; \(i=0.05\); \((IA)_{60}=6.63303\).

**Parts (a)–(c):** \(L^g\) at \(T_{50}=11.8\); \(\mathrm{E}[L^g]\); \({}_{10}V^g\).

**Parts (d)–(e):** 1000 policies at \(t=15\); year-16 experience; total + EIM gain-by-source; orders with same interest gain as EIM.

---

## 2–3. Part-by-part walkthrough

### Part (a) — \(L^g\) when \(T_{50}=11.8\) (1 pt)

\(K_{50}=11\) ⇒ 12 premiums returned.

**How to say it in English.** Gross loss is the present value of the sum insured plus twelve returned premiums plus one thousand of claim expense, plus the first-year expense load, minus ninety-five percent of premium times a twelve-payment annuity-due.

**Formulas:**

\[
L^g=(S+12P+1000)v^{12}+0.75P-0.95P\,\ddot{a}_{\overline{12}|}
\]

\[
\ddot{a}_{\overline{12}|}=9.306414
\]

**Plug-in:** \(69{,}604.6773+1500-17{,}682.187=\mathbf{53{,}422.49}\) → show **53,420**.

---

### Part (b) — \(\mathrm{E}[L^g]\) (2 pts)

EPV of SI, term expense, ROP after year 10, and expense-adjusted premiums.

**Answer to report:** \(\mathbf{-248.53}\).

---

### Part (c) — \({}_{10}V^g\) (2 pts)

\[
{}_{10}V^g=(S+1000)A_{60}+10P\,A_{60}+P(IA)_{60}-0.95P\,\ddot{a}_{60}
\]

Official components: \(29{,}318.28+5{,}805.60+13{,}266.06-28{,}317.79=\mathbf{20{,}072.15}\) → show **20,070**.

---

### Part (d) — Year-16 gains (4 pts)

**Givens:** \({}_{15}V=34{,}333.78\), \({}_{16}V=37{,}480.51\); 7 deaths; \(i^*=0.052\); 4% premium expense; 2000 term expense/death.

**(i) Total gain:**

\[
1000(34333.78+0.96\cdot 2000)(1.052)-7(134{,}000)-993(37480.51)=\mathbf{-17{,}169.87}
\]

**(ii) EIM:**
- **E:** \(110{,}915-95{,}830=\mathbf{15{,}085}\) (uses \(q_{65}=0.005915\))
- **I:** \(1000(34333.78+1920)(0.002)=\mathbf{72{,}507.56}\)
- **M:** \(\mathbf{-104{,}723.65}\)

---

### Part (e) — Same interest as EIM (1 pt)

**MEI** and **EMI**. Mortality is year-end (does not affect interest). Expenses change the fund that earns interest, so **E must precede I**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Path \(L^g\) | \((S+12P+1000)v^{12}+0.75P-0.95P\ddot{a}_{\overline{12}|}\) |
| \({}_{10}V^g\) | \((S+1000)A_{60}+10PA_{60}+P(IA)_{60}-0.95P\ddot{a}_{60}\) |
| Interest gain | \(N(V+0.96P)(i^*-i)\) |

**Official targets:** \(L^g=53422.49\) (show 53420); \(\mathrm{E}[L^g]=-248.53\); \({}_{10}V=20072.15\) (show 20070); total \(-17169.87\); E \(15085\); I \(72507.56\); M \(-104723.65\); same-I: **MEI, EMI**.
