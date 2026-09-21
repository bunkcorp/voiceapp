# ALTAM Sample Question 20 — Solution Script
*(LTAM Fall 2019 Q3 · 10 points)*

---

## 1. Problem restatement

**Model.** 5-state joint lives: both alive (0); \(x\) alive \(y\) dead (1); \(x\) dead \(y\) alive (2); both dead sequential (3); both dead simultaneous/common shock (4).

**Forces.** \(\mu^{01}=\mu^*_y-0.0005\), \(\mu^{02}=\mu^*_x-0.0005\), \(\mu^{04}=0.0005\); broken heart \(\mu^{13}=1.2\mu^*_x\), \(\mu^{23}=1.05\mu^*_y\). **i = 5%**. Given \(\bar{a}^{00}_{40:50:\overline{10}|}=7.8487\), \(\bar{A}^{03}_{40:50:\overline{10}|}=0.00789\).

**Product (c).** Continuous premiums in State 0; DB **100,000** on second death; **300,000** if simultaneous.

---

## 2–3. Part-by-part walkthrough

### Part (a) — Two dependence channels (2 pts)

1. **Common shock:** direct \(0\to 4\) simultaneous deaths.
2. **Broken heart:** widow(er) forces exceed paired forces (\(\mu^{13}>\mu^{02}\), \(\mu^{23}>\mu^{01}\)).

---

### Part (b) — Transition probabilities (3 pts)

**(i)** With \(\mu^{23}=1.05\mu^*_{50+t}\):

\[
{}_{10}p^{23}_{50}
=1-\exp\Bigl(-\int_{0}^{10}1.05\mu^*_{50+t}\,dt\Bigr)
=1-({}_{10}p^*_{50})^{1.05}
=\mathbf{0.020678}
\]

**(ii)** Exit forces from 0 sum to \(\mu^*_x+\mu^*_y\) (the −0.0005 adjustments cancel with \(\mu^{04}\)):

\[
{}_{10}p^{00}_{40:50}
=\exp\Bigl(-\int_{0}^{10}(\mu^{01}+\mu^{02}+\mu^{04})\,dt\Bigr)
={}_{10}p^*_{40}\,{}_{10}p^*_{50}\,e^{-0.005}
=\mathbf{0.977654}
\]

---

### Part (c) — Annual net premium rate (3 pts)

**How to say it in English.** Equivalence sets continuous premium times time in State 0 equal to 100,000 times sequential second-death insurance plus 300,000 times common-shock insurance.

**Formulas:**

\[
P\,\bar{a}^{00}_{40:50:\overline{10}|}
=100{,}000\,\bar{A}^{03}+300{,}000\,\bar{A}^{04}
\]

Constant \(\mu^{04}=0.0005\) and the State-0 annuity identity give

\[
\bar{A}^{04}=\mu^{04}\,\bar{a}^{00}=0.0005\times 7.8487=0.00392435
\]

**Plug-in:**

\[
P=\dfrac{100{,}000(0.00789)+300{,}000(0.00392435)}{7.8487}=\mathbf{250.53}
\]

---

### Part (d) — Increase \(\mu^{23}\) to \(1.15\mu^*_y\) (2 pts)

| Quantity | Direction | Why |
|----------|-----------|-----|
| \(\bar{a}^{00}_{:\overline{10}|}\) | **Same** | Exit intensities from State 0 unchanged; no return to 0 |
| \(\bar{A}^{03}_{:\overline{10}|}\) | **Higher** | If \(x\) dies first, \(y\) dies sooner → second death earlier |
| \(\bar{a}_{x\|y}\) (\(\equiv\bar{a}^{02}\)) | **Lower** | Shorter widowhood of \(y\) |
| Premium in (c) | **Higher** | \(\bar{a}^{00}\) and \(\bar{A}^{04}\) fixed; \(\bar{A}^{03}\) rises |

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Broken-heart \(p^{23}\) | \({}_{n}p^{23}=1-({}_{n}p^*)^{1.05}\) |
| Both-alive \(p^{00}\) | \({}_{n}p^{00}={}_{n}p^*_x{}_{n}p^*_y e^{-\mu^{04}n}\) |
| Shock insurance | \(\bar{A}^{04}=\mu^{04}\,\bar{a}^{00}\) (constant \(\mu^{04}\)) |
| Premium | \(P=(100{,}000\bar{A}^{03}+300{,}000\bar{A}^{04})/\bar{a}^{00}\) |

**Official targets:** \({}_{10}p^{23}_{50}=0.020678\); \({}_{10}p^{00}=0.977654\); \(P=250.53\).
