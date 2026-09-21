# ALTAM Sample Question 31 — Solution Script
*(Spring 2020 WA Q5 · 10 points · FAM-L covers part (a))*

---

## 1. Problem restatement

**Product.** Single premium **whole life annuity-immediate**, annually, with a **10-year guarantee**, to B age **65**. Single premium **100,000**.

**Basis:** SULT; \(i=0.05\); commission **2,000**; other acquisition **500**; maintenance **25**/year with payments; equivalence principle.

**Profit test states:** 0 = payments in force, alive; 1 = payments in force, dead; 2 = payments ceased, dead. Fund interest **6%**; reserves = gross premium policy values.

**Parts:** (a) \(B\); (b) \(p_{73}^{01,02,12}\); (c) \(V_8^{(0)}\); (d) \(V_8^{(1)}\); (e) \(\mathrm{Pr}_9^{(0)}\), \(\mathrm{Pr}_9^{(1)}\), \(\pi_9\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Annuity payment \(B\) (2 pts)

**Intuition.** Equivalence: premium buys issue expenses plus EPV of \(B+25\) under guarantee then for life.

**How to say it in English.** One hundred thousand must cover twenty-five hundred of issue costs plus the expected present value of the annuity payment and twenty-five of maintenance each year for life with a ten-year certain period.

**Formulas:**

\[
2500+(B+25)\,a_{65:\overline{10}|}=100{,}000,\quad
a_{65:\overline{10}|}=a_{\overline{10}|}+{}_{10}E_{65}\,a_{75}
\]

**Plug-in:**

\[
a_{65:\overline{10}|}=7.72173+(0.55305)(9.3178)=12.87494
\]

\[
B=\dfrac{100{,}000-2500-25(12.87494)}{12.87494}=\mathbf{7{,}547.848}
\]

**Answer to report:** show **7,550** (nearest 10). Keep \(B=7{,}547.848\).

---

### Part (b) — Transitions at 73 (1 pt)

Still inside the 10-year guarantee → states 0 and 1 only.

- (i) \(p_{73}^{01}=q_{73}=\mathbf{0.014664}\)
- (ii) \(p_{73}^{02}=\mathbf{0}\)
- (iii) \(p_{73}^{12}=\mathbf{0}\)

---

### Part (c) — \(V_8^{(0)}\) (2 pts)

Two guarantee years left, then life from 75; annuitant alive.

\[
a_{73:\overline{2}|}=1.85941+(0.879036)(9.3178)=10.050091
\]

\[
V_8^{(0)}=(7547.848+25)(10.050091)=\mathbf{76{,}107.81}
\]

**Answer to report:** show **76,100**.

---

### Part (d) — \(V_8^{(1)}\) (1 pt)

Dead but guarantee still running → only 2 certain payments left.

\[
V_8^{(1)}=(7547.848+25)(1.85941)=\mathbf{14{,}081.03}
\]

**Answer to report:** show **14,100**.

---

### Part (e) — Profits and \(\pi_9\) (4 pts)

Interest spread only (\(i^*=6\%\) vs pricing \(5\%\)):

\[
\mathrm{Pr}_9^{(0)}=76107.81(0.01)=\mathbf{761.08}\quad\text{(show 760)}
\]

\[
\mathrm{Pr}_9^{(1)}=14081.03(0.01)=\mathbf{140.81}\quad\text{(show 140)}
\]

\[
\pi_9=(0.9295525)(761.08)+(0.0704475)(140.81)=\mathbf{717.38}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Equivalence | \(2500+(B+25)a_{65:\overline{10}|}=100{,}000\) |
| \(V_8^{(0)}\) | \((B+25)a_{73:\overline{2}|}\) |
| \(V_8^{(1)}\) | \((B+25)a_{\overline{2}|}\) |
| Interest profit | \(\mathrm{Pr}=V(i^*-i)\) |
| \(\pi_9\) | \({}_8p_{65}\mathrm{Pr}_9^{(0)}+(1-{}_8p_{65})\mathrm{Pr}_9^{(1)}\) |

**Official targets:** \(B=7547.848\) (show 7550); \(p_{73}^{01}=0.014664\); \(p_{73}^{02}=p_{73}^{12}=0\); \(V_8^{(0)}=76107.81\) (show 76100); \(V_8^{(1)}=14081.03\) (show 14100); \(\mathrm{Pr}_9^{(0)}=761.08\); \(\mathrm{Pr}_9^{(1)}=140.81\); \(\pi_9=717.38\).
