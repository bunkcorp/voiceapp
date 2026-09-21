# ALTAM Sample Question 5 — Solution Script
*(LTAM Fall 2021 Form A Q3 · 9 points)*

---

## 1. Problem restatement

**Model.** Four-state continuous Markov medical model (time \(t\) from diagnosis):

| State | Meaning |
|------:|---------|
| 0 | Diagnosed |
| 1 | Severe symptoms |
| 2 | Remission |
| 3 | Surgery (absorbing) |

**Intensities:**
- \(\mu_t^{01}=a+be^{ct}\) with \(a=0.4\), \(b=2.0\), \(c=0.7\)
- \(\mu_t^{12}=0.2\), \(\mu_t^{21}=0.4\), \(\mu_t^{13}=0.1\) (constant)
- Force of interest \(\delta=0.04\)

**Given:** \(\bar{a}_0^{01}=2.930\), \(\bar{A}_0^{01}=1.055\) (if needed for context).

**Costs (part b):** nursing **12,000**/yr continuous in State 1; surgery lump sum **22,000** on \(1\to 3\); COVID extra **8,000**/yr for first **4 months** of each State-1 sojourn.

**Parts.** (a) Show \(\bar{A}_0^{03}/\bar{a}_0^{01}=\mu^{13}\); compute sojourn annuity \(\bar{\bar{a}}_t^{11}\); compare to occupancy \(\bar{a}_t^{11}\). (b) EPV surgery, EPV nursing, COVID integral. (c) Effect of raising \(\mu^{13}\) to 0.2.

---

## 2–3. Part-by-part walkthrough

### Part (a)(i) — Show \(\bar{A}_0^{03}=\mu^{13}\,\bar{a}_0^{01}\) (1 pt)

**Intuition.** Surgery is reached only by leaving Severe via constant force \(\mu^{13}\). The continuous insurance \(\bar{A}^{03}\) is that force times the occupancy annuity in State 1 starting from Diagnosed.

**How to say it in English.** Every moment spent in State 1 contributes \(\mu^{13}\) times a discounted “surgery now” payment. Integrating that is exactly \(\mu^{13}\) times the State-1 annuity from State 0.

**Derivation:**

\[
\bar{a}_0^{01}=\int_0^\infty e^{-\delta t}\,{}_tp_0^{01}\,dt
\]

\[
\bar{A}_0^{03}
=\int_0^\infty e^{-\delta t}\,{}_tp_0^{01}\,\mu^{13}\,dt
=\mu^{13}\,\bar{a}_0^{01}
\qquad\Rightarrow\qquad
\frac{\bar{A}_0^{03}}{\bar{a}_0^{01}}=\mu^{13}=\mathbf{0.1}
\]

**Answer to report:** identity above with \(\mu^{13}=0.1\).

---

### Part (a)(ii) — Sojourn annuity \(\bar{\bar{a}}_t^{11}\) (1 pt)

**Intuition.** A **sojourn** annuity pays only during the *current* stay in State 1 — no credit for returns from Remission. Exit force from 1 is \(\mu^{12}+\mu^{13}=0.30\).

**Formula:**

\[
\bar{\bar{a}}_t^{11}
=\int_0^\infty e^{-(\delta+\mu^{12}+\mu^{13})r}\,dr
=\frac{1}{\delta+\mu^{12}+\mu^{13}}
=\frac{1}{0.04+0.20+0.10}
=\frac{1}{0.34}
=\mathbf{2.941}
\]

**Answer to report:** **2.941**.

---

### Part (a)(iii) — Compare \(\bar{\bar{a}}_t^{11}\) vs \(\bar{a}_t^{11}\) (1 pt)

**Intuition.** Occupancy annuity \(\bar{a}_t^{11}\) also counts payments after visits to Remission and return. Sojourn excludes those later stays.

**Answer to report:** \(\bar{\bar{a}}_t^{11}<\bar{a}_t^{11}\) — sojourn misses positive EPV from returns via State 2.

---

### Part (b)(i) — EPV of surgery (≈1.3 pts)

**Intuition.** Surgery cost is \(22{,}000\,\bar{A}_0^{03}=22{,}000\,\mu^{13}\,\bar{a}_0^{01}\).

**Plug-in:**

\[
\mathrm{EPV}_{\mathrm{surgery}}
=22{,}000\times 0.1\times 2.930
=\mathbf{6{,}446}
\]

**Answer to report:** **6,446**.

---

### Part (b)(ii) — EPV of nursing care (≈1.3 pts)

**Intuition.** Pay 12,000 whenever in State 1 (including returns).

**Plug-in:**

\[
\mathrm{EPV}_{\mathrm{nursing}}
=12{,}000\times\bar{a}_0^{01}
=12{,}000\times 2.930
=\mathbf{35{,}160}
\]

**Answer to report:** **35,160**.

---

### Part (b)(iii) — COVID extra costs (integral) (≈1.3 pts)

**Intuition.** Extra 8,000/yr only for the first \(1/3\) year of *each* sojourn in State 1: first entry from Diagnosed, plus later entries from Remission.

**How to say it in English.** At each entry into Severe, attach a temporary sojourn annuity of length four months, then discount that lump of care back to diagnosis.

**Temporary sojourn factor:**

\[
\bar{\bar{a}}_{t:\overline{1/3}|}^{11}
=\int_0^{1/3}e^{-0.34u}\,du
=\frac{1-e^{-0.34/3}}{0.34}
\approx\mathbf{0.3151}
\]

**Integral form (official structure):**

\[
\mathrm{EPV}_{\mathrm{COVID}}
=8000\Biggl[
\int_0^\infty e^{-\delta t}\,{}_tp_0^{00}\,\mu_t^{01}\,\bar{\bar{a}}_{t:\overline{1/3}|}^{11}\,dt
+\int_0^\infty e^{-\delta t}\,{}_tp_0^{02}\,\mu_t^{21}\,\bar{\bar{a}}_{t:\overline{1/3}|}^{11}\,dt
\Biggr]
\]

**Answer to report:** the integral expression above (with \(\bar{\bar{a}}^{11}_{1/3|}\approx 0.3151\)).

---

### Part (c) — Raise \(\mu^{13}\) to 0.2 (2 pts)

**Intuition.** First hitting time of State 1 from Diagnosed is unchanged (depends on \(\mu^{01}\) only). What changes is time spent in State 1 and how soon surgery occurs.

**(i) Nursing EPV — Decrease.** Larger \(\mu^{13}\) shortens expected time in State 1 → less nursing.

**(ii) Surgery EPV — Increase.** Surgery happens sooner on average → less discounting → higher EPV of the 22,000 lump sum.

**Answer to report:** (i) **decrease**; (ii) **increase**, with the reasons above.

---

## 4. Formula cheat sheet

| Part | Target |
|------|--------|
| (a)(i) | \(\bar{A}_0^{03}/\bar{a}_0^{01}=\mu^{13}=0.1\) |
| (a)(ii) \(\bar{\bar{a}}_t^{11}\) | **2.941** |
| (a)(iii) | sojourn **smaller** than occupancy |
| (b)(i) surgery | **6,446** |
| (b)(ii) nursing | **35,160** |
| (b)(iii) | entries × \(\bar{\bar{a}}^{11}_{1/3|}\approx 0.3151\) |
| (c)(i)/(ii) | nursing ↓ / surgery ↑ |
