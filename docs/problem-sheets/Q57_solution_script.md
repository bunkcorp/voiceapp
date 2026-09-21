# ALTAM Sample Question 57 — Solution Script
*(Official Excel sample stub · Topic 1 / LO 1e · Markov / Euler)*

---

## 1. Problem restatement

**Excel-engine walkthrough (not a closed-form WA rewrite).** Sheet **Question 57** in `2026-01-altam-questions.xlsx` / solutions twin.

**Model.** Continuous-time **3-state** Markov (Healthy / Disabled / Dead), age **50**. Euler forward, step \(h=1/12\), on \(t=0,1/12,\ldots,5\).

**Parts:** (a) occupation probs \({}_{t}p^{0j}\); (b) EPV of **500,000** 5-year term (+ monthly maint; \(i^{(12)}=0.06\)); (c) monthly gross premium; (d) why raising Healthy→Disabled force increases premium (two reasons).

---

## 2–3. Part-by-part walkthrough (Excel / stub)

### Part (a) — Euler occupation probabilities

**How to say it in English.** Each month, move a little probability mass along each force—Healthy can stay, become disabled, or die.

**Official target:** \({}_{5}p^{00}\approx\mathbf{0.89808}\).

---

### Part (b) — Death-benefit EPV

Discount expected deaths (+ expenses) from the Euler grid—no invented closed-form \(A\).

**Official target:** ≈ **3294.96**.

---

### Part (c) — Monthly gross premium

Equivalence using the same Markov premium annuity.

**Official target:** ≈ **81.93**.

---

### Part (d) — Qualitative

Raising Healthy→Disabled force raises premium (two reasons on official solutions sheet: more disability path cost / less Healthy premium-paying occupancy). Use solutions wording.

---

## 4. Formula cheat sheet

| Use | Formula / idea |
|-----|----------------|
| Euler | \({}_{t+h}p\approx {}_{t}p+h\cdot({}_{t}p\,\mu)\) |
| Term EPV | \(\sum\) discounted \(500{,}000\times\) expected deaths + expenses |
| Monthly GP | \(\mathrm{EPV}[\text{ben+exp}]/\mathrm{EPV}[\text{annuity}]\) |

**Official targets (verify_q57.py):** \({}_{5}p^{00}\approx 0.89808\); DB EPV ≈ **3294.96**; monthly GP ≈ **81.93**.

See `ALTAM_Q57_PQ_Dev/EXCEL_SAMPLE_STUB.md`.
