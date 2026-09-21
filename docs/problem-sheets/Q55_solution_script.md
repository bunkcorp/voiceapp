# ALTAM Sample Question 55 — Solution Script
*(Equity-linked GMDB/GMMB stress test · multi-part · Excel-friendly WA)*

---

## 1. Problem restatement

**Product.** 3-year equity-linked to \((x)\): single premium **5000** + policy fee **350**; 100% of premium in separate account; management charge **2.5%** of fund at start of each year (incl. first). GMDB and GMMB = **100%** of initial premium (ex fee).

**Stress returns:** −14%, −5%, +4%. Pre-contract **200**; renewal **30** years 2–3; fund mgmt expenses 2%/1%/1% of fund before MC; \(q_{x+t}=0.05+0.01t\); no lapses; insurer earn **5%**; no guarantee reserve; hurdle **10%**.

**Parts.** (a) Fund at \(t=3\) ≈ **3940**. (b) Profit vector. (c) NPV ≈ **−600**. (d) 3-year put price **0.136**/unit. (e) Hedge cost GMDB+GMMB ≈ **665**. (f) NPV if hedge purchased for 665. (g) Advantage/disadvantage of hedging.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Projected fund at time 3 (show)

**Intuition.** Each year: deduct MC = 2.5% of \(F_t\), then apply market return \(R_{t+1}\) to the residual.

**How to say it in English.** Take two-and-a-half percent off the fund, then multiply what’s left by one plus that year’s return.

**Official path:**

| \(t\) | \(F_t\) | \(\mathrm{MC}_t\) | \(F_{t+1}\) |
|------:|--------:|------------------:|------------:|
| 0 | 5000.0 | 125.0 | 4192.5 |
| 1 | 4192.5 | 104.8 | 3883.3 |
| 2 | 3883.3 | 97.1 | **3937.7** |

**Answer to report:** \(F_3=\mathbf{3937.7}\) → show **3940** (nearest 10).

---

### Part (b) — Profit vector

**Intuition.** Income = MC (+350 fee in year 1). Expenses = pre-contract / fund mgmt % / renewals. Interest 5% on (income−expenses). EDB = \(q(5000-F)^+\); EMB only year 3 on survivors.

**Official table:**

| \(t\) | Income | Expenses | Interest | EDB | EMB | \(\mathrm{Pr}_t\) |
|------:|-------:|---------:|---------:|----:|----:|------------------:|
| 0* | — | 200.0 | — | — | — | **−200.0** |
| 1 | 475.0 | 100.0 | 18.8 | 40.4 | — | **353.4** |
| 2 | 104.8 | 71.9 | 1.6 | 67.0 | — | **−32.5** |
| 3 | 97.1 | 68.8 | 1.4 | 74.4 | 988.0 | **−1032.7** |

---

### Part (c) — NPV under stress test

**Signature / partial NPV @ 10%:**

| \(t\) | \(\mathrm{Pr}_t\) | \({}_{t-1}p_x\) | \(\Pi_t\) | NPV(\(t\)) |
|------:|------------------:|----------------:|----------:|-----------:|
| 0 | −200.0 | — | −200.0 | −200 |
| 1 | 353.4 | 1 | 353.4 | 121.2 |
| 2 | −32.5 | 0.95 | −30.8 | 95.8 |
| 3 | −1032.7 | 0.893 | −922.2 | **−597.1** |

**Answer to report:** \(\mathrm{NPV}=\mathbf{-597.1}\) → show **−600** (nearest 10).

---

### Part (d) — Black–Scholes put per unit of premium

**Intuition.** Put on managed fund with expense factor \(\xi=(1-0.025)^3\), \(k=1\), \(r=0.04\), \(\sigma=0.25\), \(T=3\).

**Official:**

\[
\xi=0.92686,\quad
d_1=-0.318228,\quad
d_2=-0.750955
\]

\[
\mathrm{BSP}=e^{-0.12}\Phi(-d_2)-\xi\Phi(-d_1)=\mathbf{0.13627}
\]

**Answer to report:** show **0.136** (nearest 0.001).

---

### Part (e) — Total hedge cost at issue

**GMDB:** mix 1- and 2-year puts with dependent death probs:

\[
q_x=0.05,\ {}_1|q_x=0.06\times 0.95=0.057;\quad
0.05(446.7)+0.057(590.8)+(\cdots)=98.60
\]

*(SOA packs as 98.60 including the year-3 GMDB put piece with BSP 0.13627.)*

**GMMB:** \({}_{3}p_x\times 5000\times 0.13627=565.85\).

**Total:** \(98.60+565.85=\mathbf{664.45}\) → show **665** (nearest 5).

---

### Part (f) — NPV with hedge purchased

Options cost **665** loaded into year-1 expenses → year-1 profit becomes **−304.5**; years 2–3 lose guarantee claims (EDB/EMB ≈ 0 in table).

\[
\mathrm{NPV}=-200-\frac{304.5}{1.1}+\frac{34.5}{1.1^{2}}\,{}_{1}p+\frac{29.7}{1.1^{3}}\,{}_{2}p=\mathbf{-429.8}
\]

**Answer to report:** \(\mathbf{-429.8}\).

---

### Part (g) — Advantage / disadvantage

- **Advantage:** Caps downside—replaces large uncertain guarantee losses with a **certain** option premium.
- **Disadvantage:** Hedge cost is large vs fee+net MC income (~550 optimistic); guarantees are underpriced relative to hedge cost.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Fund roll | \(F_{t+1}=(F_t-\mathrm{MC}_t)(1+R_{t+1})\), \(\mathrm{MC}=0.025F_t\) |
| Guarantee claim | \(\max(5000-F,0)\) on death/maturity |
| BS put | \(e^{-rT}K\Phi(-d_2)-\xi S\Phi(-d_1)\) |
| Hedge NPV | Same PT with option cost in expenses, claims ≈ 0 |

**Official targets:** \(F_3=3937.7\); NPV \(=-597.1\); BSP \(=0.13627\); hedge cost \(664.45\); hedged NPV \(=-429.8\).
