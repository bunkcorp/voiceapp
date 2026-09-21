# ALTAM Sample Question 19 — Solution Script
*(LTAM Spring 2019 Q4 · 11 points)*

---

## 1. Problem restatement

**Product.** Fully discrete **last-survivor** whole life of **100,000** on two lives age **40** (P and R). Premiums while ≥1 alive, max **20** years. SULT, **i = 5%**. Given independent \(\ddot{a}_{40:40:\overline{20}|}=12.9028\).

**Parts.** (a) independent net premium. (b) reasons for dependence. (c)–(d) dependent-model factors and premium. (e) \(E[{}_{10}L]\) by survivorship status. (f) which reserve to hold when first death is unreported.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Independent premium (2 pts)

**Intuition.** Equivalence: \(100{,}000\bar{A}_{40:40}=P\,\ddot{a}_{\overline{40:40}:\overline{20}|}\) with last-survivor insurance/annuity from single + joint SULT factors.

**How to say it in English.** Price a last-survivor benefit as two single-life insurances minus the joint-life insurance, and collect premiums on a last-survivor temporary annuity (two single minus joint).

**Formulas (official rounded):**

\[
\bar{A}_{40:40}=2A_{40}-A_{40:40}=0.08157
\]

\[
\ddot{a}_{\overline{40:40}:\overline{20}|}=2\ddot{a}_{40:\overline{20}|}-\ddot{a}_{40:40:\overline{20}|}=13.0842
\]

*(Given joint temporary annuity 12.9028 enters the last-survivor temporary construction.)*

\[
P=\dfrac{100{,}000\times 0.08157}{13.0842}=\mathbf{623.42}
\]

**Answer to report:** show **620** (nearest 10).

---

### Part (b) — Dependence reasons (1 pt)

Any two of: **common shock** (same accident); **shared lifestyle** (smoking/exercise); **broken-heart** mortality after partner’s death.

---

### Part (c) — Dependent-model factors (3 pts)

Dependence only for first 20 years; after 20 years independent SULT. Individual mortality always SULT.

**(i) \(\bar{A}_{40:40}\).** Use \(\ddot{a}_{40:40}=17.6836\) (dependent construction) and \(d=0.05/1.05\):

\[
\bar{A}_{40:40}=1-d\,\ddot{a}_{40:40}=1-\tfrac{0.05}{1.05}(17.6836)=\mathbf{0.15792}
\]

Show **0.158**.

**(ii) \({}_{10}E_{40:40}\):**

\[
{}_{20}E_{40:40}={}_{10}E_{40:40}\,{}_{10}E_{50:50}
\Rightarrow
{}_{10}E_{40:40}=\dfrac{0.35912}{0.59290}=\mathbf{0.60570}
\]

Show **0.606**.

**(iii) \(\ddot{a}_{50:50:\overline{10}|}\):**

\[
\ddot{a}_{40:40:\overline{20}|}
=\ddot{a}_{40:40:\overline{10}|}+{}_{10}E_{40:40}\,\ddot{a}_{50:50:\overline{10}|}
\]

\[
\ddot{a}_{50:50:\overline{10}|}
=\dfrac{12.9254-8.0703}{0.60570}=\mathbf{8.0157}
\]

Show **8.02**.

---

### Part (d) — Dependent premium (1 pt)

\[
\bar{A}_{40:40}=0.08420,\qquad
\ddot{a}_{\overline{40:40}:\overline{20}|}=13.0616
\]

\[
P=\dfrac{100{,}000\times 0.08420}{13.0616}=\mathbf{644.62}
\]

Show **645** (nearest 5). Keep **644.62** for part (e).

---

### Part (e) — \(E[{}_{10}L]\) by status (3 pts)

**Formulas** (prospective; premium still payable if applicable):

| Status at \(t=10\) | \(E[{}_{10}L]\) | Official |
|--------------------|----------------|----------|
| Only one alive | \(100{,}000 A_{50}-P\,\ddot{a}_{50:\overline{10}|}\) | **13,738.6** |
| Both alive | \(100{,}000\bar{A}_{50:50}-P\,\ddot{a}_{50:50:\overline{10}|}\) | **8,223.3** |
| ≥1 alive | mixture of (i) and (ii) | **8,286** |

**Mixture:** with \({}_{10}p_{40:40}=0.9866\), \({}_{10}\bar{p}_{40:40}=0.9980\):

\[
\Pr(\text{both}\mid \ge 1)=\dfrac{0.9866}{0.9980},\quad
\Pr(\text{exactly one}\mid \ge 1)=0.0114
\]

\[
E[{}_{10}L\mid \ge 1]=0.0114(13{,}738.6)+\tfrac{0.9866}{0.9980}(8{,}223.3)=\mathbf{8{,}286}
\]

---

### Part (f) — Suitable time-10 reserve (1 pt)

Insurer knows **no claim** ⇒ **≥1 alive**, but not whether one or both. Hold the **(e)(iii)** value (mixture). Individually wrong if you knew status; aggregate correct given information.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Last-survivor A | \(\bar{A}_{xy}=2A_x-A_{xy}\) |
| Premium | \(P=100{,}000\,\bar{A}/\ddot{a}_{\overline{20}|}\) |
| A from ä | \(\bar{A}=1-d\ddot{a}\) |
| Chain E | \({}_{20}E={}_{10}E_{40:40}\,{}_{10}E_{50:50}\) |
| Split annuity | \(\ddot{a}_{\overline{20}|}=\ddot{a}_{\overline{10}|}+{}_{10}E\,\ddot{a}_{50:50:\overline{10}|}\) |

**Official targets:** \(P_{\mathrm{ind}}=623.42\) (show 620); \(\bar{A}=0.15792\) (0.158); \({}_{10}E=0.60570\) (0.606); \(\ddot{a}_{50:50:\overline{10}|}=8.0157\) (8.02); \(P_{\mathrm{dep}}=644.62\) (645); \(E[L]\): 13,738.6 / 8,223.3 / 8,286.
