# ALTAM Sample Question 16 — Solution Script
*(LTAM Spring 2022 Q2 · 10 points)*

---

## 1. Problem restatement

**Product.** 20-year term to **(50)** with death benefit **500,000** and CI benefit **100,000** on diagnosis, valued in a 3-state Markov model: Healthy (0) → Critically Ill (1) → Dead (2).

**Givens.** Continuous premiums while healthy at net rate **P = 4,850**; benefits immediate on transition; **i = 5%**; table of \(\bar{a}^{00}\), \(\bar{A}^{0j}\), \(\bar{A}^{12}\), and 10-year transition probabilities at ages 60 and 70.

**Part (a).** At duration 10 (age 60): show \(\bar{A}^{02}_{60:\overline{10}|}\), \({}_{10}V^{(0)}\), \({}_{10}V^{(1)}\).

**Part (b).** Given forces at 60, compute \(dV^{(0)}/dt\) and \(dV^{(1)}/dt\) at \(t=10\), and explain why one rises and one falls.

**Parts (c)–(d).** Revised CI paid **0.5** years after diagnosis if still in State 1; define Markov property and whether post-diagnosis mortality spike is consistent with it.

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — Temporary \(\bar{A}^{02}_{60:\overline{10}|}\) (show 0.0902)

**Intuition.** Split the permanent insurance into “within 10 years” vs “after 10 years,” subtracting the discounted continuation values from States 0 and 1 at age 70.

**Formula:**

\[
\bar{A}^{02}_{60:\overline{10}|}
=
\bar{A}^{02}_{60}
-{}_{10}p^{00}_{60}\,v^{10}\,\bar{A}^{02}_{70}
-{}_{10}p^{01}_{60}\,v^{10}\,\bar{A}^{12}_{70}
\]

**Plug-in (official factors):**

\[
=0.39077-(0.75055)(1.05)^{-10}(0.54335)-(0.13135)(1.05)^{-10}(0.62237)
=\mathbf{0.09022}
\]

**Answer to report:** show **0.0902** (to nearest 0.0001).

---

### Part (a)(ii)–(iii) — Net premium reserves at \(t=10\)

**Intuition.** Prospective net premium reserve = EPV future benefits − EPV future premiums, conditional on current state.

**How to say it in English.** In Healthy, you still owe death and CI insurance for the remaining term, and you still collect continuous premium while healthy. In Critically Ill, the CI has already been paid, so only a temporary death insurance remains and premiums have stopped.

**Formulas (remaining term 10 years from age 60):**

\[
{}_{10}V^{(0)}
=500{,}000\,\bar{A}^{02}_{60:\overline{10}|}
+100{,}000\,\bar{A}^{01}_{60:\overline{10}|}
-4{,}850\,\bar{a}^{00}_{60:\overline{10}|}
\]

\[
{}_{10}V^{(1)}=500{,}000\,\bar{A}^{12}_{60:\overline{10}|}
\]

Official temporary factors:

\[
\bar{a}^{00}_{60:\overline{10}|}=7.1461,\quad
\bar{A}^{01}_{60:\overline{10}|}=0.11397,\quad
\bar{A}^{12}_{60:\overline{10}|}=0.19140
\]

**Plug-in:**

\[
{}_{10}V^{(0)}=500{,}000(0.09022)+100{,}000(0.11397)-4{,}850(7.1461)=\mathbf{21{,}850.4}
\]

\[
{}_{10}V^{(1)}=500{,}000(0.19140)=\mathbf{95{,}700}
\]

**Answers to report:** show **21,850** (nearest 50) and **95,700** (nearest 10).

---

### Part (b) — Thiele derivatives at \(t=10\)

**Intuition.** Thiele’s DE balances interest and premium income against expected claim costs and reserve jumps on transition.

**Formulas** (\(\delta=\ln 1.05\); at age 60: \(\mu^{01}=0.00818\), \(\mu^{02}=0.00724\), \(\mu^{12}=0.01811\)):

\[
\frac{d}{dt}V^{(0)}
=\delta V^{(0)}+P
-\mu^{01}\bigl(100{,}000+V^{(1)}-V^{(0)}\bigr)
-\mu^{02}\bigl(500{,}000-V^{(0)}\bigr)
\]

\[
\frac{d}{dt}V^{(1)}
=\delta V^{(1)}
-\mu^{12}\bigl(500{,}000-V^{(1)}\bigr)
\]

**Plug-in:**

\[
\frac{dV^{(0)}}{dt}=\mathbf{1{,}032.2},\qquad
\frac{dV^{(1)}}{dt}=\mathbf{-2{,}652.8}
\]

**(iii) Why.** In State 0 early/mid-term, premiums plus interest still outweigh expected claims and reserve transfers, so \(V^{(0)}\) is climbing. In State 1 the contract is a single-premium temporary insurance with no premium income; claims on average deplete the reserve toward 0 at expiry, so \(V^{(1)}\) is falling.

---

### Part (c) — Deferred CI benefit integral

**Intuition.** CI is paid only if diagnosis occurs within 20 years and the life is still in State 1 half a year later.

**Formula (EPV at issue):**

\[
100{,}000\int_{0}^{20}{}_{t}p^{00}_{x}\,
\mu^{01}_{x+t}\,
{}_{0.5}p^{11}_{x+t}\,
v^{t+0.5}\,dt
\]

---

### Part (d) — Markov property vs mortality spike

**(i)** Given the current state at time \(t\), future transition probabilities do not depend on the path before \(t\).

**(ii)** A mortality spike immediately after CI diagnosis depends on **time since diagnosis**, so it is **inconsistent** with a pure Markov model using only current state.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Temporary A⁰² | \(\bar{A}^{02}_{x:\overline{n}|}=\bar{A}^{02}_{x}-{}_{n}p^{00}v^{n}\bar{A}^{02}_{x+n}-{}_{n}p^{01}v^{n}\bar{A}^{12}_{x+n}\) |
| Reserve Healthy | \(V^{(0)}=S_{\mathrm{D}}\bar{A}^{02}+S_{\mathrm{CI}}\bar{A}^{01}-P\bar{a}^{00}\) |
| Reserve CI | \(V^{(1)}=S_{\mathrm{D}}\bar{A}^{12}\) |
| Thiele (0) | \(\dot V^{(0)}=\delta V^{(0)}+P-\mu^{01}(S_{\mathrm{CI}}+V^{(1)}-V^{(0)})-\mu^{02}(S_{\mathrm{D}}-V^{(0)})\) |
| Thiele (1) | \(\dot V^{(1)}=\delta V^{(1)}-\mu^{12}(S_{\mathrm{D}}-V^{(1)})\) |

**Official targets:** \(\bar{A}^{02}_{60:\overline{10}|}=0.09022\) (show 0.0902); \({}_{10}V^{(0)}=21{,}850.4\) (show 21,850); \({}_{10}V^{(1)}=95{,}700\); \(\dot V^{(0)}=1{,}032.2\); \(\dot V^{(1)}=-2{,}652.8\).
