# ALTAM Sample Question 39 — Solution Script
*(Modified Spring 2015 WA Q7 · 6 points)*

---

## 1. Problem restatement

**Career:** hire age 40 on 1 Jan 2014, salary **30,000**; 2% raises both employers; retire at **65**.

- **ABC Life:** flat **900**/year of service
- **XYZ Re:** **3%** of FAS × years of service

**(a)** Stay ABC 9.5 years then XYZ → show RR ≈ 63%.  
**(b)** Max ABC tenure for RR ≥ 65%.  
**(c)** Switch after 7 years (1 Jan 2021); accruals freeze 1 Jan 2029; buy 10-year deferred WL annuity-due at age 55 to top RR to 65%; SULT, \(i=5\%\); find net annual premium.

---

## 2–3. Part-by-part walkthrough

### Part (a) — RR with 9.5 years at ABC (2 pts)

\[
S_{64}=30{,}000(1.02)^{24}=48{,}253
\]

\[
\mathrm{FAS}=\frac{30{,}000}{3}\bigl[(1.02)^{22}+(1.02)^{23}+(1.02)^{24}\bigr]=47{,}313
\]

**How to say it in English.** Replacement ratio is ABC’s flat accrual plus XYZ’s percent of final average salary, all over the final year’s salary.

\[
\mathrm{Benefit}=(9.5)(900)+(15.5)(47{,}313)(0.03)=30{,}551
\]

\[
\mathrm{RR}=\dfrac{30{,}551}{48{,}253}=\mathbf{63.3\%}\quad\text{(show 63\%)}
\]

---

### Part (b) — Max ABC years for RR ≥ 65% (1 pt)

Let \(n\) = years at ABC; \(25-n\) at XYZ.

\[
\frac{900n+(25-n)(47{,}313)(0.03)}{48{,}253}\ge 0.65
\]

\[
\frac{35{,}485-519.4n}{48{,}253}\ge 0.65\Rightarrow n\le\mathbf{7.9}\text{ years}
\]

---

### Part (c) — Deferred annuity premium (3 pts)

Accrued at freeze (7 ABC + 8 XYZ), FAS at ages 52–54:

\[
\mathrm{Accrued}=(7)(900)+(8)(0.03)\frac{S_{52}+S_{53}+S_{54}}{3}=15{,}615
\]

Required at retirement: \(0.65\cdot S_{64}=31{,}364\). Annuity payment \(=31{,}364-15{,}615=15{,}749\).

**Formulas:**

\[
P\,\ddot{a}_{55:\overline{10}|}=15{,}749\cdot{}_{10}E_{55}\,\ddot{a}_{65}
\]

**Plug-in:**

\[
P=\dfrac{(0.59342)(15{,}749)(13.5498)}{8.0192}=\mathbf{15{,}791}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| RR | \((\text{ABC}+\text{XYZ benefit})/S_{64}\) |
| ABC benefit | \(900\times\text{YOS}\) |
| XYZ benefit | \(0.03\times\mathrm{FAS}\times\text{YOS}\) |
| Deferred premium | \(P\ddot{a}_{55:10}=B\,{}_{10}E_{55}\ddot{a}_{65}\) |

**Official targets:** RR **63.3%** (show 63%); max ABC **7.9** years; \(P=\mathbf{15{,}791}\).
