# ALTAM Sample Question 54 — Solution Script
*(Spring 2014 WA Q6 · 10 points)*

---

## 1. Problem restatement

**Product.** Type **B** UL, ADB **100,000**, age **60**. Policy charges/COI/SC table years 1–2; AV₂ (in force) = **1500**.

**PT:** dependent \(q^d,q^w\), earned **6%**, commissions/expenses by year; reserves = **AV**; hurdle **12%**. Given Pr₁=**−1206**, Pr₂=**374**, Pr₃=**400**.

**Parts.** (a) AV₁ ≈ **1300**. (b) NPV(3). (c) Redo Pr₂ with **CV** reserves; explain; effect on total PV of profits.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Account value end year 1

**How to say it in English.** Forty percent of five thousand, minus two hundred, minus six hundred COI, grown at five percent. (Use **policy** table, not PT commission table.)

\[
\mathrm{AV}_1=\bigl(0.4(5000)-200-600\bigr)(1.05)=\mathbf{1{,}290}
\]

**Answer to report:** show **1,300**.

---

### Part (b) — NPV(3) @ 12%

\[
{}_{1}p^{\tau}=0.8960,\quad {}_{2}p^{\tau}=0.8467
\]

\[
\mathrm{NPV}(3)=-1206+\frac{374}{1.12}(0.8960)+\frac{400}{1.12^{2}}(0.8467)=\mathbf{-568.6}
\]

---

### Part (c)(i) — Revised Pr₂ with CV reserves

Start reserve CV₁ = 1290 − 600 = **690**. Official revised Pr₂ = **−73.2**  
(with \(E=60\), \(I=97.8\), EDB \(=507.5\), ESV \(=65\), \(E[V_2]=1228.5\)).

---

### Part (c)(ii) — Why Pr₂ decreases

Opening CV much lower than AV → less interest on brought-forward reserve; end CV also lower but by less → year-2 surplus **falls**.

---

### Part (c)(iii) — Total PV of profits

**Increases:** smaller reserves release profit earlier; risk discount **12%** > earned **6%**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type B AV | \((P(1-e)-E-\mathrm{COI})(1+i_c)\) |
| NPV(3) | \(\mathrm{Pr}_1+\mathrm{Pr}_2 v\,{}_{1}p+\mathrm{Pr}_3 v^{2}\,{}_{2}p\) |
| CV reserve | \(\mathrm{AV}-\mathrm{SC}\) |

**Official targets:** AV₁ \(=1{,}290\); NPV(3)\(=-568.6\); revised Pr₂ \(=-73.2\); total NPV ↑.
