# ALTAM Sample Question 48 — Solution Script
*(Spring 2022 WA Q5 · 9 points)*

---

## 1. Problem restatement

**Product.** FAS DB for **B**: age **63** on 1 Jan 2022, **12** years service, salary **72,100** (2021: **70,000**).
- Benefit **1.6%** of FAS × service; FAS = salary in 12 months before retirement.
- Early reduction **0.4%** per month before **65**.
- **PUC**, salary +**3%** each Jan 1, mid-year early retirements, Standard Service Table, \(i=0.05\), \(\ddot{a}_{63.5}^{(12)}=13.5139\).
- Given projected AL 1 Jan 2023 if employed: **191,309**.

**Parts.** (a) Mid-2022 retirement EPV and EPV of 2022 mid-year exits. (b) AL and NC at 1 Jan 2022. (c) TUC vs PUC qualitative. (d) 2022 gain/loss if B retires 1 Jan 2023.

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — EPV at age 63.5

**How to say it in English.** Twelve-point-five years times one-point-six percent times seventy-one thousand fifty, times one minus eighteen months of zero-point-four percent reduction, times the monthly annuity.

**Formulas:**

\[
\mathrm{FAS}_{63.5}=0.5(72{,}100)+0.5(70{,}000)=71{,}050
\]

\[
\mathrm{EPV}=12.5\times 0.016\times 71{,}050\times(1-18\times 0.004)\times 13.5139=\mathbf{178{,}206.18}
\]

**Answer to report:** show **178,200**.

---

### Part (a)(ii) — EPV of mid-year 2022 exits

\[
\frac{4{,}515.2}{47{,}579.3}\,1.05^{-0.5}(178{,}206.18)=\mathbf{16{,}503.92}
\]

**Answer to report:** show **16,500**.

---

### Part (b)(i) — AL at 1 Jan 2022

\[
\mathrm{AL}=\frac{12}{12.5}(16{,}503.92)+\frac{12}{13}\,1.05^{-1}\frac{42{,}805.0}{47{,}579.3}(191{,}309)=\mathbf{167{,}151.26}
\]

**Answer to report:** show **167,150**.

---

### Part (b)(ii) — Normal cost

\[
\mathrm{NC}=16{,}503.92+191{,}309\cdot\frac{42{,}805.0}{47{,}579.3}\cdot 1.05^{-1}-167{,}151.26=\mathbf{13{,}269.11}
\]

*(Same as \(\frac{0.5}{12.5}(16{,}503.92)+\frac{1}{13}v\frac{l_{64}}{l_{63}}(191{,}309)\).)*

---

### Part (c) — TUC vs PUC

**(i)** TUC AL is **smaller** (uses current FAS, not projected; salaries rising).  
**(ii)** Near retirement, TUC NC is **larger** (TUC NC crosses above PUC NC late in career).

---

### Part (d) — Gain/loss 2022

\[
(167{,}151.26+13{,}269.11)(1.051)=189{,}621.81
\]

\[
13\times 0.016\times 72{,}100\times(1-12\times 0.004)\times 13.3735=190{,}932.84
\]

\[
189{,}621.81-190{,}932.84=\mathbf{-1{,}311.03}\quad\text{(loss)}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Mid-year EPV | \(n_{\text{mid}}\alpha\,\mathrm{FAS}(1-m\cdot 0.004)\ddot{a}^{(12)}\) |
| Exit EPV@val | \((r_x/l_x)v^{0.5}\mathrm{EPV}_{\text{mid}}\) |
| PUC AL | \(\frac{n}{n+0.5}\mathrm{EPV}_{\text{exit}}+\frac{n}{n+1}v\frac{l_{x+1}}{l_x}\mathrm{AL}_{+1}\) |
| NC | \(\mathrm{EPV}_{\text{exit}}+v\frac{l_{x+1}}{l_x}\mathrm{AL}_{+1}-\mathrm{AL}\) |
| Gain/loss | \((\mathrm{AL}+\mathrm{NC})(1+i_{\text{earn}})-\mathrm{AL}_{\text{actual}}\) |

**Official targets:** EPV mid \(=178{,}206.18\); exit EPV \(=16{,}503.92\); AL \(=167{,}151.26\); NC \(=13{,}269.11\); loss \(1{,}311\).
