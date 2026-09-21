# ALTAM Sample Question 22 — Solution Script
*(LTAM Fall 2020 Q4 · 10 points)*

---

## 1. Problem restatement

**Product.** Fully discrete **last-survivor** whole life of **100,000** on independent identical lives **D, M age 50**. Premiums until second death: **semi-annual for 20 years**, then **annual**. Commissions **10%** of each premium; other acquisition **70% of G** at issue. Woolhouse **two-term** for \(m=2\). SULT, **i = 5%**. Equivalence premium **G**.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Exactly one alive at 20 (1 pt)

\[
{}_{20}p_{50}=\dfrac{\ell_{70}}{\ell_{50}}=\dfrac{91{,}082.4}{98{,}576.4}=0.92398
\]

\[
\Pr(\text{exactly one})=2\,{}_{20}p_{50}(1-{}_{20}p_{50})=\mathbf{0.1405}
\]

Show **0.14**.

---

### Part (b) — Temporary last-survivor \(\ddot{a}^{(2)}_{\overline{50:50}:\overline{20}|}\) (2 pts)

**Woolhouse \(m=2\):** subtract \(1/4\) of \((1-{}_{n}E)\).

\[
\ddot{a}^{(2)}_{50:\overline{20}|}=\ddot{a}_{50:\overline{20}|}-\tfrac14(1-{}_{20}E_{50})
=12.8428-0.25(1-0.34824)=12.6799
\]

\[
\ddot{a}^{(2)}_{50:50:\overline{20}|}
=(\ddot{a}_{50:50}-1/4)-{}_{20}E_{50:50}(\ddot{a}_{70:70}-1/4)=12.4396
\]

Last-survivor temporary Woolhouse:

\[
\ddot{a}^{(2)}_{\overline{50:50}:\overline{20}|}
=2(12.6799)-12.4396=\mathbf{12.9202}
\]

Show **12.92**.

---

### Part (c) — Gross premium G (2 pts)

**How to say it in English.** Benefits cost 100,000 times last-survivor insurance; premiums net of 10% commission fund a hybrid annuity (semi-annual for 20 years, then annual), with an extra 70% of G due at issue.

**Benefits:**

\[
100{,}000(2A_{50}-A_{50:50})=100{,}000(2\times 0.18931-0.24669)=13{,}193
\]

**Premium annuity EPV** (unit annual rate):

\[
12.9202+0.1405\,v^{20}\,\ddot{a}_{70}+({}_{20}p_{50})^{2}v^{20}(2\ddot{a}_{70}-\ddot{a}_{70:70})=18.0734
\]

**Equivalence:**

\[
13{,}193=G\bigl(0.9\times 18.0734-0.7\bigr)
\Rightarrow G=\dfrac{13{,}193}{15.5661}=\mathbf{847.55}
\]

Show **850**. Keep **847.55**.

---

### Part (d) — Reserves at time 20 (2 pts)

**(i) Both alive** (ages 70, annual premiums thereafter):

\[
{}_{20}V^{(2)}=100{,}000\bar{A}_{\overline{70:70}}-0.9 G\,\ddot{a}_{\overline{70:70}}
\]

With \(\ddot{a}_{\overline{70:70}}=14.0392\), \(\bar{A}=1-d(14.0392)=0.33147\):

\[
{}_{20}V^{(2)}=\mathbf{22{,}437.6}
\]

Show **22,400**.

**(ii) Exactly one alive:**

\[
{}_{20}V^{(1)}=100{,}000 A_{70}-0.9 G\,\ddot{a}_{70}
=100{,}000(0.42818)-(0.9)(847.55)(12.0083)=\mathbf{33{,}658}
\]

---

### Part (e) — Reserve at 19.5, both alive (3 pts)

Constant force between 69 and 70: \(q_{69}=0.009294\).

\[
{}_{0.5}p_{69.5}=(1-0.009294)^{1/2}=0.99534,\qquad
{}_{0.5}q=1-{}_{0.5}p
\]

Half-year recursion (premium \(G/2\) net of commission at start of half-year):

\[
{}_{19.5}V^{(2)}
=v^{0.5}\Bigl[
({}_{0.5}q)^{2}(100{,}000)
+({}_{0.5}p)^{2}{}_{20}V^{(2)}
+2\,{}_{0.5}p\,{}_{0.5}q\,{}_{20}V^{(1)}
\Bigr]
-0.9\,\dfrac{G}{2}
=\mathbf{21{,}619}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Exactly one | \(2p(1-p)\) |
| Woolhouse \(m=2\) | \(a^{(2)}=a-\frac14(1-{}_{n}E)\) |
| Last-survivor temp | \(2a^{(2)}_x-a^{(2)}_{xx}\) |
| Premium | \(G=\mathrm{EPV\,ben}/(0.9\,\ddot{a}_{\mathrm{prem}}-0.7)\) |
| Reserve both @20 | \(S\bar{A}-0.9G\,\ddot{a}\) |
| Half-year CF | \(v^{1/2}E[\text{end values}]-0.9G/2\) |

**Official targets:** 0.1405 (show 0.14); \(\ddot{a}^{(2)}=12.9202\) (12.92); \(G=847.55\) (850); \(V^{(2)}=22{,}437.6\) (22,400); \(V^{(1)}=33{,}658\); \({}_{19.5}V^{(2)}=21{,}619\).
