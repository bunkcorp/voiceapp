# ALTAM Sample Question 23 — Solution Script
*(LTAM Spring 2021 Q6 · 9 points)*

---

## 1. Problem restatement

**Model.** 4-state joint lives: both alive (0), only \(y\) (1), only \(x\) (2), both dead (3).

**Parts.** (a) interpret \(\bar{a}^{01}_{xy}\). (b) Kolmogorov for \({}_{t}p^{00}\), \({}_{t}p^{01}\). (c) prove EMW approximation \(\bar{a}^{00}\approx\ddot{a}^{00}-\frac12-\frac1{12}(\mu^{01}+\mu^{02}+\delta)\). (d) last-survivor continuous annuity for two independent age-70 lives; SNP = 1,000,000; find benefit rate \(B\) via EMW. Given \(\mu_{70}=0.009881\), \(\bar{a}_{70|70}=2.0317\), \(i=0.05\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Meaning of \(\bar{a}^{01}_{xy}\) (1 pt)

**Answer:** Continuous **reversionary annuity** to \((y)\) starting on death of \((x)\), rate 1 per year (payments while in State 1, issued from State 0).

---

### Part (b) — Kolmogorov equations (2 pts)

\[
\frac{d}{dt}{}_{t}p^{00}_{xy}
=-{}_{t}p^{00}_{xy}\bigl(\mu^{01}_{x+t}+\mu^{02}_{y+t}\bigr),\qquad
{}_{0}p^{00}=1
\]

\[
\frac{d}{dt}{}_{t}p^{01}_{xy}
={}_{t}p^{00}_{xy}\,\mu^{01}_{x+t}
-{}_{t}p^{01}_{xy}\,\mu^{13}_{y+t},\qquad
{}_{0}p^{01}=0
\]

---

### Part (c) — EMW proof (3 pts)

Let \(g(t)={}_{t}p^{00}_{xy}\,e^{-\delta t}\), so \(\bar{a}^{00}=\int_0^\infty g(t)\,dt\) and \(\ddot{a}^{00}=\sum_{k=0}^\infty g(k)\), with \(g(0)=1\).

Product rule + Kolmogorov:

\[
g'(t)=-{}_{t}p^{00}(\mu^{01}_{x+t}+\mu^{02}_{y+t}+\delta)\,e^{-\delta t}
\]

\[
g'(0)=-(\mu^{01}_x+\mu^{02}_y+\delta)
\]

EMW: \(\int_0^\infty g\approx\sum g(k)-\frac12 g(0)+\frac1{12}g'(0)\) yields

\[
\bar{a}^{00}_{xy}\approx\ddot{a}^{00}_{xy}-\frac12-\frac1{12}\bigl(\mu^{01}_x+\mu^{02}_y+\delta\bigr)
\]

---

### Part (d) — Benefit rate \(B\) (3 pts)

**How to say it in English.** A last-survivor continuous annuity is the both-alive annuity plus two reversionary annuities; approximate the both-alive piece with EMW using the SULT joint due annuity.

\[
1{,}000{,}000=B\bigl(\bar{a}^{00}_{70:70}+2\,\bar{a}_{70|70}\bigr)
\]

Independent lives: \(\mu^{01}=\mu^{02}=\mu_{70}\), \(\delta=\ln 1.05\approx 0.04879\), \(\ddot{a}^{00}_{70:70}=\ddot{a}_{70:70}^{\mathrm{SULT}}=9.9774\):

\[
\bar{a}^{00}
\approx 9.9774-\tfrac12-\tfrac1{12}\bigl(2\times 0.009881+0.04879\bigr)
=\mathbf{9.4717}
\]

\[
B=\dfrac{1{,}000{,}000}{9.4717+2(2.0317)}=\dfrac{1{,}000{,}000}{13.5351}=\mathbf{73{,}881.98}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Reversionary | \(\bar{a}^{01}\) = continuous annuity to \(y\) after death of \(x\) |
| Kolmogorov \(p^{00}\) | \(\dot p^{00}=-p^{00}(\mu^{01}+\mu^{02})\) |
| EMW | \(\bar{a}^{00}\approx\ddot{a}^{00}-\frac12-\frac1{12}(\mu^{01}+\mu^{02}+\delta)\) |
| Last-survivor | \(\bar{a}_{\overline{xy}}=\bar{a}^{00}+2\bar{a}_{x\|y}\) (identical lives) |
| Benefit rate | \(B=\mathrm{SNP}/(\bar{a}^{00}+2\bar{a}_{x\|y})\) |

**Official targets:** \(B=73{,}881.98\); \(\bar{a}^{00}\approx 9.4717\).
