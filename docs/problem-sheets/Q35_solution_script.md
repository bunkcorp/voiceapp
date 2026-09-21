# ALTAM Sample Question 35 — Solution Script
*(Fall 2021 Form B WA Q2 · 10 points)*

---

## 1. Problem restatement

**Product.** Three-year term; SI **1,000,000**. Reserves = net premium values at \(i=0.05\), \(q_{x+t}=0.10+0.10t\). \(P^n=177{,}313.20\); \({}_1V^n=95{,}754\).

**Profit test:** pre-contract **4,000**; commissions 20%/5% (extra 15% pre-contract); maintenance **100**; earn **7%**; mortality = reserve mortality; 10% withdraw end years 1–2; no CV. \(G=210{,}000\); \(\mathrm{Pr}_2=37{,}766\), \(\mathrm{Pr}_3=29{,}347\); hurdle **12%**.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Uses of profit tests (1 pt)

Any four: set premiums; set reserves; measure profitability; stress-test profitability; determine distributable surplus (par contracts).

---

### Part (b) — \({}_2V^n\) (1 pt)

\[
{}_2V^n=Svq_{x+2}-P^n=1{,}000{,}000\cdot 1.05^{-1}\cdot 0.3-177{,}313.20=\mathbf{108{,}401.09}
\]

→ show **108,400**.

---

### Part (c) — \(\mathrm{Pr}_0\), \(\mathrm{Pr}_1\) (2 pts)

\[
\mathrm{Pr}_0=-4000-0.15(210{,}000)=\mathbf{-35{,}500}
\]

**How to say it in English.** After rolling net cash at seven percent and paying the expected claim, only survivors who do not withdraw need the year-1 net premium reserve.

\[
\mathrm{Pr}_1=(0.95G-100)(1.07)-100{,}000-(0.9)(0.9)(95{,}754)=\mathbf{35{,}797.26}
\]

---

### Part (d) — Signature, NPV, margin (3 pts)

\[
\begin{align*}
\Pi_0&=-35{,}500\\
\Pi_1&=35{,}797.26\\
\Pi_2&=(0.9)(0.9)(37{,}766)=30{,}590.46\\
\Pi_3&=(0.9)(0.9)(0.8)(0.9)(29{,}347)=17{,}115.17
\end{align*}
\]

\[
\mathrm{NPV}=-35{,}500+\frac{35{,}797.26}{1.12}+\frac{30{,}590.46}{1.12^2}+\frac{17{,}115.17}{1.12^3}=\mathbf{33{,}030.61}
\]

\[
\mathrm{PM}=\dfrac{33{,}030.61}{495{,}508.93}=\mathbf{7.19\%}
\]

---

### Part (e) — \(G\) for 10% margin (3 pts)

\(\mathrm{NPV}=1.8359304\,G-352{,}514.70\); set \(\mathrm{PM}=0.1\):

\[
G=\dfrac{352{,}514.70}{1.8359304-0.218814}=\mathbf{217{,}989.69}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Net \(V_2\) | \(Svq_{x+2}-P^n\) |
| \(\mathrm{Pr}_0\) | \(-4000-0.15G\) |
| \(\mathrm{Pr}_1\) | \((0.95G-100)(1.07)-Sq_x-p(1-w)V_1^n\) |
| Profit margin | \(\mathrm{NPV}/(G\cdot\text{EPV of premium annuity})\) |

**Official targets:** \(V_2^n=108{,}401.09\) (108,400); \(\mathrm{Pr}_0=-35{,}500\); \(\mathrm{Pr}_1=35{,}797.26\); \(\Pi=(-35{,}500;35{,}797.26;30{,}590.46;17{,}115.17)\); NPV \(33{,}030.61\); PM \(7.19\%\); \(G=217{,}989.69\).
