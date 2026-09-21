# ALTAM Sample Question 42 — Solution Script
*(Spring 2019 WA Q3 · 8 points)*

---

## 1. Problem restatement

**Career-average DB:** 2% of career average earnings × YOS; monthly life annuity-due. Member D age **63**, 30 YOS, total past earnings **2,500,000**; next-year salary **160,000** if full year.

**TUC funding;** Standard Service Table; mid-year exits before 65; SULT+UDD after retirement; \(i=0.05\); given \(\ddot{a}_{63.5}^{(12)}=13.514\), \(\ddot{a}_{64.5}^{(12)}=13.231\), \(\ddot{a}_{65}^{(12)}=13.086\).

**Parts:** (a) actuarial liability; (b) normal contribution.  
*(Extract shows only (a)+(b); treat remaining point budget as tied to these calculations.)*

---

## 2–3. Part-by-part walkthrough

### Part (a) — Actuarial liability (2 pts)

Accrued annual pension on past earnings: \(\alpha\cdot\mathrm{TPE}=50{,}000\).

**How to say it in English.** Liability is fifty thousand times the probability-weighted present value of a monthly life annuity starting at each possible retirement age, with mid-year exits discounted half a year.

**Formula:**

\[
\mathrm{AL}_0=50{,}000\Biggl[
\frac{r_{63}}{l_{63}}v^{0.5}\ddot{a}_{63.5}^{(12)}
+\frac{r_{64}}{l_{63}}v^{1.5}\ddot{a}_{64.5}^{(12)}
+\frac{r_{65}}{l_{63}}v^{2}\ddot{a}_{65}^{(12)}
\Biggr]
\]

**Plug-in** (\(r_{63}=4515.2\), \(r_{64}=4061.0\), \(r_{65}=38488.3\), \(l_{63}=47579.3\)):

\[
=50{,}000(1.251550+1.049600+9.601498)=\mathbf{595{,}132.40}
\]

**Answer to report:** show **595,000**.

---

### Part (b) — Normal contribution (3 pts)

Shortcut (credit only this year’s salary):

\[
\mathrm{NC}=160{,}000\cdot 0.02\Bigl[\tfrac12(1.25155)+1.0496+9.601498\Bigr]=\mathbf{36{,}085.99}
\]

**Alternate path:** \(\mathrm{NC}=\mathrm{EPV}(\text{mid-year exits})+v\,p_{63}^{00}\mathrm{AL}_1-\mathrm{AL}_0\)

\[
=64{,}579.98+566{,}638.41-595{,}132.40=36{,}085.99
\]

**Answer to report:** show **36,000**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| TUC AL | \(\alpha\cdot\mathrm{TPE}\sum (r_{x+k}/l_x)v^{t_k}\ddot{a}^{(12)}\) |
| NC (salary only) | \(\alpha\cdot S\bigl[\tfrac12 f_{63.5}+f_{64.5}+f_{65}\bigr]\) |
| NC recursion | \(\mathrm{AL}+NC=\mathrm{EPV}_{\mathrm{mid}}+vp\,\mathrm{AL}_{+1}\) |

**Official targets:** AL **595,132.40** (show 595,000); NC **36,085.99** (show 36,000).
