# ALTAM Sample Question 24 — Solution Script
*(LTAM Fall 2021 Form A Q5 · 7 points)*

---

## 1. Problem restatement

**Product.** Fully discrete **10-year joint-life endowment** of **200,000** on independent **(50)** and **(60)** (Person B and Person A). Benefit at earlier of first death year-end or maturity. SULT, **i = 5%**. Equivalence premiums.

**Parts.** Net premium; \({}^{2}A\); \(\mathrm{SD}[L]\); gross premium with expenses; interest shock to **10.25%** (\((1.05)^2-1\)).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Net premium (1 pt)

Given \(\ddot{a}_{50:60:\overline{10}|}=7.9044\):

\[
A_{50:60:\overline{10}|}=1-d\,\ddot{a}=1-\tfrac{0.05}{1.05}(7.9044)=0.6236
\]

\[
P=\dfrac{200{,}000\times 0.6236}{7.9044}=\mathbf{15{,}778.55}
\]

Show **15,780**.

---

### Part (b) — Second moment endowment (2 pts)

\[
{}^{2}A_{50:60:\overline{10}|}
={}^{2}A_{50:60}+{}_{10}E_{50}\,{}_{10}E_{60}\,(1-{}^{2}A_{60:70})
=\mathbf{0.3908335}
\]

Show **0.39** (nearest 0.01).

---

### Part (c) — SD of net loss at issue (1 pt)

\[
\mathrm{SD}[L]=\Bigl(S+\dfrac{P}{d}\Bigr)\sqrt{{}^{2}A-A^{2}}
=(531{,}349.55)\sqrt{0.390834-0.6236^{2}}
=\mathbf{23{,}505.84}
\]

---

### Part (d) — Gross premium (1 pt)

Expenses: 25% first + 10% renewals ⇒ net loading factor \(0.9\ddot{a}-0.15\).

**How to say it in English.** The insurer keeps 90% of every premium annuity unit but loses an extra 15% of one premium at issue (25% − 10%).

\[
G=\dfrac{200{,}000\times 0.6236}{0.9(7.9044)-0.15}=\dfrac{124{,}720}{6.96396}=\mathbf{17{,}909.35}
\]

---

### Part (e) — Interest to 10.25% (2 pts)

**(i)** At double force, endowment insurance factor equals \({}^{2}A\) at original \(i\):

\[
A^*=0.390834,\qquad
d^*=\dfrac{0.1025}{1.1025}=0.0929705,\qquad
\ddot{a}^*=\dfrac{1-A^*}{d^*}=6.552249
\]

\[
G^*=\dfrac{200{,}000\times 0.390834}{0.9\,\ddot{a}^*-0.15}=13{,}601.27
\]

\[
\dfrac{G-G^*}{G}=\mathbf{24.05\%}
\]

**(ii)** Percentage reduction for a **10-year term** joint insurance would be **less**. Endowment’s survival benefit is paid at \(t=10\) and is more interest-sensitive than death benefits paid earlier on average.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Endowment A | \(A=1-d\ddot{a}\) |
| Net P | \(P=S A/\ddot{a}\) |
| Second moment | \({}^{2}A={}^{2}A_{xy}+{}_{n}E_x{}_{n}E_y(1-{}^{2}A_{x+n:y+n})\) |
| SD[L] | \((S+P/d)\sqrt{{}^{2}A-A^{2}}\) |
| Gross G | \(G=SA/(0.9\ddot{a}-0.15)\) |
| Shock | \(A^*={}^{2}A\), \(\ddot{a}^*=(1-A^*)/d^*\) |

**Official targets:** \(P=15{,}778.55\) (15,780); \({}^{2}A=0.3908\) (show 0.39); \(\mathrm{SD}=23{,}505.84\); \(G=17{,}909.35\); reduction **24.05%**; term reduction **less**.
