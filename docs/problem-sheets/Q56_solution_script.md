# ALTAM Sample Question 56 — Solution Script
*(10-year equity-linked GMMB / Black–Scholes hedge)*

---

## 1. Problem restatement

**Product.** 10-year equity-linked to \((x)\): GMMB = **100%** of single premium \(P\). Initial expense charge **5%**; monthly management charge **0.2%** of fund if alive. No exits other than death. \(S_t\) GBM with \(S_0=1\); \(\mathrm{BSP}(K)\) = Black–Scholes put formula.

**Parts.** (a) Show risk-neutral GMMB value \(\pi(0)={}_{10}p_x\,P\,\xi\,\mathrm{BSP}(K^*)\); define \(\xi,K^*\). (b) With \(\sigma=0.25\), \(x=60\), \(P=100{,}000\), SULT, \(r=0.04\), show \(\pi(0)\approx 17{,}100\). (c) Hedge value after 1 month if assets −3% (no rebalance). (d) Monthly deduction rate given \(\ddot{a}_{60:\overline{10}|}^{(12)}=8.679\) at \(\delta=2.40\%\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Risk-neutral GMMB representation

**Intuition.** Payoff at \(T=10\) is \(\max(kP-F_{10},0)\) if alive. Independence of \(T_x\) and fund + same mortality under \(Q\) and \(P\) factors out survival probability.

**How to say it in English.** The guarantee is a put on the managed fund, paid only if the life survives ten years—so multiply the Black–Scholes put by the survival probability.

**Fund after charges:**

\[
F_t=P(0.95)\,(0.998)^{12t}\,S_t=P\,\xi_t\,S_t
\]

At \(t=10\): \(\xi=(0.95)(0.998)^{120}=\mathbf{0.74730}\), and strike on the index is

\[
K^*=\frac{k}{\xi}=\frac{1}{\xi}\quad(k=1).
\]

Then

\[
\pi(0)={}_{10}p_x\,P\,\xi\,\mathrm{BSP}(K^*)
\]

as required.

---

### Part (b) — Numerical \(\pi(0)\)

**Official:**

\[
{}_{10}p_{60}=0.94255,\quad \xi=0.747230,\quad P=100{,}000
\]

\[
d_1=-0.25778,\quad d_2=-0.53279
\]

\[
\pi(0)=0.94255\times 100{,}000\times 0.181325=\mathbf{17{,}091}
\]

**Answer to report:** show **17,100** (nearest 100).

---

### Part (c) — Hedge after one month (−3% assets)

**Intuition.** BS put hedge = long bonds + short stock. Roll one month without rebalancing.

**Official at \(t=0\):**
- Bond part: \({}_{10}p_{60}\,P\,e^{-0.4}\Phi(-d_2)=\mathbf{38{,}017}\)
- Stock part: \(-{}_{10}p_{60}\,P\,\xi\,\Phi(-d_1)=\mathbf{-20{,}926}\)

After one month:
- Bond: \(38{,}017\,e^{0.04/12}=\mathbf{38{,}144}\)
- Stock: \(-20{,}926\times 0.97=\mathbf{-20{,}298}\)

**Total before rebalancing:** \(\mathbf{17{,}846}\).

---

### Part (d) — Monthly management-charge funding rate

**Intuition.** Equate option cost 17,091 to EPV of continuous-style deductions at annual rate \(c\) from the managed fund (monthly), under risk-neutral measure → proportional to \(\ddot{a}_{60:\overline{10}|}^{(12)}\) at force related to \(r-m\).

**Official:**

\[
17{,}091=0.95\,P\cdot c\cdot\ddot{a}_{60:\overline{10}|}^{(12)}
\quad\text{at }i^{(12)}\text{ equiv. to }\delta=2.4\%
\]

\[
c=\frac{17{,}091}{0.95\times 100{,}000\times 8.679}=\mathbf{0.0207}\text{ per year}
\]

**Monthly deduction rate:** \(0.0207/12=\mathbf{0.0017}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Managed \(\xi\) | \(\xi=0.95(0.998)^{120}\) |
| GMMB RN value | \(\pi(0)={}_{10}p_x P\xi\,\mathrm{BSP}(1/\xi)\) |
| Hedge | Bond \(+\) stock BS Greeks × notional |
| Charge solve | \(\pi(0)=0.95 P\,c\,\ddot{a}^{(12)}\) |

**Official targets:** \(\xi=0.74730\); \(\pi(0)=17{,}091\); hedge after 1m \(=17{,}846\); monthly rate \(0.0017\).
