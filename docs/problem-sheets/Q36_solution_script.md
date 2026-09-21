# ALTAM Sample Question 36 — Solution Script
*(Spring 2022 WA Q6 · 8 points · FAM-L covers parts (a) and (d))*

---

## 1. Problem restatement

**INA** for lives 80+ entering LTCFs: SP annuity-due or SP **2-year deferred** annuity-due. Payments to care home.

**(a)** Select & ultimate mortality (1-year select).  
**(b)** Profit test for newly admitted (95): prem 110,000; ann 50,000 due; pre-exp 300; 100/payment; \(V_0=0\), \(V_1=105{,}000\), \(V_2=80{,}000\); earn 7%; hurdle 12%.  
**(c)** Deferred, \(V_1=54{,}900\); same profit margin.  
**(d)** Buyer advantage/disadvantage at prem 28,500.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Select mortality (2 pts)

**(i)** Entered at 95: \(q_{[95]}=1-550/1000=\mathbf{0.45}\).  
**(ii)** Entered at 94: \(q_{95}=1-550/700=\mathbf{0.2143}\).  
**(iii)** Life-insurance select tables have *lighter* select \(q\) (underwriting). Here select mortality is **heavier** than ultimate (frailer lives just entering LTCF).

---

### Part (b) — Table, NPV, margin (4 pts)

**(i) Missing rows:**

| \(t\) | \(V_{t-1}\) | Prem | Ann | Exp | Int | \(E[V_t]\) | \(\mathrm{Pr}_t\) |
|------:|------------:|-----:|----:|----:|---:|----------:|------------------:|
| 0 | — | — | — | 300 | — | — | **−300** |
| 1 | 0 | 110,000 | 50,000 | 100 | **4,193** | **57,750** | **6,343** |
| 2 | 105,000 | — | 50,000 | 100 | **3,843** | **56,000** | **2,743** |

**(ii)** \(\Pi=(-300;6343;1509;130;82)\); rolling NPV → \(\mathbf{6{,}711}\) → show **6,710**.

**(iii)** Margin \(6711/110{,}000=\mathbf{0.0610}\) (6.1%).

---

### Part (c) — Deferred premium (3 pts)

**How to say it in English.** Keep the six-point-one percent margin by replacing year-one profit with \(1.07P-30{,}195\) and solving for \(P\).

Official: \(\mathbf{P=28{,}973}\).

---

### Part (d) — Buyer view (1 pt)

**Advantage:** lower early outlay / more for bequest if early death.  
**Disadvantage:** higher total cost if survive deferral; early death forfeits premium with no payments.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Select \(q_{[x]}\) | \(1-l_{x+1}/l_{[x]}\) |
| Ultimate \(q_x\) | \(1-l_{x+1}/l_x\) |
| Profit | \((V+\text{prem}-\text{ann}-\text{exp})(1+i)-E[V_{+1}]\) |
| Margin | \(\mathrm{NPV}/\text{single premium}\) |

**Official targets:** \(q_{[95]}=0.45\); \(q_{95}=0.2143\); \(\mathrm{Pr}_1=6343\); \(\mathrm{Pr}_2=2743\); NPV 6711 (6710); margin 6.1%; deferred \(P=28{,}973\).
