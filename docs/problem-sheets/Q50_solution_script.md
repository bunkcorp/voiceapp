# ALTAM Sample Question 50 — Solution Script
*(Spring 2017 WA Q3 · 8 points)*

---

## 1. Problem restatement

**Product.** Type **A** UL, face **100,000**, premium **50,000**/yr. Year-1/2 charges, COI rates, \(i_q=4.5\%\), credited rates, corridors **1.5 / 1.4**.

**Parts.** (a) AV₂ ≈ **91,000**. Surrender end year 2 (age **60**); buy quarterly last-survivor annuity with husband age **70**. (b) Quarterly **Q** (stem says show 1630; solution arithmetic differs). (c) Reserve start year 11 after husband dies in first 10 years. (d) Why insurer refuses full reserve.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Account value end year 2

**How to say it in English.** First roll assuming face one hundred thousand. If DB/AV falls below the corridor, rebuild COI with corridor times account as effective face.

**Year 1 (no corridor bind):** \(\mathrm{AV}_1=\mathbf{41{,}017}\) (ratio ≈2.44 > 1.5).

**Year 2 without corridor:** \(\mathrm{AV}_2^{\text{nc}}=\mathbf{91{,}689}\) (ratio ≈1.091 < 1.4 → binds).

**Year 2 with corridor** (NAR factor 0.4):

\[
\mathrm{AV}_2=\mathbf{90{,}838}
\]

**Answer to report:** show **91,000**. Keep **90,838** for (b).

---

### Part (b) — Quarterly Q

\[
\mathrm{EPV}=4Q(15.0759)=\mathrm{AV}_2=90{,}838
\Rightarrow Q=\mathbf{1{,}506.34}
\]

**Note:** Stem show-target **1,630** is inconsistent with extracted solution arithmetic; report **1,506.34**.

---

### Part (c) — Reserve start of year 11

Husband dead → only wife (age **70**) remains. Reserve = EPV of remaining quarterly **Q** on her life (Woolhouse, \(i=0.05\), SULT).

**Thin:** Official numeric key **omitted** from pypdf extract — do not invent a dollar amount.

---

### Part (d) — Refuse full reserve

**Adverse selection:** unhealthy lives more likely to surrender; annuity pools need early-death funds to support survivors.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type A AV | Solve \(\mathrm{AV}\) with CoI on NAR; check corridor |
| Corridor | If \(\mathrm{DB}/\mathrm{AV}<c\), set \(\mathrm{DB}=c\cdot\mathrm{AV}\) and re-solve |
| Annuity NSP | \(4Q\times 15.0759=\mathrm{AV}_2\) |

**Official targets:** \(\mathrm{AV}_1=41{,}017\); \(\mathrm{AV}_2=90{,}838\); \(Q=1{,}506.34\); (c) *key omitted*; (d) adverse selection.
