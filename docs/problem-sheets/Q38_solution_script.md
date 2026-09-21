# ALTAM Sample Question 38 — Solution Script
*(Fall 2014 WA Q2 · 9 points)*

---

## 1. Problem restatement

**DB:** monthly life annuity-due. Annual at 65: 2% of FAS ≤100k × YOS + 3% of FAS over 100k × YOS. Hire 2009 age 40; retire 2034 age 65 (**25** YOS). Salary 2014 = **80,000**; +4%/year. \(i=5\%\); \(A_{65}^{(12)}=0.470\).

**DC top-up:** constant % of salary from 1/1/2014; earns 7%; converts to monthly life annuity. Target total RR **80%**.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Monthly benefit (2 pts)

\(S_{62}=155{,}832\); \(S_{63}=162{,}065\); \(S_{64}=168{,}548\); FAS = **162,148**.

\[
\text{Monthly}=\frac{25[(0.02)(100{,}000)+(0.03)(62{,}148)]}{12}=\mathbf{8{,}051}
\]

→ show **8,050**.

---

### Part (b) — Replacement ratio (1 pt)

**How to say it in English.** Replacement ratio uses the final year’s salary in the denominator, not FAS.

\[
\mathrm{RR}=\dfrac{12\times 8051}{168{,}548}=\mathbf{57.3\%}
\]

---

### Part (c) — EPV at 65 (2 pts)

\[
\ddot{a}_{65}^{(12)}=\dfrac{1-0.470}{0.04869}=10.885;\quad\mathrm{EPV}=(8051)(12)(10.885)=\mathbf{1{,}051{,}620}
\]

---

### Part (d) — DC contribution rate (4 pts)

Need RR \(0.227\) more → cost **416,464** at 65. Accumulated contributions \(=c\cdot 4{,}789{,}500\). Equate ⇒ \(\mathbf{c=8.70\%}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Monthly DB | \(n[(0.02)\min(\mathrm{FAS},100k)+(0.03)\max(\mathrm{FAS}-100k,0)]/12\) |
| RR | \(12B/S_{\mathrm{final}}\) |
| \(\ddot{a}^{(12)}\) | \((1-A^{(12)})/d^{(12)}\) |
| DC accum | \(c\sum S_t(1.07)^{n-t}\) |

**Official targets:** monthly **8,051** (8,050); RR **57.3%**; EPV **1,051,620**; \(c=\mathbf{8.70\%}\).
