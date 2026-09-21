# ALTAM Sample Question 18 — Solution Script
*(MLC Fall 2015 Q2 · 11 points)*

---

## 1. Problem restatement

**Model.** 4-state couple Markov: both alive (0), only \(y\) (1), only \(x\) (2), both dead (3). Forces: \(\mu^{01}=A+Bc^{x+t}\), \(\mu^{02}=A+Bc^{y+t}\), \(\mu^{13}=D+Bc^{y+t}\), \(\mu^{23}=E+Bc^{x+t}\) with \(A=0.0001\), \(B=10^{-5}\), \(c=1.12\), \(D=0.00015\), \(E=0.0002\).

**Product.** Ages \(x=50\), \(y=55\); single-premium deferred continuous joint/last-survivor annuity starting at \(t=10\): **50,000**/yr while both alive, **30,000**/yr while exactly one alive; if both die in the deferral, pay **3P** on second death. **i = 5%**.

**Parts.** (a) independence? (b) Kolmogorov for \({}_{t}p^{00}\). (c) benefit value at 10 both alive; single net premium. (d) state reserves at 10; Thiele; Euler step to 10.5.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Dependence (1 pt)

**Intuition.** Each life’s force depends on whether the partner is alive.

**Answer:** Future lifetimes are **dependent**, because \(\mu^{01}_{x+t:y+t}\neq\mu^{23}_{x+t}\) and \(\mu^{02}\neq\mu^{13}\) (married vs widowed forces differ). Not “independent because no common shock.”

---

### Part (b) — Kolmogorov for \({}_{t}p^{00}\) (3 pts)

**(i) DE + BC:**

\[
\frac{d}{dt}{}_{t}p^{00}_{xy}
=-{}_{t}p^{00}_{xy}\bigl(\mu^{01}_{x+t:y+t}+\mu^{02}_{x+t:y+t}\bigr),\qquad
{}_{0}p^{00}_{xy}=1
\]

**(ii) Integrate:** separate variables →

\[
{}_{t}p^{00}_{xy}
=\exp\Bigl(-\int_{0}^{t}\bigl(\mu^{01}_{x+r:y+r}+\mu^{02}_{x+r:y+r}\bigr)\,dr\Bigr)
\]

---

### Part (c) — Benefits at 10 and single premium (3 pts)

**Intuition.** At \(t=10\), ages 60/65: value continuous annuity payments by state occupancy factors \(\bar{a}^{00}\), \(\bar{a}^{01}\), \(\bar{a}^{02}\). Premium also covers reversionary single-life annuities if only one survives deferral, plus 3P on second death in deferral.

**How to say it in English.** The single premium funds three deferred annuity paths (both alive, only \(y\), only \(x\)) plus a triple-premium death benefit if the second death occurs during the ten-year wait.

**(i) Both alive at 10:**

\[
50{,}000\,\bar{a}^{00}_{60:65}+30{,}000\,\bar{a}^{01}_{60:65}+30{,}000\,\bar{a}^{02}_{60:65}
\]

**Plug-in:**

\[
(50{,}000)(8.8219)+(30{,}000)(1.3768)+(30{,}000)(3.0175)=\mathbf{572{,}924}
\]

**Show 573,000** (nearest 1,000).

**(ii) Single net premium P.** With \(v^{10}=0.61391\):

| Path | EPV |
|------|-----|
| Both survive | \({}_{10}p^{00}v^{10}(572{,}924)=302{,}627\) |
| Only \(y\) | \({}_{10}p^{01}v^{10}(30{,}000)\bar{a}^{11}_{65}=9{,}078\) |
| Only \(x\) | \({}_{10}p^{02}v^{10}(30{,}000)\bar{a}^{22}_{60}=18{,}799\) |
| Second death in deferral | \(3P\,\bar{A}^{03}_{50:55:\overline{10}|}=3P(0.003421)=0.010263\,P\) |

**Equivalence:**

\[
P=302{,}627+9{,}078+18{,}799+0.010263\,P
\Rightarrow P=\dfrac{330{,}504}{0.989737}=\mathbf{333{,}931}
\]

---

### Part (d) — Reserves, Thiele, Euler (4 pts)

**(i) Policy values at \(t=10\):**

\[
{}_{10}V^{(0)}=572{,}924,\quad
{}_{10}V^{(1)}=30{,}000\,\bar{a}^{11}_{65}=305{,}844,\quad
{}_{10}V^{(2)}=30{,}000\,\bar{a}^{22}_{60}=354{,}906
\]

**(ii) Thiele for both alive, \(t\ge 10\)** (\(\delta=\ln 1.05\)):

\[
\frac{d}{dt}V^{(0)}
=\delta V^{(0)}-50{,}000
-\mu^{01}(V^{(1)}-V^{(0)})
-\mu^{02}(V^{(2)}-V^{(0)})
\]

**(iii) Euler \(h=0.5\).** At ages 60/65: \(\mu^{01}=0.009076\), \(\mu^{02}=0.015919\), \(\delta=\ln 1.05\approx 0.048790\).

\[
{}_{10.5}V^{(0)}
\approx V^{(0)}+h\bigl[\delta V^{(0)}-50{,}000-\mu^{01}(V^{(1)}-V^{(0)})-\mu^{02}(V^{(2)}-V^{(0)})\bigr]
=\mathbf{564{,}848}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Kolmogorov \(p^{00}\) | \(\dot p^{00}=-p^{00}(\mu^{01}+\mu^{02})\), \(p^{00}(0)=1\) |
| Benefit @10 both | \(50{,}000\bar{a}^{00}+30{,}000(\bar{a}^{01}+\bar{a}^{02})\) |
| Premium | \(P=\mathrm{EPV}_{\mathrm{ann}}+3P\bar{A}^{03}\) |
| Thiele both alive | \(\dot V^{(0)}=\delta V^{(0)}-50{,}000-\mu^{01}(V^{(1)}-V^{(0)})-\mu^{02}(V^{(2)}-V^{(0)})\) |
| Euler | \(V_{t+h}\approx V_t+h\cdot\dot V_t\) |

**Official targets:** benefit @10 = 572,924 (show 573,000); \(P=333{,}931\); \(V^{(0,1,2)}_{10}=572{,}924 / 305{,}844 / 354{,}906\); \({}_{10.5}V^{(0)}=564{,}848\).
