# ALTAM Sample Question 12 — Solution Script
*(LTAM Spring 2019 Q2 · 10 points)*

---

## 1. Problem restatement

**Product.** Structured settlement for disabled (45): continuous **90,000**/yr while disabled (states 0 or 2); extra **20,000**/yr while prognosis uncertain (state 0) for up to **2** years. \(i=0.04\).

**Model.** Uncertain prognosis (0) / Recovered (1) / Permanently disabled (2) / Dead (3). No return to 0 after leaving.

**Parts.** (a)–(b) qualitative. (c) EPV at \(t=0\). (d) reserves at \(t=2\), EPV of those reserves, first-2-year payments. (e) effect of raising \(\mu^{01}\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Why annuity format (1 pt)

Two reasons, e.g.:
1. Better matches ongoing lost wages / medical costs (can inflate).
2. Shifts investment / dissipation risk away from the injured party.

---

### Part (b) — Why <100% wage replacement (1 pt)

Two reasons, e.g.:
1. Settlement annuity may be tax-advantaged vs salary.
2. Incentive to return to work.
3. Partial fault / comparative negligence.

---

### Part (c) — EPV at issue ≈ 705,700 (2 pts)

**Intuition.** Base 90,000 in states 0 and 2 for life (within model), plus 20,000 rider only while in 0 for first 2 years.

**How to say it in English.** Ninety thousand for all disabled time, plus a two-year medical rider while prognosis is still uncertain.

**Formulas:**

\[
\bar{a}^{00}_{:\overline{2}|}
=\bar{a}_{45}^{00}-v^2\,{}_2p_{45}^{00}\,\bar{a}_{47}^{00}
=0.559-v^2(0.0301)(0.559)=0.543444
\]

(\(v^2=1.04^{-2}\)).

\[
\mathrm{EPV}
=90{,}000(\bar{a}_{45}^{00}+\bar{a}_{45}^{02})
+20{,}000\,\bar{a}^{00}_{:\overline{2}|}
\]

**Plug-in:**

\[
\mathrm{EPV}=90{,}000(0.559+7.161)+20{,}000(0.543444)=\mathbf{705{,}669}
\]

**Answer to report:** **705,669** (show **705,700** to nearest 100).

---

### Part (d)(i) — \(_2V^{(0)}\) (1 pt of 4)

**Intuition.** At \(t=2\) in state 0 the 2-year rider has expired; only 90,000 remains in 0 and 2.

**Formula:**

\[
_2V^{(0)}=90{,}000(\bar{a}_{47}^{00}+\bar{a}_{47}^{02})=90{,}000(0.559+7.104)=\mathbf{689{,}670}
\]

**Answer to report:** **689,670** (show **689,700**).

---

### Part (d)(ii) — \(_2V^{(2)}\) (1 pt of 4)

\[
_2V^{(2)}=90{,}000\,\bar{a}_{47}^{22}=90{,}000(10.623)=\mathbf{956{,}070}
\]

**Answer to report:** \(\mathbf{956{,}070}\).

---

### Part (d)(iii) — \(E_0[_2V]\) (1 pt of 4)

**Formula:**

\[
E_0[_2V]
=v^2\bigl({}_2p_{45}^{00}\,{}_2V^{(0)}+{}_2p_{45}^{02}\,{}_2V^{(2)}\bigr)
\]

**Plug-in:** \(\mathbf{564{,}054}\) (show **564,000** to nearest 1,000).

---

### Part (d)(iv) — First two years’ payments (1 pt of 4)

**How to say it in English.** Total EPV equals payments in the first two years plus the EPV of the reserve set up at time 2.

**Formula:**

\[
\mathrm{EPV}_{0\text{–}2}=\mathrm{EPV}-E_0[_2V]=705{,}669-564{,}054=\mathbf{141{,}615}
\]

**Answer to report:** \(\mathbf{141{,}615}\).

---

### Part (e) — Increase \(\mu^{01}\) by 0.01 (2 pts)

**(i) \(_2V^{(2)}\):** **unchanged** — conditional on being in state 2; exits from 2 unaffected.

**(ii) \(E_0[_2V]\):** **decreases** — higher recovery force lowers \({}_2p^{00}\) and \({}_2p^{02}\), and lowers \(_2V^{(0)}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Term annuity in 0 | \(\bar{a}^{00}_{:n|}=\bar{a}^{00}-v^n\,{}_np^{00}\,\bar{a}_{x+n}^{00}\) |
| Issue EPV | \(90{,}000(\bar{a}^{00}+\bar{a}^{02})+20{,}000\bar{a}^{00}_{:2|}\) |
| \(E_0[_2V]\) | \(v^2(p^{00}V^{(0)}+p^{02}V^{(2)})\) |
| First 2 years | \(\mathrm{EPV}-E_0[_2V]\) |

**Official targets:** EPV \(705{,}669\) (show 705,700); \(_2V^{(0)}=689{,}670\); \(_2V^{(2)}=956{,}070\); \(E_0[_2V]=564{,}054\); first 2 yrs \(141{,}615\).
