# ALTAM Sample Question 52 — Solution Script
*(Spring 2015 WA Q6 · 9 points)*

---

## 1. Problem restatement

**Product.** Type **B** UL (DB = **100,000 + AV**), age **50**, year-1 premium **2500**, 5% charge, COI **5**/1000, expense **30**, SC **10.8% of AV**, \(i_c=0.06\).

**PT:** pre-contract **200**; maint **120**/yr; surrender exp **100**; death exp **200**; \(q_{50}=0.004\); 10% surrender end year 1; earned **11%**; hurdle **14%**. Full NPV = **2000**.

**Parts.** (a) CV₁ ≈ **400**. (b) Pr₁ ≈ **400**. (c) NPV(1). (d) Revised NPV if surrender **20%**.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Cash value end year 1

\[
\mathrm{AV}_1=\bigl(2500(0.95)-500-30\bigr)(1.06)=1985.70
\]

\[
\mathrm{CV}_1=0.892\times 1985.70=\mathbf{397.1}
\]

**Answer to report:** show **400**.

---

### Part (b) — Expected profit end year 1

**How to say it in English.** Premium minus maintenance grown at eleven percent, minus expected death, surrender, and continuing account costs.

\[
\mathrm{EDB}=0.004(100{,}000+1985.70+200)=408.7
\]

\[
\mathrm{ESV}=0.1(0.996)(397.1+100)=49.5,\quad
\mathrm{EAV}=0.996(0.9)(1985.70)=1780.0
\]

\[
\mathrm{Pr}_1=(2500-120)(1.11)-408.7-49.5-1780.0=\mathbf{403.6}
\]

**Answer to report:** show **400**.

---

### Part (c) — NPV(1)

\[
\mathrm{NPV}(1)=-200+\frac{403.6}{1.14}=\mathbf{154}
\]

---

### Part (d) — Revised NPV at 20% surrender

\[
\mathrm{Pr}_1^*=551.9
\]

\[
\mathrm{NPV}^*=-200+\frac{551.9}{1.14}+\frac{0.8}{0.9}\Bigl(2000+200-\frac{403.6}{1.14}\Bigr)=\mathbf{1925}
\]

*(Higher \(w\) changes Pr₁ and scales all later signature terms by 0.8/0.9.)*

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| CV | \((1-s)\mathrm{AV}\) |
| Pr₁ | \((P-E)(1+i_e)-\mathrm{EDB}-\mathrm{ESV}-\mathrm{EAV}\) |
| Surrender shock | Rescale \({}_{t}p\) for \(t\ge 1\) by new \((1-w)\) |

**Official targets:** CV₁ \(=397.1\); Pr₁ \(=403.6\); NPV(1)\(=154\); revised NPV \(=1925\).
