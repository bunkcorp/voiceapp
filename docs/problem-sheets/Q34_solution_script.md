# ALTAM Sample Question 34 — Solution Script
*(Fall 2021 Form A WA Q2 · 10 points)*

---

## 1. Problem restatement

**Product.** Two-year term; SI **1,000,000**; annual premiums. Reserves \(V_0=V_1=0\).

**Profit test:** pre-contract UW **3,000**; commissions 20%/5% (extra 15% pre-contract); maintenance **100**/year-start; earn **7%**; \(q_{x+t}=0.05+0.05t\); 10% of survivors lapse end year 1; no CV; \(\mathrm{Pr}_1=31{,}213\) given; \(P=80{,}000\); risk discount **20%**.

**Parts:** Pr₀, Pr₂, signature, NPV, IRR, NPV-vs-IRR narrative, NPV at 15% lapse, lapse-supported risk.

---

## 2–3. Part-by-part walkthrough

### Part (a) — \(\mathrm{Pr}_0\) (1 pt)

**Intuition.** Only pre-contract cash: UW plus extra first-year commission. No reserve.

**Formula / plug-in:** \(\mathrm{Pr}_0=-3000-0.15(80{,}000)=\mathbf{-15{,}000}\).

---

### Part (b) — \(\mathrm{Pr}_2\) (2 pts)

**How to say it in English.** Emerging profit in year two is ninety-five percent of premium minus one hundred, rolled at seven percent, minus the expected one-million claim.

\[
\mathrm{Pr}_2=(0.95P-100)(1.07)-1{,}000{,}000\cdot 0.10=81{,}213-100{,}000=\mathbf{-18{,}787}
\]

*(Survival probabilities go in the signature, not here.)*

---

### Part (c) — Profit signature (1 pt)

\[
{}_1p_x^{(\tau)}=(1-0.05)(0.9)=0.855
\]

\[
\Pi=(-15{,}000;\ 31{,}213;\ -18{,}787\times 0.855)=(-15{,}000;\ 31{,}213;\ \mathbf{-16{,}062.885})
\]

---

### Part (d) — NPV @ 20% (1 pt)

\[
\mathrm{NPV}=-15{,}000+\frac{31{,}213}{1.2}-\frac{16{,}062.885}{1.2^2}=\mathbf{-143.95}
\]

→ nearest 1: **−144**.

---

### Part (e) — IRR (1 pt)

Solve \(-15{,}000+31{,}213v_j-16{,}062.885v_j^2=0\) → positive root \(\mathbf{14.83\%}\).

---

### Part (f) — Positive IRR, negative NPV (1 pt)

NPV uses a **20%** hurdle; IRR is only **14.83%**. At 20%, discounted later profits do not cover the large negative \(\mathrm{Pr}_0\). NPV is positive for rates below the IRR.

---

### Part (g) — NPV if lapse = 15% (2 pts)

\[
\Pi_2=-18{,}787(1-0.05)(0.85)=-15{,}170.50
\]

\[
\mathrm{NPV}=-15{,}000+26{,}010.83-10{,}535.07=\mathbf{475.76}
\]

---

### Part (h) — Lapse-supported risk (1 pt)

Lapse rates are less predictable than mortality. A contract that only profits if people lapse is exposed if persistency is higher than assumed; third-party markets make rational policyholders less willing to lapse valuable policies.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| \(\mathrm{Pr}_0\) | \(-E_{\mathrm{pre}}-0.15P\) |
| \(\mathrm{Pr}_2\) | \((0.95P-100)(1.07)-Sq_{x+1}\) |
| \(\Pi_2\) | \(\mathrm{Pr}_2(1-q)(1-w)\) |
| NPV / IRR | \(\sum\Pi_t v^t\); root of NPV\((j)=0\) |

**Official targets:** \(\mathrm{Pr}_0=-15{,}000\); \(\mathrm{Pr}_2=-18{,}787\); \(\Pi=(-15{,}000;31{,}213;-16{,}062.885)\); NPV \(-143.95\) (−144); IRR \(14.83\%\); NPV@15% lapse \(475.76\).
