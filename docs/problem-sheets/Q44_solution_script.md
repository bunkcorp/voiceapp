# ALTAM Sample Question 44 — Solution Script
*(Fall 2020 WA Q6 · 8 points)*

---

## 1. Problem restatement

**Final-average DB:** 2% × YOS × final-year salary; monthly life annuity-due (no guarantee); NRA 65; salary +2.5%/year; \(i=5\%\); SULT; exit only death before 65; Woolhouse 2-term; **TUC**.

**Census 1/1/2020:**

| Age | N | Status | Pension | Salary 2019 | YOS |
|----:|--:|--------|--------:|------------:|----:|
| 35 | 20 | Active | — | 45,000 | 8 |
| 60 | 5 | Active | — | 62,000 | 25 |
| 70 | 1 | Retired | 32,000 | — | 30 |

**Parts:** (a) total AL; (b) NC as % of payroll; (c) NC rate after firing all age-35; (d) would PUC change be larger or smaller?

---

## 2–3. Part-by-part walkthrough

### Part (a) — Total actuarial liability (2 pts)

\[
\ddot{a}_{65}^{(12)}=13.5498-11/24=13.0915;\quad\ddot{a}_{70}^{(12)}=11.5500;\quad{}_{30}E_{35}=0.21981
\]

**How to say it in English.** Under traditional unit credit, each active group’s liability is current accrued annual pension times the deferred monthly annuity to sixty-five; the retiree is just pension times a monthly annuity at seventy.

\[
\begin{align*}
\mathrm{AL}_{35}&=20\times 8\times 45{,}000\times 0.02\times{}_{30}E_{35}\times\ddot{a}_{65}^{(12)}=20\times 20{,}719=414{,}380\\
\mathrm{AL}_{60}&=5\times 311{,}223=1{,}556{,}115\\
\mathrm{AL}_{70}&=32{,}000\times 11.5500=369{,}599
\end{align*}
\]

\[
\mathrm{AL}=\mathbf{2{,}340{,}094}
\]

---

### Part (b) — NC rate 2020 (3 pts)

TUC NC scales opening AL by salary growth and +1 year of service:

\[
\mathrm{NC}_{35}=414{,}380\Bigl(1.025\cdot\frac{9}{8}-1\Bigr)=63{,}452
\]

\[
\mathrm{NC}_{60}=1{,}556{,}111\Bigl(1.025\cdot\frac{26}{25}-1\Bigr)=102{,}704
\]

Payroll at valuation (next year’s salaries): \(1{,}240{,}250\).

\[
\mathrm{NC\ rate}=\dfrac{63{,}452+102{,}704}{1{,}240{,}250}=\mathbf{13.397\%}
\]

---

### Part (c) — After terminating age-35 group (1 pt)

\[
\dfrac{102{,}704}{317{,}750}=\mathbf{32.32\%}
\]

---

### Part (d) — PUC vs TUC change (2 pts)

Change would be **smaller** under PUC. PUC contribution rates by age are flatter (future raises already in AL); TUC rates rise steeply near retirement because NC must revalue all past service for the latest raise. Removing young members therefore moves the average NC rate less under PUC.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Active TUC AL | \(N\cdot s\cdot S\cdot\alpha\cdot{}_{n}E_x\,\ddot{a}_{65}^{(12)}\) |
| Retiree AL | \(\text{pension}\times\ddot{a}_{x}^{(12)}\) |
| TUC NC | \(\mathrm{AL}\bigl((1+g)(s+1)/s-1\bigr)\) |
| NC rate | \(\mathrm{NC}/\text{payroll}\) |

**Official targets:** AL **2,340,094**; NC rate **13.397%**; revised **32.32%**; PUC change **smaller**.
