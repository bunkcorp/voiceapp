# ALTAM Sample Question 13 — Solution Script
*(LTAM Fall 2019 Q2 · 9 points)*

---

## 1. Problem restatement

**Product.** Whole life **50,000** on (55) with waiver of premium on disability. Annual gross premium \(G\) if Active; death benefit end of month of death; commission **5%** of premiums; \(i=0.05\).

**Model.** Active (0) / Disabled (1) / Dead (2).

**Given factors:** at 55: \({}_{(12)}A^{02}=0.480\), \(\ddot{a}^{00}=8.832\); at 65: \(0.634\), \(5.416\). Also monthly transition probs and disabled reserves at duration \(10+1/12\) and \(10+2/12\).

**Parts.** (a) \(G\) from \(E[L^g]=-0.1G\). (b) \({}_{10}V^{(0)}\). (c) monthly recursion for active reserves. (d) commission change effects.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Gross premium (2 pts)

**Intuition.** Equivalence with profit loading: EPV(benefits) − EPV(premiums net of commission) \(=-0.1G\).

**How to say it in English.** Net of 5% commission, premiums must cover the death benefit and leave a 10% of \(G\) profit margin at issue.

**Formulas:**

\[
\mathrm{EPV}(\mathrm{DB})=50{,}000\cdot{}_{(12)}A_{55}^{02}=24{,}000
\]

\[
24{,}000-0.95G\,\ddot{a}_{55}^{00}=-0.1G
\]

\[
G=\frac{24{,}000}{0.95(8.832)-0.1}=\mathbf{2{,}894}
\]

**Answer to report:** **2,894** (show **2,900** to nearest 100).

---

### Part (b) — \({}_{10}V^{(0)}\) (2 pts)

**Formula:**

\[
{}_{10}V^{(0)}
=50{,}000\cdot{}_{(12)}A_{65}^{02}-0.95G\,\ddot{a}_{65}^{00}
=50{,}000(0.634)-0.95(2894)(5.416)
=\mathbf{16{,}805}
\]

**Answer to report:** **16,805** (show **16,800**).

---

### Part (c)(i) — \({}_{10\,1/12}V^{(0)}\) (1.5 pts of 3)

**Intuition.** One-month Thiele/recursion from age 65: collect net premium at start of month, discount one month, take EPV of next reserves / death benefit.

**Formula:**

\[
{}_{10\,1/12}V^{(0)}
=0.95G+v^{1/12}\Bigl[
{}_{1/12}p_{65}^{00}\,{}_{10}V^{(0)}
+{}_{1/12}p_{65}^{01}\,{}_{10\,1/12}V^{(1)}
+{}_{1/12}p_{65}^{02}\cdot 50{,}000
\Bigr]
\]

with \(p^{00}=1-0.00461-0.00293=0.99246\), \({}_{10\,1/12}V^{(1)}=34{,}110\).

**Plug-in:** \(\mathbf{19{,}478}\).

**Answer to report:** **19,478** (show **19,500**).

---

### Part (c)(ii) — \({}_{10\,2/12}V^{(0)}\) (1.5 pts of 3)

**Intuition.** Same recursion one month later — **no** premium this step (premiums annual at start of year only in the SOA timing used here; mid-year months have no annual premium due). Use next month’s factors and \({}_{10\,2/12}V^{(1)}=34{,}170\).

**Official result:** \(\mathbf{19{,}398}\).

**Answer to report:** \(\mathbf{19{,}398}\).

---

### Part (d) — Higher commissions (2 pts)

**(i) \({}_{10\,2/12}V^{(0)}\):** **increases** — prospective EPV of future net premium income falls (higher renewal commission), benefits unchanged.

**(ii) \({}_{10\,2/12}V^{(1)}\):** **unchanged** — no premiums while disabled; no return to Active.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Premium with load | \(50{,}000A^{02}-0.95G\ddot{a}^{00}=-0.1G\) |
| Active reserve | \(50{,}000A^{02}-0.95G\ddot{a}^{00}\) |
| Monthly recursion | \(V=0.95G+v^{1/12}E[\text{next}]\) (when premium due) |
| Disabled reserve | EPV benefits only (no premium income) |

**Official targets:** \(G=2894\) (show 2900); \({}_{10}V^{(0)}=16{,}805\); \({}_{10\,1/12}V^{(0)}=19{,}478\); \({}_{10\,2/12}V^{(0)}=19{,}398\); (d) increase / unchanged.
