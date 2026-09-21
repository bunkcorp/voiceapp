# ALTAM Sample Question 49 — Solution Script
*(Fall 2017 WA Q2 · 8 points)*

---

## 1. Problem restatement

**Product.** Type **B** UL with ADB **150,000**, issue age **35**. Given premiums, % charges, COI rates, credited **4%**, AV₁=**3647**, AV₂=**8166**, SC 2500/1500/0.

**Profit test:** surrenders 10%/20%/100% end years 1–3; reserves = AV; earned **8%**; \(q_{35+t}=0.0015\); pre-contract **800**; % expenses 25%/7%/7%; death expense **500**; hurdle **10%**.

**Parts.** (a) DB end year 3 ≈ **162,800**. (b) Profit vector. (c) NPV. (d) Profit margin.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Total DB end year 3

**How to say it in English.** Roll the year-two account with ninety-five percent of premium minus cost of insurance, credit four percent, then add one hundred fifty thousand.

**Formulas:**

\[
\mathrm{COI}=150{,}000\times 0.00262\times\frac{1}{1.04}=377.88
\]

\[
\mathrm{AV}_3=\bigl(8166+4800(0.95)-377.88\bigr)(1.04)=12{,}842
\]

\[
\mathrm{DB}_3=150{,}000+12{,}842=\mathbf{162{,}842}
\]

**Answer to report:** show **162,800**.

---

### Part (b) — Profit vector

| \(t\) | \(\mathrm{Pr}_t\) |
|------:|------------------:|
| 0 | **−800.00** |
| 1 | **264.88** |
| 2 | **667.68** |
| 3 | **572.61** |

Key: \(E_1=1200\), \(E_{2,3}=336\); \(I_t=0.08(\mathrm{AV}_{t-1}+P-E)\); \(\mathrm{EDB}=q(\mathrm{ADB}+\mathrm{AV}+500)\); \(\mathrm{ESV}=w(1-q)(\mathrm{AV}-\mathrm{SC})\); \(\mathrm{EAV}=(1-q)(1-w)\mathrm{AV}\).

---

### Part (c) — NPV @ 10%

SOA signature uses \(\Pi_2=600.01\) (from Pr₂≈667):

\[
\mathrm{NPV}=-800+\frac{264.88}{1.1}+\frac{600.01}{1.1^{2}}+\frac{411.04}{1.1^{3}}=\mathbf{245.50}
\]

---

### Part (d) — Profit margin

\[
\frac{245.50}{11{,}569.04}=\mathbf{2.12\%}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type B AV | \((\mathrm{AV}_{t-1}+P(1-e)-\mathrm{COI})(1+i_c)\) |
| Type B DB | \(\mathrm{ADB}+\mathrm{AV}\) |
| Profit | \((\mathrm{AV}_{t-1}+P-E)(1+i_e)-\mathrm{EDB}-\mathrm{ESV}-\mathrm{EAV}\) |
| Margin | \(\mathrm{NPV}/\mathrm{EPV}[\text{premiums}]\) |

**Official targets:** \(\mathrm{DB}_3=162{,}842\); \(\mathrm{Pr}=(-800,264.88,667.68,572.61)\); \(\mathrm{NPV}=245.50\); margin \(2.12\%\).
