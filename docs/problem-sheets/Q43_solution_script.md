# ALTAM Sample Question 43 — Solution Script
*(Spring 2020 WA Q6 · 8 points)*

---

## 1. Problem restatement

**Final-salary DB:** 2% × YOS × final one-year salary; monthly WL annuity-due. X age **40** on 1/1/2020, **20** YOS, last-year salary **110,000**. Retire all at 65; death only other exit; SULT; \(i=0.05\); salary +3% to age 54 incl., +2.5% from 55; Woolhouse 2-term; **PUC**.

**Enhancement (b):** 50% reversionary partner annuity *or* +5% pension if single; 90% have same-age partners; independent lives.

**Parts:** (a) AL + NC rate; (b) revised AL + NC rate; (c) effect of positive lifetime correlation on reversionary EPV.

---

## 2–3. Part-by-part walkthrough

### Part (a) — PUC AL and NC rate (3 pts)

**FAS** (salary age 64→65):

\[
\mathrm{FAS}=110{,}000(1.03)^{14}(1.025)^{10}=110{,}000(1.557967)(1.2800845)=\mathbf{219{,}376.23}
\]

\[
{}_{25}E_{40}={}_{20}E_{40}\,{}_{5}E_{60}=(0.36663)(0.76687)=0.281158
\]

\[
\ddot{a}_{65}^{(12)}=13.5498-11/24=13.09147
\]

**How to say it in English.** Projected unit credit liability is twenty years of accrual on projected final salary, discounted twenty-five years to retirement, times the monthly life annuity.

**(i)**

\[
\mathrm{AL}=219{,}376.23(0.02)(20)(0.281158)(13.09147)=\mathbf{322{,}989.50}
\]

→ show **323,000**.

**(ii)** Under PUC with only service increasing one year, \(\mathrm{NC}=\mathrm{AL}/20=16{,}149.48\).

\[
\mathrm{NC\ rate}=\dfrac{16{,}149.48}{110{,}000\cdot 1.03}=\mathbf{0.142537}\ (14.25\%)
\]

---

### Part (b) — Enhanced benefits (4 pts)

Per unit FAS at 65:

- With partner: \(\ddot{a}_{65}^{(12)}+0.5\,\ddot{a}_{65|65}^{(12)}=13.09147+0.93335=14.02482\)
  where \(\ddot{a}_{65|65}^{(12)}=(\ddot{a}_{65}-11/24)-(\ddot{a}_{65:65}-11/24)=1.8667\)
- Single: \(1.05\,\ddot{a}_{65}^{(12)}=13.74604\)

Mix: \(0.9(14.02482)+0.1(13.74604)=13.99694\).

**(i)** \(\mathrm{AL}=219{,}376.23(0.02)(20)(0.281158)(13.99694)=\mathbf{345{,}329.04}\)

**(ii)** \(\mathrm{NC}=345{,}329.04/20=17{,}266.45\); rate \(=17{,}266.45/(110{,}000\cdot 1.03)=\mathbf{0.1524}\).

---

### Part (c) — Positive correlation (1 pt)

EPV of reversionary partner benefits **decreases**.  
Since \(\ddot{a}_{x|y}=\ddot{a}_y-\ddot{a}_{x:y}\), and positive dependence raises the joint-life annuity \(\ddot{a}_{x:y}\), the reversionary factor falls (e.g. broken-heart effect).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| PUC AL | \(\mathrm{FAS}\cdot\alpha\cdot s\cdot{}_{n}E_x\,\ddot{a}_{65}^{(12)}\) |
| NC (service only) | \(\mathrm{AL}/s\) |
| NC rate | \(\mathrm{NC}/S_{\mathrm{next}}\) |
| Reversionary | \(\ddot{a}_{x|y}^{(12)}=\ddot{a}_y^{(12)}-\ddot{a}_{x:y}^{(12)}\) |
| Mixed EPV | \(0.9(\ddot{a}+0.5\ddot{a}_{rev})+0.1(1.05\ddot{a})\) |

**Official targets:** AL **322,989.50** (323,000); NC rate **0.142537**; enhanced AL **345,329.04**; enhanced NC rate **0.1524**; reversionary EPV **decreases**.
