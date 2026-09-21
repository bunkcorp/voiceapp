# ALTAM Sample Question 25 — Solution Script
*(Spring 2022 WA Q4 · 8 points)*

---

## 1. Problem restatement

**Model.** 4-state joint lives with SULT forces \(\mu^s\):

\[
\mu^{01}=\mu^s_y-0.005,\quad
\mu^{02}=\mu^s_x,\quad
\mu^{13}=\mu^s_x+0.0025,\quad
\mu^{23}=\mu^s_y+0.005
\]

Table of SULT continuous annuities at various \(\delta\) for ages 40, 50, and joint 40:50.

**Parts.** Independence; survival factorization; \(\bar{a}^{00}\) at \(\delta=4\%\); first-death insurance; net premium for 500,000 continuous joint life; annuity rate \(X\) after \(y\) dies at \(t=10\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Independence (1 pt)

**Not independent:** \(\mu^{01}\neq\mu^{23}\) and \(\mu^{02}\neq\mu^{13}\) (forces differ married vs widowed).

---

### Part (b) — Factorization (1 pt)

\[
{}_{t}p^{00}_{xy}
=\exp\Bigl(-\int_0^t(\mu^{01}+\mu^{02})\,dr\Bigr)
={}_{t}p^s_x\,{}_{t}p^s_y\,e^{\lambda t}
\]

with **\(\lambda=0.005\)** (from the −0.005 in \(\mu^{01}\)).

---

### Part (c) — \(\bar{a}^{00}\) at \(\delta=4\%\) (1 pt)

\[
\bar{a}^{00}_{xy}(\delta)
=\int_0^\infty {}_{t}p^{00}e^{-\delta t}\,dt
=\bar{a}^s_{xy}(\delta-\lambda)
\]

At \(\delta=4\%\): use table at **3.50%** → \(\bar{a}^{00}_{40:50}=\mathbf{19.3199}\).

---

### Part (d) — First-death insurance (3 pts)

**(i)**

\[
\bar{A}^{01+02}_{xy}
=\int_0^\infty {}_{t}p^{00}_{xy}\,(\mu^{01}_{x+t:y+t}+\mu^{02}_{x+t:y+t})\,e^{-\delta t}\,dt
\]

**(ii)** With the \(\lambda\)-shift identity and table annuity at \(\delta-\lambda\):

\[
\bar{A}
=1-\delta\,\bar{a}^{00}
=1-0.04\times 19.3199=\mathbf{0.227204}
\]

Show **0.227**.

---

### Part (e) — Net premium rate (1 pt)

**How to say it in English.** Continuous premium while both alive funds a unit first-death benefit of 500,000.

\[
P=\dfrac{500{,}000\times 0.227204}{19.3199}=\mathbf{5{,}880.11}
\]

---

### Part (f) — Annuity rate \(X\) after widowhood (1 pt)

At \(t=10\), \(x\) is 50 in State 1: force \(\mu^s_{50}+0.0025\) ⇒ use SULT \(\bar{a}_{50}\) at **\(\delta+0.0025=4.25\%\)** = 17.9917.

\[
X=\dfrac{500{,}000}{17.9917}=\mathbf{27{,}791}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| λ-shift survival | \({}_{t}p^{00}=e^{\lambda t}{}_{t}p^s_x{}_{t}p^s_y\), \(\lambda=0.005\) |
| λ-shift annuity | \(\bar{a}^{00}(\delta)=\bar{a}^s(\delta-\lambda)\) |
| First-death A | \(\bar{A}=1-\delta\bar{a}^{00}\) (this model) |
| Premium | \(P=S\bar{A}/\bar{a}^{00}\) |
| Widow annuity | use \(\bar{a}^s\) at \(\delta+\text{BH increment}\) |

**Official targets:** \(\lambda=0.005\); \(\bar{a}^{00}=19.3199\); \(\bar{A}=0.227204\) (show 0.227); \(P=5{,}880.11\); \(X=27{,}791\).
