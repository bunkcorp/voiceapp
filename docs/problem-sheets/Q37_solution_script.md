# ALTAM Sample Question 37 — Solution Script
*(Modified Spring 2014 WA Q7 · 7 points)*

---

## 1. Problem restatement

**Retirement:** WL annuity-due of **3% of FAS × YOS**. **Death before 65:** 2× salary in year of death at year-end.

Hired 1/1/1990 age **38**, salary **50,000**; 3% raises; exit only death or retire at 65. Value at **1/1/2014** (age 62). \(q_{62+k}=0.08+0.01k\); \(\ddot{a}\) at 1/1/2017 if alive = **4.7491**; \(i=0.04\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Why employers sponsor pensions (1 pt)

Any three: compete for talent; retain staff; facilitate older-age turnover; tax-efficient pay; union bargaining; provide for long service; improve morale.

---

### Part (b) — EPV of death benefit (3 pts)

\(S_x=50{,}000(1.03)^{x-38}\). Deferred \(q\): \(0.08\); \(0.0828\); \(0.08372\).

**How to say it in English.** Twice the year’s salary is paid at year-end of death for each of the three remaining pre-retirement years, discounted and weighted by deferred mortality.

\[
\mathrm{EPV}=(2)(50{,}000)(1.03)^{24}\bigl[0.08v+(1.03)(0.0828)v^2+(1.03)^2(0.08372)v^3\bigr]=\mathbf{47{,}716}
\]

---

### Part (c) — EPV of retirement benefit (3 pts)

YOS at 65 = 27. FAS = **104,719**. \({}_3p_{62}=0.75348\); \(v^3=0.88900\).

\[
\mathrm{EPV}=(0.03)(27)(104{,}719)(0.75348)(0.88900)(4.7491)=\mathbf{269{,}833}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Salary | \(S_x=50{,}000(1.03)^{x-38}\) |
| Death EPV | \(\sum 2S_{62+k}\,{}_{k|}q_{62}\,v^{k+1}\) |
| Retirement EPV | \(0.03\cdot\mathrm{YOS}\cdot\mathrm{FAS}\cdot{}_3p\,v^3\,\ddot{a}\) |

**Official targets:** death **47,716**; FAS **104,719**; retirement **269,833**.
