# ALTAM Sample Question 41 — Solution Script
*(Fall 2018 WA Q6 · 10 points)*

---

## 1. Problem restatement

**Final-salary DB:** 2% × YOS × final-year salary; monthly life annuity-due with **10-year guarantee**. Employee contributes **6%** of pay monthly. Hire age 30, salary 40,000; retire at 65 (35 YOS). Salaries grow 3.6% convertible monthly. Woolhouse 2-term; SULT; \(i=5\%\). Lump sum = EPV of pension.

**Parts:** (a) monthly pension; (b) EPV; (c) AV of contributions @ 9.6% mly; (d) IRR vs 9.6%; (e) monthly pension without guarantee (same EPV); (f) adverse selection.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Monthly pension (2 pts)

\[
S_{64}=40{,}000\Bigl(1+\frac{0.036}{12}\Bigr)^{(64-30)\cdot 12}=138{,}044.47
\]

\[
B=\frac{(0.02)(35)S_{64}}{12}=\mathbf{8{,}052.594}\quad\text{(show 8,050)}
\]

---

### Part (b) — EPV at 65 (2 pts)

\[
\ddot{a}_{65:\overline{10}|}^{(12)}=\ddot{a}_{\overline{10}|}^{(12)}+{}_{10}E_{65}\bigl(\ddot{a}_{75}-11/24\bigr)=13.38208
\]

**How to say it in English.** The expected present value is the annual pension times a monthly annuity-due with a ten-year certain period, valued with Woolhouse after the guarantee.

\[
\mathrm{EPV}=(0.02)(35)(138{,}044.47)(13.38208)=\mathbf{1{,}293{,}125.93}
\]

---

### Part (c) — AV of contributions (2 pts)

6% of monthly salary, 420 months, salary grows at 0.3%/month, interest 0.8%/month:

\[
\mathrm{AV}=200\cdot(1.008)^{419}\cdot\frac{1-(1.003/1.008)^{420}}{1-1.003/1.008}=\mathbf{995{,}523.94}
\]

**Answer to report:** show **995,500** (nearest 100).

---

### Part (d) — IRR vs 9.6% (1 pt)

Lump sum **1,293,126** > AV at 9.6% (**995,524**) ⇒ IRR on contributions **greater than** 9.6% convertible monthly.

---

### Part (e) — No-guarantee monthly benefit (1 pt)

\[
1{,}293{,}125.93=12B^*\bigl(\ddot{a}_{65}-11/24\bigr)=12B^*(13.5498-11/24)
\]

\[
B^*=\mathbf{8{,}231.35}
\]

---

### Part (f) — Adverse selection (2 pts)

**(i)** Choosing the most advantageous option using private health/risk information unknown to the plan.

**(ii)** Healthiest take life annuities; unhealthy take lump sums → plan costs rise.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Final salary | \(S_0(1+i_s/12)^{12\cdot\text{years}}\) |
| Monthly \(B\) | \(0.02\cdot\text{YOS}\cdot S_{64}/12\) |
| Guaranteed monthly ä | \(\ddot{a}_{\overline{n}|}^{(12)}+{}_nE(\ddot{a}_{x+n}-11/24)\) |
| IRR test | compare lump sum to AV at stated \(i\) |

**Official targets:** \(B=8052.594\) (8050); EPV \(1{,}293{,}125.93\); AV \(995{,}523.94\) (995,500); IRR > 9.6%; \(B^*=8231.35\).
