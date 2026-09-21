# ALTAM Sample Question 21 — Solution Script
*(Spring 2020 WA Q1 · 10 points)*

---

## 1. Problem restatement

**Product.** Fully discrete **joint-life 10-year endowment** of **100,000** on two independent lives both aged **70**. Premiums until first death or maturity. Gross premium **G = 10,658**. Expenses: **400 + 50%** first premium; **2%** of renewals. SULT, **i = 5%**. \(L_0\) = gross loss at issue.

**Parts.** Survival probability; \(E[L_0]\); \(^{2}A\) and \(\mathrm{SD}[L_0]\); Normal \(P[\sum L>0]\) for 100 policies; qualitative profit vs expectation for a 10-policy sub-portfolio with given death ages.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Both survive 10 years (1 pt)

\[
{}_{10}p_{70:70}=\bigl({}_{10}p_{70}\bigr)^{2}=\Bigl(\dfrac{\ell_{80}}{\ell_{70}}\Bigr)^{2}
=\Bigl(\dfrac{75{,}657.2}{91{,}082.4}\Bigr)^{2}=\mathbf{0.689972}
\]

---

### Part (b) — Expected loss at issue (2 pts)

**How to say it in English.** Expected loss is the EPV of the endowment benefit plus issue expense, minus the EPV of premiums net of the 2% renewal and the extra 48% first-year loading.

**Formulas.** Given \(\ddot{a}_{70:70:\overline{10}|}=7.2329\):

\[
A_{70:70:\overline{10}|}=1-d\,\ddot{a}=1-\tfrac{0.05}{1.05}(7.2329)=0.65557
\]

\[
E[L_0]=100{,}000 A+400-G\bigl(0.98\,\ddot{a}-0.48\bigr)
\]

**Plug-in:**

\[
E[L_0]=65{,}557+400-10{,}658\bigl(0.98(7.2329)-0.48\bigr)=\mathbf{-4{,}474}
\]

**Answer to report:** show **−4,470** (nearest 10).

---

### Part (c) — Second moment and SD (3 pts)

**(i)**

\[
{}^{2}A_{70:70:\overline{10}|}
={}^{2}A_{70:70}+{}_{10}p_{70:70}\,v^{20}\bigl(1-{}^{2}A_{80:80}\bigr)
\]

\[
=0.30743+(0.689972)(1.05)^{-20}(1-0.50165)=\mathbf{0.437}
\]

Show **0.44**.

**(ii)** Loss is linear in \(v^{\min(K_{70:70}+1,10)}\):

\[
\mathrm{Var}[L_0]=\Bigl(100{,}000+\dfrac{0.98 G}{d}\Bigr)^{2}\bigl({}^{2}A-A^{2}\bigr)
=737{,}080{,}000
\]

\[
\mathrm{SD}[L_0]=\mathbf{27{,}150}
\]

Show **30,000** (nearest 10,000).

---

### Part (d) — Portfolio Normal approximation (2 pts)

For \(n=100\) independent identical policies:

\[
E[L]=100(-4{,}474)=-447{,}400,\qquad
\mathrm{SD}[L]=10\times 27{,}150=271{,}500
\]

\[
P[L>0]\approx 1-\Phi\Bigl(\dfrac{0-(-447{,}400)}{271{,}500}\Bigr)=1-\Phi(1.648)\approx\mathbf{0.05}
\]

---

### Part (e) — Sub-portfolio profit vs expectation (2 pts)

**Answer:** Realized profit is **greater** than expected.

**Why.** Only **2** death benefits during the term (endowments for the other 8). Expected deaths ≈ \(10(1-{}_{10}p_{70:70})\approx 3.1\). Fewer / later deaths → lower EPV of benefits than expected.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Joint survival | \({}_{n}p_{xx}=({}_{n}p_x)^{2}\) |
| Endowment A | \(A=1-d\ddot{a}\) |
| \(E[L_0]\) | \(S A+400-G(0.98\ddot{a}-0.48)\) |
| Second moment | \({}^{2}A={}^{2}A_{xx}+{}_{n}p v^{2n}(1-{}^{2}A_{x+n:x+n})\) |
| SD loss | \(\bigl(S+0.98G/d\bigr)\sqrt{{}^{2}A-A^{2}}\) |
| Portfolio | \(E=n E_0\), \(\mathrm{SD}=\sqrt{n}\,\mathrm{SD}_0\) |

**Official targets:** \(p=0.689972\); \(E[L_0]=-4{,}474\) (show −4,470); \({}^{2}A=0.437\) (0.44); \(\mathrm{SD}=27{,}150\) (show 30,000); \(P[L>0]\approx 0.05\); profit **greater**.
