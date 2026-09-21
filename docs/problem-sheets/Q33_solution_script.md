# ALTAM Sample Question 33 — Solution Script
*(Fall 2021 Form B WA Q1 · 10 points · FAM-L covers parts (a)–(c))*

---

## 1. Problem restatement

**Product.** WL on **(50)**; SI starts at **200,000**, +**5,000**/year after year 1; level premiums ≤ **20** years. SULT, \(i=0.05\).

**Expenses:** 1000 on DB; 15% first premium; 5% renewals.

**Parts:** (a) \((IA)_x\) identity + \((IA)_{51}\); (b) gross \(P\); (c) \({}_2V^g\); (d) year-11 surplus + IME gains on 1000 policies.

---

## 2–3. Part-by-part walkthrough

### Part (a) — \((IA)\) recursion (2 pts)

**How to say it in English.** An increasing insurance equals a level whole-life plus a one-year deferred increasing insurance on the survivor.

\[
(IA)_x=A_x+vp_x(IA)_{x+1}
\]

Given \((IA)_{50}=5.8255\):

\[
(IA)_{51}=\dfrac{5.8255-0.18931}{0.998791/1.05}=\mathbf{5.92516}\quad\text{(show 5.9)}
\]

---

### Part (b) — Gross premium (2 pts)

\[
(201{,}000)A_{50}+5000\bigl((IA)_{50}-A_{50}\bigr)=P\bigl(0.95\,\ddot{a}_{50:\overline{20}|}-0.1\bigr)
\]

\[
37{,}104.76+29{,}127.5=P\bigl(0.95\cdot 12.8428-0.1\bigr)\Rightarrow P=\mathbf{5{,}473.44}
\]

**Answer to report:** show **5,500**. Keep \(P=5473.44\).

---

### Part (c) — \({}_2V^g\) (2 pts)

\[
{}_1V=\dfrac{(5473.44)(0.85)(1.05)-(0.001209)(201{,}000)}{0.998791}=4647.6
\]

\[
{}_2V=\dfrac{[4647.6+0.95\cdot 5473.44](1.05)-(0.001331)(206{,}000)}{0.998669}=\mathbf{10{,}078.9}
\]

**Answer to report:** show **10,080**.

---

### Part (d) — Year 11 (4 pts)

\({}_{10}V=63208\), \({}_{11}V=71217\); \(i^*=6\%\); 6 deaths; exp 6% of P + 1100/death; SI = 250,000.

**(i)** Surplus = \(157{,}917.62\) ⇒ **157.92**/policy → show **160**.

**(ii)** I **684,077.68**; M **−467,795.37**; E **−58,618.46**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| IA recursion | \((IA)_x=A_x+vp_x(IA)_{x+1}\) |
| Equivalence | \((201k)A_{50}+5k((IA)_{50}-A_{50})=P(0.95\ddot{a}_{50:20}-0.1)\) |
| Interest gain | \(N(V+0.95P)(i^*-i)\) |

**Official targets:** \((IA)_{51}=5.92516\) (5.9); \(P=5473.44\) (5500); \(V_2=10078.9\) (10080); surplus/pol 157.92 (160); I 684077.68; M −467795.37; E −58618.46.
