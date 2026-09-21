# ALTAM Sample Question 40 — Solution Script
*(8 points · PUC / TUC funding)*

---

## 1. Problem restatement

**Member at 12/31/2015:** age **55**, **25** YOS, 2015 salary **50,000**. Accrual **1.6%** of 3-year FAS × YOS; monthly life annuity at retirement.

**Assumptions:** Standard Service Table exits (all remaining retire at 61); retirements at exact 60; mid-year exits 60→61 retire at 61; post-retirement SULT; Woolhouse 2-term; 3% salary growth; contributions 1 Jan; \(i=0.05\); no death/disability benefits before 60.

**Parts:** (a) DB vs DC; (b) PUC AAL + NC; (c) TUC AAL + NC; (d) why PUC NC < TUC NC near retirement.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Plan type (1 pt)

**Defined Benefit.** DC specifies contribution % into an account; retirement income depends on investment experience (may miss a target benefit).

---

### Part (b) — PUC (3 pts)

Woolhouse: \(\ddot{a}_{60}^{(12)}=14.4458\), \(\ddot{a}_{61}^{(12)}=14.1908\).

Projected FAS: at 60 → **56,292**; at 61 → **57,981**.

With service 25: PB60 = **22,517**; PB61 = **23,192**.

**How to say it in English.** PUC liability is the present value of the benefit projected with future salary growth but credited only for service already earned, weighted by retirement at 60 versus 61.

**(i) AAL at 12/31/2015:**

\[
\mathrm{AAL}=\mathrm{PB}_{60}\,\ddot{a}_{60}^{(12)}\,v^5\frac{r_{60}^{\mathrm{exact}}+r_{60}^{\mathrm{during}}}{l_{55}^{(\tau)}}+\mathrm{PB}_{61}\,\ddot{a}_{61}^{(12)}\,v^6\frac{r_{61}}{l_{55}^{(\tau)}}
\]

Official: \(\mathbf{220{,}351}\) → show **220,000**.

**(ii) NC 2016:** recompute AAL at 12/31/2016 with service 26 → AAL = **246,221**. Mid-year exit benefits = 0.

\[
\mathrm{AAL}_{2015}+\mathrm{NC}=v\,{}_1p_{55}^{(\tau)}\,\mathrm{AAL}_{2016}\Rightarrow\mathrm{NC}=\mathbf{8{,}815}
\]

---

### Part (c) — TUC (3 pts)

Accrued benefit uses *current* FAS (past salaries): \(B_{55}=\mathbf{19{,}423}\).

**(i) AAL:** same retirement weights, benefit \(B_{55}\) → \(\mathbf{186{,}248}\) → show **186,000**.

**(ii)** Next year accrued \(B_{56}=\mathbf{20{,}806}\); AAL\(_{2016}=\mathbf{214{,}358}\); NC = \(\mathbf{13{,}262}\).

---

### Part (d) — Why PUC NC < TUC near retirement (1 pt)

TUC does not pre-fund future salary increases on past accruals; each year NC must buy the new year of service *and* revalue all past service for the latest raise. PUC already projects salaries in the opening AAL, so NC mainly buys one more year of service — a flatter, usually lower NC near retirement.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Woolhouse | \(\ddot{a}^{(12)}\approx\ddot{a}-11/24\) |
| PUC benefit | \(0.016\times\mathrm{FAS}_{\mathrm{proj}}\times\text{past service}\) |
| TUC benefit | \(0.016\times\mathrm{FAS}_{\mathrm{current}}\times\text{past service}\) |
| NC recursion | \(V_t+C=v\,p^{(\tau)}V_{t+1}\) (no mid-year benefits here) |

**Official targets:** PUC AAL **220,351** (show 220,000); PUC NC **8,815**; TUC AAL **186,248** (show 186,000); TUC NC **13,262**.
