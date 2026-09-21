# ALTAM Sample Question 11 — Solution Script
*(ALTAM sample · 12 points)*

---

## 1. Problem restatement

**Product.** Type A CCRC at age 65: entry fee \(F\) (25% of EPV of all future costs) + level monthly fee \(M\) while in CCRC. Costs: ILU 3,000; ALU 7,500; SNF 15,000 per month (begin of month). \(i=0.05\).

**Model.** ILU (0) / ALU (1) / SNF (2) / Dead (3). Given monthly annuity factors at 65 and 70, and \({}_{(12)}A_{65}^{03}=0.3601\).

**Parts.** (a) \(F\) and \(M\). (b) Reserves \(_5V^{(0)}\), \(_5V^{(1)}\). (c) Recursion for \(_{4\,11/12}V^{(0)}\). (d) 50% entry-fee death refund: revised \(F^*\), \(M^*\); effect on \(_5V^{(0)}\).

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — Entry fee \(F\) (1.5 pts of 3)

**Intuition.** EPV of care costs = annualized monthly costs × occupancy annuities from state 0 at 65.

**How to say it in English.** Twenty-five percent of the present value of all future care costs is collected as the entry fee.

**Formula:**

\[
\mathrm{EPV}_{\mathrm{costs}}
=12\bigl(3000\,\ddot{a}_{65}^{(12)00}+7500\,\ddot{a}_{65}^{(12)01}+15{,}000\,\ddot{a}_{65}^{(12)02}\bigr)
\]

**Plug-in:**

\[
\mathrm{EPV}_{\mathrm{costs}}=12\bigl(3000(11.4106)+7500(1.3570)+15{,}000(0.3745)\bigr)
=\mathbf{600{,}321.6}
\]

\[
F=0.25\times 600{,}321.6=\mathbf{150{,}080}
\]

**Answer to report:** \(\mathbf{150{,}080}\) (show 150,000 to nearest 1,000).

---

### Part (a)(ii) — Monthly fee \(M\) (1.5 pts of 3)

**Intuition.** Monthly fees fund the remaining 75% of care-cost EPV, payable while in any living state.

**Formula:**

\[
12M\bigl(\ddot{a}_{65}^{(12)00}+\ddot{a}_{65}^{(12)01}+\ddot{a}_{65}^{(12)02}\bigr)
=0.75\times 600{,}321.6
\]

**Plug-in:**

\[
12M(11.4106+1.3570+0.3745)=450{,}241.2
\Rightarrow M=\mathbf{2{,}854.95}
\]

**Answer to report:** \(\mathbf{2{,}854.95}\).

---

### Part (b)(i) — \(_5V^{(0)}\) at age 70 in ILU (1.5 pts of 3)

**Intuition.** Prospective: EPV future costs − EPV future monthly fees, from state 0 at 70.

**Formula:**

\[
_5V^{(0)}
=12\bigl(3000\,\ddot{a}_{70}^{(12)00}+7500\,\ddot{a}_{70}^{(12)01}+15{,}000\,\ddot{a}_{70}^{(12)02}\bigr)
-12M\bigl(\ddot{a}_{70}^{(12)00}+\ddot{a}_{70}^{(12)01}+\ddot{a}_{70}^{(12)02}\bigr)
\]

**Plug-in:** \(\mathbf{183{,}563}\).

**Answer to report:** \(\mathbf{183{,}563}\).

---

### Part (b)(ii) — \(_5V^{(1)}\) at age 70 in ALU (1.5 pts of 3)

**Formula:**

\[
_5V^{(1)}
=12\bigl(7500\,\ddot{a}_{70}^{(12)11}+15{,}000\,\ddot{a}_{70}^{(12)12}\bigr)
-12M\bigl(\ddot{a}_{70}^{(12)11}+\ddot{a}_{70}^{(12)12}\bigr)
\]

**Plug-in:** \(\mathbf{712{,}340}\).

**Answer to report:** \(\mathbf{712{,}340}\).

---

### Part (c) — Monthly recursion for \(_{4\,11/12}V^{(0)}\) (2 pts)

**Intuition.** One month before the 5-year point: pay month-start net cash flow, discount one month, take expectation of next month’s state-dependent reserve. Need SNF reserve at 70:

\[
_5V^{(2)}=12(15{,}000-M)\,\ddot{a}_{70}^{(12)22}=\mathbf{1{,}340{,}245}
\]

**Formula:**

\[
_{4\,11/12}V^{(0)}
=v^{1/12}\Bigl[
(3000-M)
+{}_{1/12}p_{69}^{00}\,{}_5V^{(0)}
+{}_{1/12}p_{69}^{01}\,{}_5V^{(1)}
+{}_{1/12}p_{69}^{02}\,{}_5V^{(2)}
\Bigr]
\]

with given \(p^{00}=0.94937\), \(p^{01}=0.00906\), \(p^{02}=0.00003\).

**Plug-in:** \(\mathbf{180{,}175}\).

**Answer to report:** \(\mathbf{180{,}175}\).

---

### Part (d)(i)–(ii) — Refund option fees (3 pts of 4)

**Intuition.** Refund \(0.5F\) at end of month of death → EPV \(=0.5F\cdot{}_{(12)}A_{65}^{03}\). Entry fee is 25% of (costs + refund). Monthly fees cover 75% of (costs + refund).

**How to say it in English.** The death refund is an extra benefit that must itself be funded by a larger entry fee and larger monthly fee.

**Formulas:**

\[
F^*=0.25\bigl(600{,}321.6+0.5F^*\cdot 0.3601\bigr)
\Rightarrow F^*=\mathbf{157{,}153}
\]

\[
12M^*\sum_j\ddot{a}_{65}^{(12)0j}
=0.75\bigl(600{,}321.6+0.5F^*\cdot 0.3601\bigr)
\Rightarrow M^*=\mathbf{2{,}989.52}
\]

**Answers:** \(F^*=\mathbf{157{,}153}\); \(M^*=\mathbf{2{,}989.52}\).

---

### Part (d)(iii) — Effect on \(_5V^{(0)}\) (1 pt of 4)

**Intuition.** Prospective reserve now includes remaining refund liability; fee income changes but the extra death benefit dominates for a life still in force at duration 5.

**Answer to report:** \(_5V^{(0)}\) **increases**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Cost EPV | \(12\sum_j c_j\,\ddot{a}^{(12)0j}\) |
| Entry fee | \(F=0.25\cdot\mathrm{EPV}_{\mathrm{costs}}\) |
| Monthly fee | \(12M\sum_j\ddot{a}^{(12)0j}=0.75\cdot\mathrm{EPV}_{\mathrm{costs}}\) |
| Reserve | EPV future costs − EPV future fees |
| Refund | add \(0.5F\cdot{}_{(12)}A^{03}\) into equivalence |

**Official targets:** \(F=150{,}080\); \(M=2854.95\); \(_5V^{(0)}=183{,}563\); \(_5V^{(1)}=712{,}340\); \(_{4\,11/12}V^{(0)}=180{,}175\); \(F^*=157{,}153\); \(M^*=2989.52\); reserve **increases**.
