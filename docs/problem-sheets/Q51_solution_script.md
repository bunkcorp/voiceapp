# ALTAM Sample Question 51 — Solution Script
*(Fall 2015 WA Q5 · 10 points)*

---

## 1. Problem restatement

**Product.** Type **B** UL, ADB **100,000**, \(i_c=0.06\), AV₁=**165**. Premiums \(kP\), COI rates, % charges, expenses, SC by year. No deaths/surrenders except as stated.

**Parts.** (a) If \(P_2=1000\), AV₂ ≈ **920**. (b) AV₃ = \(aP_2+bP_3+c\). (c) Random premiums: E[DB₃], E[SV₃]. (d) Twin misses year 3 or 10 equally likely; E[SV₁₀] given full AV₁₀=**5114**.

---

## 2–3. Part-by-part walkthrough

### Part (a) — AV₂ if \(P_2=1000\)

\[
\mathrm{AV}_2=\bigl(165+1000(0.9)-10-200\bigr)(1.06)=\mathbf{918.3}
\]

**Answer to report:** show **920**.

---

### Part (b) — Coefficients of AV₃

\[
\mathrm{AV}_3=1.0112\,P_2+0.954\,P_3-348.4
\]

so \(a=\mathbf{1.0112}\), \(b=\mathbf{0.954}\), \(c=\mathbf{-348.4}\).

---

### Part (c) — Expected DB₃ and SV₃

| \(P_2\) | \(P_3\) | AV₃ | DB₃ | SV₃ | Prob |
|--------:|--------:|-----:|-----:|-----:|-----:|
| 1000 | 1000 | 1616.8 | 101,616.8 | 1516.8 | 0.36 |
| 1000 | 200 | 853.6 | 100,853.6 | 753.6 | 0.24 |
| 200 | 1000 | 807.8 | 100,807.8 | 707.8 | 0.08 |
| 200 | 200 | 44.6 | 100,044.6 | **0** | 0.32 |

**How to say it in English.** Average the four outcomes; floor surrender at zero—don’t subtract SC from E[AV].

**Answers:** \(\mathbb{E}[\mathrm{DB}_3]=\mathbf{100{,}866}\); \(\mathbb{E}[\mathrm{SV}_3]=\mathbf{783.5}\).

---

### Part (d) — Expected SV₁₀

\[
\mathrm{AV}_{10}^{(3\text{ miss})}=5114-1000(0.9)(1.06)^8=3679.5
\]

\[
\mathrm{AV}_{10}^{(10\text{ miss})}=5114-1000(0.95)(1.06)=4107.0
\]

\[
\mathbb{E}[\mathrm{SV}_{10}]=0.5(3679.5+4107.0)=\mathbf{3893.3}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type B AV | \((\mathrm{AV}_{t-1}+P(1-e)-E-\mathrm{COI})(1+i_c)\) |
| DB | \(\mathrm{ADB}+\mathrm{AV}\) |
| SV | \(\max(\mathrm{AV}-\mathrm{SC},0)\) |

**Official targets:** AV₂ \(=918.3\); \((a,b,c)=(1.0112,0.954,-348.4)\); E[DB₃]\(=100{,}866\); E[SV₃]\(=783.5\); E[SV₁₀]\(=3893.3\).
