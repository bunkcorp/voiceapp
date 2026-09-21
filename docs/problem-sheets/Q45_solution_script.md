# ALTAM Sample Question 45 — Solution Script
*(Spring 2021 WA Q5 · 8 points)*

---

## 1. Problem restatement

**Career-average earnings DB** for D age **63** on 1/1/2021; joined 1/1/1998; TPE **2,400,000**; 2021 salary **170,000**; accrual **2%**; monthly life annuity-due.

**Death in service:** lump sum = **4×** annual pension if retired at death.

**TUC;** Standard Service Table; mid-year exits before 65; \(i=0.05\); given \(\ddot{a}_{63.5}^{(12)}=13.5139\), \(\ddot{a}_{64.5}^{(12)}=13.2312\), \(\ddot{a}_{65}^{(12)}=13.0870\).

**Parts:** (a) AL + NC for age retirement; (b) AL + NC for death-in-service.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Age retirement (4 pts)

Accrued annual pension on past earnings: \(\alpha\cdot\mathrm{TPE}=48{,}000\).

**How to say it in English.** Traditional unit credit liability multiplies the accrued career-average pension by the service-table probabilities of retiring at sixty-three-and-a-half, sixty-four-and-a-half, or sixty-five, each times the matching monthly annuity.

**(i) AL:**

\[
\mathrm{AL}=48{,}000\Biggl[
\frac{4515}{47579}v^{0.5}(13.5139)
+\frac{4061}{47579}v^{1.5}(13.2312)
+\frac{38488}{47579}v^{2}(13.087)
\Biggr]
\]

\[
=48{,}000(1.2515+1.0496+9.6022)=\mathbf{571{,}358.40}
\]

**(ii) NC** (credit this year’s salary only; half-year weight on age-63 exits):

\[
\mathrm{NC}=3400\Bigl[\tfrac12(1.2515)+1.0496+9.6022\Bigr]=\mathbf{38{,}344}
\]

*(Alternate recursion path gives ≈ 38,346 — report **38,344**.)*

---

### Part (b) — Death in service (4 pts)

Lump sum at mid-year death = \(4\alpha\times\) accrued annual pension on earnings to date.

**(i) AL:**

\[
\mathrm{AL}=4(0.02)(2{,}400{,}000)\Biggl[
\frac{213.9}{47579}v^{0.5}+\frac{215.1}{47579}v^{1.5}
\Biggr]
\]

\[
=192{,}000(0.004387+0.004202)=\mathbf{1{,}649.09}
\]

**(ii) NC:**

\[
\mathrm{NC}=13{,}600\Bigl[\tfrac12(0.004387)+0.004202\Bigr]=\mathbf{86.98}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Retirement AL | \(\alpha\cdot\mathrm{TPE}\sum(r_{x+k}/l_x)v^{t_k}\ddot{a}^{(12)}\) |
| Retirement NC | \(\alpha\cdot S\bigl[\tfrac12 f_{63.5}+f_{64.5}+f_{65}\bigr]\) |
| Death AL | \(4\alpha\cdot\mathrm{TPE}\sum(d_{x+k}/l_x)v^{t_k}\) |
| Death NC | \(4\alpha\cdot S\bigl[\tfrac12\delta_{63}+\delta_{64}\bigr]\) |

**Official targets:** retirement AL **571,358.40**; retirement NC **38,344**; death AL **1,649.09**; death NC **86.98**.
