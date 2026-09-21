# ALTAM Sample Question 10 — Solution Script
*(10 points · LTC multi-state)*

---

## 1. Problem restatement

**Model.** Five-state continuous-time Markov LTC network for ages \(x \ge 90\):

| State | Meaning |
|------:|---------|
| 0 | Active (≥ 5 ADLs) |
| 1 | Mildly impaired (4 ADLs) — **start here at age 90** |
| 2 | Severely impaired (≤ 3 ADLs) — **care benefit paid here** |
| 3 | Cognitive impairment |
| 4 | Dead (absorbing) |

**Constant intensities** (\(x \ge 90\)):

\[
\mu^{12}=0.10,\quad
\mu^{13}=0.04,\quad
\mu^{14}=0.10,\quad
\mu^{23}=0.04,\quad
\mu^{24}=0.30,\quad
\mu^{34}=0.20
\]

**Exit totals to keep in view:**
- From Mild (1): \(\mu_1^{\mathrm{exit}}=\mu^{12}+\mu^{13}+\mu^{14}=0.24\)
- From Severe (2): \(\mu_2^{\mathrm{exit}}=\mu^{23}+\mu^{24}=0.34\)

**Product.** Continuous benefit of **3,000** per year while in State 2, valued at \(\delta=0.05\). Insured may take benefits **immediately** on entry to 2, or with a **6-month waiting period**.

**Parts.** (a) Kolmogorov forward for \({}_{t}p^{12}\). (b) Closed form at 90. (c) Immediate EPV from Mild at 90. (d) Half-year sojourn \(\bar{a}_{90:\overline{0.5}|}^{22}\). (e) EPV with 6-month wait. (f) Two reasons for waiting periods.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Kolmogorov forward for \({}_{t}p_{x}^{12}\) (2 pts)

**Intuition.** Occupancy of Severe grows from Mild→Severe transitions and shrinks when lives leave Severe (to Cognitive or Dead). No other state feeds State 2 in this diagram.

**How to say it in English.** The rate of change of the probability of being in severe care equals “still mildly impaired times the mild-to-severe intensity,” minus “already severely impaired times the total exit intensity from severe.”

**Derivation sketch (Markov + intensities):** over a short \(h\),

\[
{}_{t+h}p_{x}^{12}
={}_{t}p_{x}^{11}\cdot{}_{h}p_{x+t}^{12}
+{}_{t}p_{x}^{12}\cdot{}_{h}p_{x+t}^{22}+o(h)
\]

with \({}_{h}p^{12}=h\mu^{12}+o(h)\) and \({}_{h}p^{22}=1-h(\mu^{23}+\mu^{24})+o(h)\). Divide by \(h\) and let \(h\to 0\):

\[
\frac{d}{dt}\,{}_{t}p_{x}^{12}
={}_{t}p_{x}^{11}\,\mu_{x+t}^{12}
-{}_{t}p_{x}^{12}\bigl(\mu_{x+t}^{23}+\mu_{x+t}^{24}\bigr)
\]

**Answer to report:** the forward equation above (inflow \(\mu^{12}\) from state 1; outflow \(\mu^{23}+\mu^{24}\) from state 2).

---

### Part (b) — Show \({}_{t}p_{90}^{12}=e^{-0.24t}-e^{-0.34t}\) (1 pt)

**Intuition.** Forces are constant for \(x\ge 90\), so the Kolmogorov ODE becomes a constant-coefficient linear ODE. Survival in Mild is a pure exponential at rate 0.24; occupancy of Severe is the difference of two exponentials.

**Stay in Mild:**

\[
{}_{t}p_{90}^{11}
=\exp\bigl(-(\mu^{12}+\mu^{13}+\mu^{14})t\bigr)
=e^{-0.24t}
\]

**ODE with \(p^{12}(0)=0\):**

\[
\frac{d}{dt}\,{}_{t}p_{90}^{12}
=0.10\,e^{-0.24t}-0.34\,{}_{t}p_{90}^{12}
\]

**Integral / closed form** (official SOA path):

\[
{}_{t}p_{90}^{12}
=\int_{0}^{t}{}_{r}p_{90}^{11}\,\mu^{12}\,{}_{t-r}p_{90+r}^{22}\,dr
=\int_{0}^{t}0.10\,e^{-0.24r}\,e^{-0.34(t-r)}\,dr
\]

\[
=0.10\,e^{-0.34t}\int_{0}^{t}e^{0.10r}\,dr
=e^{-0.24t}-e^{-0.34t}
\]

(Equivalently: \(\dfrac{\mu^{12}}{0.34-0.24}(e^{-0.24t}-e^{-0.34t})\) and \(\mu^{12}=0.10\) cancels the denominator.)

**Answer to report:** \({}_{t}p_{90}^{12}=\mathbf{e^{-0.24t}-e^{-0.34t}}\).

---

### Part (c) — Immediate EPV of State-2 benefit (2 pts)

**Intuition.** Pay 3,000 whenever the life is in State 2; discount continuously at \(\delta=0.05\). That is 3,000 times the occupancy annuity \(\bar{a}_{90}^{12}\).

**How to say it in English.** The present value of care is three thousand times the integral of “discount factor times probability of being severely impaired,” starting from mildly impaired at age ninety.

**Formula:**

\[
\mathrm{EPV}
=3000\int_{0}^{\infty}e^{-\delta t}\,{}_{t}p_{90}^{12}\,dt
=3000\int_{0}^{\infty}\bigl(e^{-0.29t}-e^{-0.39t}\bigr)\,dt
=3000\,\bar{a}_{90}^{12}
\]

because \(\delta+0.24=0.29\) and \(\delta+0.34=0.39\).

**Closed form:**

