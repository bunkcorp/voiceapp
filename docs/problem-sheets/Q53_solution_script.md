# ALTAM Sample Question 53 — Solution Script
*(Fall 2014 WA Q6 edited · 10 points)*

---

## 1. Problem restatement

**Product.** Type **A** UL to **(50)**, face **100,000**, initial premium **15,000**.
- COI at **120%** SULT; \(i_q=0.04\); expense charge **1%** of premium; credited **5%** year 1; corridor **2.2**; SC = **5%** of premium year 1.
- (a) Why corridor. (b) COI year 1: no corridor / corridor-only / actual. (c) AV, ADB, CV end year 1. (d) NLG reserve end year 20 (AV₂₀=**20,000**).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Why corridor

UL is regulated as **insurance**. Corridor keeps the insurance benefit **material** vs account value (not a pure investment contract).

---

### Part (b) — COI year 1

**How to say it in English.** Compute COI if face is one hundred thousand, then as if only the corridor forced a death benefit—charge the larger.

**(i)** No corridor: \(\mathrm{CoI}=\mathbf{118.02}\)  
**(ii)** Corridor only: \(\mathrm{CoI}=\mathbf{26.07}\)  
**(iii)** Actual: \(\max(118.02,26.07)=\mathbf{118.02}\)

---

### Part (c) — AV, ADB, CV end year 1

\[
\mathrm{AV}_1=\mathbf{15{,}486.6},\quad
\mathrm{ADB}=100{,}000-15{,}486.6=\mathbf{84{,}513.4},\quad
\mathrm{CV}_1=15{,}486.6-750=\mathbf{14{,}736.6}
\]

*(Part (b) also cites provisional AV ≈ 15,468.6.)*

---

### Part (d) — No-lapse guarantee reserve end year 20

\[
100{,}000\,A^{1}_{70:\overline{20}|}=29{,}778
\]

\[
{}_{20}V^{\mathrm{NLG}}=29{,}778-20{,}000=\mathbf{9{,}778}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Type A CoI | \(q^{\mathrm{COI}}v_q(\mathrm{DB}-\mathrm{AV})\); take max vs corridor CoI |
| CV | \(\mathrm{AV}-\mathrm{SC}\) |
| NLG reserve | \(\max(0,\,100{,}000 A^{1}_{x:\overline{n}|}-\mathrm{AV})\) |

**Official targets:** CoI \(=118.02\); AV₁ \(=15{,}486.6\); ADB \(=84{,}513.4\); CV₁ \(=14{,}736.6\); NLG \(=9{,}778\).
