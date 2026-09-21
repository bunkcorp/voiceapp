# ALTAM Sample Question 1 — Solution Script
*(MLC Fall 2014 Q4 · 8 points)*

---

## 1. Problem restatement

**Model.** 4-state Markov LTC: Level 0 Care (0), Level 1 Care (1), Level 2 Care (2), Dead (3).

**Part (a).** Write Kolmogorov forward ODEs (with BCs) for \({}_tp_x^{10}\) and \({}_tp_x^{11}\).

**Part (b).** Estimate \({}_1p_{80}^{10}\) by Euler’s forward method with \(h=1/3\), using the given intensity/probability table.

**Part (c).** At \(i=0.05\), age 80 currently in Level 0:
- Service fee **8,000**/yr continuously in Level 0 or 1.
- Level 2 care: **30,000**/yr ages 80–85; **40,000**/yr after 85.
- Given annuity factors at 80 and 85, and \({}_5p_{80}^{0j}\) for \(j=0,1,2\).

Find EPV of (i) Level 0+1 fees and (ii) Level 2 care costs.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Kolmogorov forward equations (1 pt)

**Intuition.** Probability mass in a state changes by inflows at transition intensities minus outflows. For \(p^{10}\) you enter from state 1 via \(\mu^{10}\) and leave via exits from 0; for \(p^{11}\) you stay in 1 subject to its exit intensity and can enter from 0.

**Formulas:**

\[
\frac{d}{dt}\,{}_tp_x^{10}
={}_tp_x^{11}\,\mu_{x+t}^{10}
-{}_tp_x^{10}\bigl(\mu_{x+t}^{01}+\mu_{x+t}^{03}\bigr)
\]

\[
\frac{d}{dt}\,{}_tp_x^{11}
={}_tp_x^{10}\,\mu_{x+t}^{01}
-{}_tp_x^{11}\bigl(\mu_{x+t}^{10}+\mu_{x+t}^{12}+\mu_{x+t}^{13}\bigr)
\]

**Boundary conditions:** \({}_0p_x^{10}=0\), \({}_0p_x^{11}=1\).

**Answer to report:** the two ODEs above with those BCs.

---

### Part (b) — Euler estimate of \({}_1p_{80}^{10}\) (3 pts)

**Intuition.** Euler replaces the derivative by a finite step:  
\({}_{t+h}p \approx {}_tp + h\cdot(\text{RHS of Kolmogorov})\).

**How to say it in English.** Start from \(p^{10}=0\) at \(t=0\). Each third of a year, add \(h\) times “mass entering from Level 1 minus mass leaving Level 0.”

**Euler update (from Kolmogorov for \(p^{10}\)):**

\[
{}_{t+h}p_{80}^{10}
\approx {}_tp_{80}^{10}
+h\Bigl[
{}_tp_{80}^{11}\,\mu_{80+t}^{10}
-{}_tp_{80}^{10}\bigl(\mu_{80+t}^{01}+\mu_{80+t}^{03}\bigr)
\Bigr]
\]

with \(h=1/3\). Given \({}_0p_{80}^{10}=0\) and table values at \(t=0,1/3,2/3\).

**Plug-in (official SOA steps):**

\[
{}_{1/3}p_{80}^{10}
\approx 0+\tfrac13\bigl[(1)(0.08)-(0)(0.10000+0.02981)\bigr]
=0.02667
\]

\[
{}_{2/3}p_{80}^{10}
\approx 0.02667+\tfrac13\bigl[(0.90346)(0.08)-(0.02667)(0.10000+0.03082)\bigr]
=0.04960
\]

\[
{}_1p_{80}^{10}
\approx 0.04960+\tfrac13\bigl[(0.81652)(0.08)-(0.04960)(0.10000+0.03186)\bigr]
=\mathbf{0.069193}
\]

**Answer to report:** \(\mathbf{0.069193}\) (≈ **0.06919**).

---

### Part (c)(i) — EPV of Level 0 and Level 1 service fees (2 pts of 4)

**Intuition.** Fee of 8,000 while in 0 or 1: use occupancy annuities from state 0.

**How to say it in English.** Eight thousand times the expected discounted time spent in Level 0 or Level 1 starting from Level 0 at age 80.

**Formula:**

\[
\mathrm{EPV}=8{,}000\bigl(\bar{a}_{80}^{00}+\bar{a}_{80}^{01}\bigr)
\]

**Plug-in:**

\[
\mathrm{EPV}=8{,}000(5.5793+1.3813)=8{,}000(6.9606)=\mathbf{55{,}684.8}
\]

**Answer to report:** \(\mathbf{55{,}685}\) (nearest dollar as in SOA).

---

### Part (c)(ii) — EPV of Level 2 care costs (remaining points)

**Intuition.** Level 2 pays 30,000 forever from age 80, plus an extra 10,000 after age 85. Split: base continuous annuity in state 2 from 80, plus deferred 10,000 starting at 85, conditioning on being in 0, 1, or 2 at age 85.

**Formulas:**

\[
\mathrm{EPV}
=30{,}000\,\bar{a}_{80}^{02}
+10{,}000\,\bar{a}_{80:\overline{5}|}^{02\text{(deferred)}}
\]

\[
\bar{a}_{80:\overline{5}|}^{02\text{(def)}}
=v^5\Bigl(
{}_5p_{80}^{00}\,\bar{a}_{85}^{02}
+{}_5p_{80}^{01}\,\bar{a}_{85}^{12}
+{}_5p_{80}^{02}\,\bar{a}_{85}^{22}
\Bigr)
\]

with \(v^5=1.05^{-5}\).

**Official givens:**  
\({}_5p_{80}^{00}=0.53880\), \({}_5p_{80}^{01}=0.17327\), \({}_5p_{80}^{02}=0.06956\);  
\(\bar{a}_{80}^{02}=0.6109\); \(\bar{a}_{85}^{02}=0.3403\), \(\bar{a}_{85}^{12}=1.0883\), \(\bar{a}_{85}^{22}=3.2367\).

**Plug-in:**

\[
\mathrm{EPV}=30{,}000(0.6109)+10{,}000\cdot(\text{deferred factor})=\mathbf{23{,}005}
\]

(config exact ≈ **23,004.99**).

**Answer to report:** \(\mathbf{23{,}005}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Kolmogorov \(p^{10}\) | \(\frac{d}{dt}{}_tp^{10}={}_tp^{11}\mu^{10}-{}_tp^{10}(\mu^{01}+\mu^{03})\) |
| Kolmogorov \(p^{11}\) | \(\frac{d}{dt}{}_tp^{11}={}_tp^{10}\mu^{01}-{}_tp^{11}(\mu^{10}+\mu^{12}+\mu^{13})\) |
| Euler step | \(p(t+h)\approx p(t)+h\cdot\text{RHS}\) |
| Level 0+1 fees | \(8{,}000(\bar{a}^{00}+\bar{a}^{01})\) |
| Level 2 EPV | \(30{,}000\bar{a}^{02}+10{,}000\,v^5\sum_j{}_5p^{0j}\bar{a}_{85}^{j2}\) |

**Official targets:** \({}_1p_{80}^{10}=0.069193\); fees EPV \(=55{,}685\); Level 2 EPV \(=23{,}005\).