\[
\bar{a}_{90}^{12}
=\frac{1}{\delta+0.24}-\frac{1}{\delta+0.34}
=\frac{1}{0.29}-\frac{1}{0.39}
=\mathbf{0.88417}
\]

**Plug-in (official SOA):**

\[
\mathrm{EPV}=3000\times 0.88417=\mathbf{2652.5}
\]

**Answer to report:** \(\mathbf{2652.5}\).

---

### Part (d) — Temporary sojourn \(\bar{a}_{90:\overline{0.5}|}^{22}\) (1 pt)

**Intuition.** Given already in State 2 at age 90, pay continuously for at most **0.5** years while **remaining** in 2 (no credit for later re-entry). Stay force is \(\mu^{23}+\mu^{24}=0.34\).

**Formula:**

\[
{}_{t}\bar{p}_{90}^{22}=e^{-0.34t}
\qquad\Rightarrow\qquad
\bar{a}_{90:\overline{0.5}|}^{22}
=\int_{0}^{0.5}e^{-\delta t}\,e^{-0.34t}\,dt
=\int_{0}^{0.5}e^{-0.39t}\,dt
=\frac{1-e^{-0.39\cdot 0.5}}{0.39}
\]

**Plug-in:**

\[
\bar{a}_{90:\overline{0.5}|}^{22}
=\frac{1-e^{-0.195}}{0.39}
=\mathbf{0.454}
\]

(to nearest **0.001**). The stem’s **0.45** is the same quantity rounded to nearest **0.01**.

**Answer to report:** \(\mathbf{0.454}\).

---

### Part (e) — EPV with 6-month waiting period (2 pts)

**Intuition.** On each entry Mild→Severe, withhold the first **0.5** years of care. With constant forces and no return to State 2 from other living states in this model, the unit EPV factors as (discounted 1→2 transition density) × (full sojourn in 2 minus the first half-year).

**How to say it in English.** Start from mild at ninety: the care tap opens only after six months in severe. Multiply the discounted density of entering severe by the value of a continuous annuity in severe **after** that half-year elimination.

**Unit benefit identity (official SOA):**

\[
\int_{0}^{\infty}e^{-\delta r}\,{}_{r}p_{90}^{11}\,\mu^{12}
\Bigl(\bar{a}_{90+r}^{22}-\bar{a}_{90+r:\overline{0.5}|}^{22}\Bigr)\,dr
=\frac{\mu^{12}}{\delta+0.24}\left(\frac{1}{\delta+0.34}-\bar{a}_{90:\overline{0.5}|}^{22}\right)
\]

**Official intermediates:**

\[
\frac{0.10}{0.29},\qquad
\frac{1}{0.39}=2.5641,\qquad
\bar{a}_{90:\overline{0.5}|}^{22}=0.454
\]

\[
\frac{0.10}{0.29}\bigl(2.5641-0.454\bigr)=0.7276
\]

**Plug-in for benefit 3,000:**

\[
\mathrm{EPV}=3000\times 0.7276=\mathbf{2182.7}
\]

**Answer to report:** \(\mathbf{2182.7}\).

---

### Part (f) — Two reasons for waiting periods (2 pts)

**Intuition.** Waiting periods are a product-design tool: they cut short, expensive claims and can coordinate with other short-term income.

**Official SOA reasons (any two):**

1. **Expenses.** Short-term payments involve relatively high administration costs relative to benefit size; once illness lasts past the wait, claims are more material and expense is smaller relative to benefits.
2. **Other income.** Policyholders often have sick pay / short-term disability covering early months, so the wait avoids stacking LTC on income already available.
3. **Benefit trade-off (optional third).** For the same premium, excluding short sojourns can fund richer long-term benefits.

**Answer to report:** any **two** of the reasons above (SOA lists three; two suffice for full credit).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Exit Mild / Severe | \(\mu_1^{\mathrm{exit}}=0.24\), \(\mu_2^{\mathrm{exit}}=0.34\) |
| Kolmogorov forward | \(\dfrac{d}{dt}{}_{t}p_{x}^{12}={}_{t}p_{x}^{11}\mu_{x+t}^{12}-{}_{t}p_{x}^{12}(\mu_{x+t}^{23}+\mu_{x+t}^{24})\) |
| Occupancy at 90 | \({}_{t}p_{90}^{12}=e^{-0.24t}-e^{-0.34t}\) |
| Stay Mild / Severe | \({}_{t}p_{90}^{11}=e^{-0.24t}\), \({}_{t}\bar{p}_{90}^{22}=e^{-0.34t}\) |
| Immediate occupancy annuity | \(\bar{a}_{90}^{12}=\dfrac{1}{\delta+0.24}-\dfrac{1}{\delta+0.34}=\dfrac{1}{0.29}-\dfrac{1}{0.39}\) |
| Immediate EPV | \(\mathrm{EPV}=3000\,\bar{a}_{90}^{12}\) |
| Half-year sojourn | \(\bar{a}_{90:\overline{0.5}|}^{22}=\dfrac{1-e^{-(\delta+0.34)\cdot 0.5}}{\delta+0.34}\) |
| Waiting-period unit EPV | \(\dfrac{\mu^{12}}{\delta+0.24}\Bigl(\dfrac{1}{\delta+0.34}-\bar{a}_{0.5|}^{22}\Bigr)\) |
| Waiting-period EPV | \(3000\times\dfrac{0.10}{0.29}\bigl(2.5641-0.454\bigr)\) |

**Official targets:** \(\bar{a}_{90}^{12}=0.88417\); EPV immediate **2652.5**; \(\bar{a}_{90:\overline{0.5}|}^{22}=\mathbf{0.454}\) (show **0.45** to 0.01); EPV with wait **2182.7**.
