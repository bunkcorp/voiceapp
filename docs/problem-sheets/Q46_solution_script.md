# ALTAM Sample Question 46 — Solution Script
*(Fall 2021 Form A WA Q6 · 9 points)*

---

## 1. Problem restatement

**Product.** Final-average-salary DB pension; member **J** age **57**, **35** years service, partner **M** also **57**.
- Accrual **1.8%**; FAS = average of final **2** years’ salary; salaries frozen next year (current/last year salary **100,000**).
- Pension monthly from **65** with **100%** survivor pension to partner if death after **65**.
- **No** death benefit on withdrawal before **65**.
- Valuation: **TUC**, Standard Service Table, \(i=0.05\), post-exit SULT, withdrawals mid-year, independent lifetimes.
- Given: \(\ddot{a}_{65}^{(12)}=13.0870\), \(\ddot{a}_{65:65}^{(12)}=11.2158\), \(a_{58.5}^{w}=10.5804\), \(a_{59.5}^{w}=11.1456\).

**Parts.** (a) Show \({}_{7.5}E_{57.5:57.5}=0.655\) and \(a_{57.5}^{w}=10.05\). (b) Withdrawal AL ≈ **36,000**. (c) NC for withdrawal benefit. (d) Divorce settlement: find **X**.

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — Joint pure endowment factor

**Intuition.** Discount **7.5** years and survive both lives from **57.5** to **65** under SULT with UDD mid-age \(l\) values.

**How to say it in English.** Take one over one-point-oh-five to the seven-point-five, times the square of sixty-five’s survivors over the mid-age fifty-seven-point-five survivors.

**Formula:**

\[
{}_{7.5}E_{57.5:57.5}=v^{7.5}\left(\frac{l_{65}}{l_{57.5}}\right)^{2}
=1.05^{-7.5}\left(\frac{94{,}579.7}{0.5(97{,}435.2+97{,}195.6)}\right)^{2}
\]

**Plug-in / Answer to report:** \(0.6551081\) → show **0.655** (nearest 0.001).

---

### Part (a)(ii) — Withdrawal annuity \(a_{57.5}^{w}\)

**Intuition.** Recurse half-year survival 57.5→58.5 into given \(a_{58.5}^{w}\); or build from deferred monthly annuities at 65.

**Formulas:**

\[
a_{57.5}^{w}=v\frac{l_{58.5}}{l_{57.5}}a_{58.5}^{w}
=\frac{1}{1.05}\cdot\frac{0.5(97{,}195.6+96{,}929.6)}{0.5(97{,}435.2+97{,}195.6)}\cdot(10.5804)
\]

Alternate with \({}_{7.5}E_{57.5}=0.674057\):

\[
a_{57.5}^{w}={}_{7.5}E_{57.5}\,\ddot{a}_{65}^{(12)}+{}_{7.5}E_{57.5:57.5}\bigl(\ddot{a}_{65}^{(12)}-\ddot{a}_{65:65}^{(12)}\bigr)
\]

**Plug-in:** \(10.050395\) (recurse) or \(10.04722\) (alternate).  
**Answer to report:** show **10.05**. Use **10.04722** in later SOA arithmetic.

---

### Part (b) — Actuarial liability for withdrawal benefit

**Intuition.** TUC accrued \((0.018)(35)(100{,}000)=63{,}000\) times EPV of mid-year withdrawals at 57.5, 58.5, 59.5.

**How to say it in English.** Sixty-three thousand times three contingent withdrawal present values from the service table.

**Formula:**

\[
\mathrm{AL}=(63{,}000)\sum_{k=0}^{2}\frac{w_{57+k}}{l_{57}}v^{k+0.5}a_{57.5+k}^{w}
\]

**Plug-in:**

\[
\mathrm{AL}=(63{,}000)\Bigl\{\tfrac{1976}{99{,}960.2}1.05^{-0.5}(10.04722)
+\tfrac{1929.9}{99{,}960.2}1.05^{-1.5}(10.5804)
+\tfrac{1884.3}{99{,}960.2}1.05^{-2.5}(11.1456)\Bigr\}
=(63{,}000)\{0.193825+0.1898566+0.1859744\}=\mathbf{35{,}888.33}
\]

**Answer to report:** show **36,000** (nearest 1,000).

---

### Part (c) — Normal contribution for withdrawal benefit

**Formula:**

\[
\mathrm{NC}=(1{,}800)\bigl\{(0.5)(0.193825)+0.1898566+0.1859744\bigr\}=\mathbf{850.94}
\]

**Answer to report:** \(\mathbf{850.94}\).

---

### Part (d) — Divorce settlement X

**Formulas:**

\[
\text{Pre}=(0.018)(35.5)(100{,}000)\,a_{57.5}^{w}=(63{,}900)(10.04722)=642{,}017.36
\]

\[
\text{Post}={}_{7.5}E_{57.5}\,\ddot{a}_{65}^{(12)}\Bigl(X+\tfrac{X}{3}\Bigr)=(0.674057)(13.0870)\cdot\tfrac{4X}{3}=11.761845\,X
\]

**Plug-in:** \(X=\mathbf{54{,}584.75}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Joint PE | \({}_{7.5}E_{57.5:57.5}=v^{7.5}(l_{65}/l_{57.5})^{2}\) |
| Withdrawal annuity recurse | \(a_{57.5}^{w}=v(l_{58.5}/l_{57.5})a_{58.5}^{w}\) |
| TUC withdrawal AL | \(\mathrm{AL}=(0.018)nS\sum (w_{x+k}/l_x)v^{k+0.5}a_{x+0.5+k}^{w}\) |
| TUC NC | \(\mathrm{NC}=(0.018)S\{\frac12\text{term}_0+\text{term}_1+\text{term}_2\}\) |
| Divorce equate | \((0.018)(35.5)S\,a^{w}={}_{7.5}E\,\ddot{a}_{65}^{(12)}\cdot(4X/3)\) |

**Official targets:** \({}_{7.5}E=0.6551081\); \(a_{57.5}^{w}\approx10.05\); AL \(=35{,}888.33\) (show 36,000); NC \(=850.94\); \(X=54{,}584.75\).
