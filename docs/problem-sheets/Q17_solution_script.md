# ALTAM Sample Question 17 — Solution Script
*(MLC Fall 2014 Q3 · 6 points)*

---

## 1. Problem restatement

**Setup.** Independent lives \((x)\) and \((y)\) with \(q_x=0.2\), \(q_y=0.1\). UDD within the year for each life separately.

**Part (a).** Interpret \(\bar{q}_{xy}\) in words.

**Part (b).** Sketch \({}_{s}p_x\) for \(0\le s\le 1\) with numerical axes.

**Part (c).** Show \({}_{s}q_{xy}=s\,q_{xy}+g(s)\,\bar{q}_{xy}\) and identify \(g(s)\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Meaning of \(\bar{q}_{xy}\) (1 pt)

**Intuition.** The bar denotes the **last-survivor** status failing: both lives are dead within the year.

**Answer to report:** \(\bar{q}_{xy}\) is the probability that **both** of \((x)\) and \((y)\) die within **one year** (last-survivor status fails within one year).

*(Must mention the 1-year horizon for full credit.)*

---

### Part (b) — Sketch of \({}_{s}p_x\) under UDD (2 pts)

**Intuition.** UDD on a single life makes survival decline **linearly** from 1 to \(1-q_x\).

**Formula:**

\[
{}_{s}p_x=1-s\,q_x=1-0.2s,\qquad 0\le s\le 1
\]

**Graph:** straight line from \((0,1)\) to \((1,0.8)\). Mark those endpoints on the axes.

**Answer to report:** linear segment connecting **(0, 1)** to **(1, 0.8)**.

---

### Part (c) — Decomposition of \({}_{s}q_{xy}\) (3 pts)

**Intuition.** Independence + UDD expands the joint failure probability into a term proportional to \(q_{xy}\) plus a cross term proportional to \(\bar{q}_{xy}=q_x q_y\).

**How to say it in English.** The chance that the joint-life status fails by time \(s\) is not just \(s\) times the annual joint \(q\); UDD independence adds an extra \(s(1-s)\) times the “both die in the year” probability.

**Formulas:**

\[
{}_{s}q_{xy}=1-{}_{s}p_x\,{}_{s}p_y
=1-(1-s q_x)(1-s q_y)
=s(q_x+q_y)-s^2 q_x q_y
\]

With \(q_{xy}=q_x+q_y-\bar{q}_{xy}\) and \(\bar{q}_{xy}=q_x q_y\):

\[
{}_{s}q_{xy}=s\,q_{xy}+(s-s^2)\,\bar{q}_{xy}
\]

**Answer to report:** \(g(s)=\mathbf{s-s^{2}}\) (equivalently \(s(1-s)\)).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Last-survivor fail | \(\bar{q}_{xy}=q_x q_y\) (independence) |
| Joint \(q\) | \(q_{xy}=q_x+q_y-\bar{q}_{xy}\) |
| UDD survival | \({}_{s}p_x=1-s q_x\) |
| Fractional joint \(q\) | \({}_{s}q_{xy}=1-{}_{s}p_x{}_{s}p_y=s q_{xy}+(s-s^2)\bar{q}_{xy}\) |

**Official targets:** \(\bar{q}_{xy}=0.02\); \(q_{xy}=0.28\); sketch ends at 0.8; \(g(s)=s-s^{2}\).
