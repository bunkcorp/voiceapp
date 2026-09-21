# ALTAM Sample Question 2 — Solution Script
*(MLC Spring 2015 Q2 · 6 points)*

---

## 1. Problem restatement

**Triple-decrement cohort** at age 60 with \(l_{60}^{(\tau)}=1000\), and given exits \(d_{60}^{(2)}=60\), \(d_{60}^{(3)}=45\).

Decrement timing:
- \(\mu_{60+t}^{(1)}=1.2t\) for \(0\le t\le 1\) (continuous)
- Decrement 2 at **exact mid-year** \(t=0.5\)
- Decrement 3 at **year-end** \(t=1\)

**(a)** Calculate associated single-decrement rate \(q_{60}^{\prime(2)}\).

**(b)** Calculate \(d_{60}^{(1)}\).

**(c)** If instead decrement 2 occurs at the **start** of the year (independent rates \(q^{\prime(i)}\) unchanged), state effect on \(q_{60}^{(1)}\), \(q_{60}^{(2)}\), \(q_{60}^{(3)}\) (increase / decrease / no change / cannot tell) with reasons.

---

## 2–3. Part-by-part walkthrough

### Part (a) — \(q_{60}^{\prime(2)}\) (2 pts)

**Intuition.** The associated single-decrement probability for decrement 2 is exits from cause 2 divided by the number of lives **exposed just before** that discrete exit. Survive continuous cause 1 from 0 to 0.5 first.

**Formulas:**

\[
l_{60.5}^{(\tau)-}=1000\exp\!\Bigl(-\int_0^{0.5}1.2t\,dt\Bigr)=1000\exp(-0.15)=860.71
\]

\[
q_{60}^{\prime(2)}=\frac{d_{60}^{(2)}}{l_{60.5}^{(\tau)-}}=\frac{60}{860.71}
\]

**How to say it in English.** Mid-year, before the lump-sum decrement-2 exits, 860.71 lives remain; 60 of them leave by cause 2, so the associated rate is 60 over 860.71.

**Plug-in:** Official SOA: \(1000\times 0.86071=860.71\), then \(60/860.71=\mathbf{0.06978}\).

**Answer to report:** \(\mathbf{0.06978}\) (about \(0.0698\)).

---

### Part (b) — \(d_{60}^{(1)}\) (2 pts)

**Intuition.** After mid-year decrement 2 removes 60 lives, the remaining cohort faces continuous \(\mu^{(1)}\) for the second half-year, then decrement 3 removes 45 at year-end. Cause-1 exits are everyone not accounted for by causes 2 and 3 and year-end survivors.

**Formulas:**

\[
l_{60.5}^{(\tau)+}=860.71-60=800.71
\]

\[
l_{61}^{(\tau)-}=800.71\exp\!\Bigl(-\int_{0.5}^{1}1.2t\,dt\Bigr)=800.71\exp(-0.45)=510.6
\]

\[
l_{61}^{(\tau)}=510.6-45=465.6
\]

\[
d_{60}^{(1)}=1000-60-45-465.6=\mathbf{429.4}\ \approx\ \mathbf{429}
\]

(SOA write-up also shows the equivalent path \(d_{60}^{(1)}=1000-60-45-466=429\) with rounded lives.)

**How to say it in English.** Start with 1000; subtract the 60 mid-year cause-2 exits, the 45 year-end cause-3 exits, and the survivors into age 61 — the remainder died under continuous cause 1.

**Plug-in:** Official intermediates \(860.71\), \(800.71\), \(510.6\), survivors \(465.6\) → \(d^{(1)}=\mathbf{429}\).

**Answer to report:** \(\mathbf{429}\).

---

### Part (c) — Move decrement 2 to \(t=0\); independent rates unchanged (2 pts)

**Intuition.** Same \(q^{\prime(i)}\) means the *associated* rates stay fixed, but the *dependent* \(q^{(j)}\) change because exposure timing changes.

**(i) \(q_{60}^{(1)}\) — decreases.** Cause 2 now removes lives at the start of the year, so fewer lives are exposed to continuous \(\mu^{(1)}\) over the year → fewer cause-1 exits → smaller dependent \(q^{(1)}\).

**(ii) \(q_{60}^{(2)}\) — increases.** With the same \(q^{\prime(2)}\) applied to the full starting cohort (instead of the mid-year survivors), more lives exit by cause 2 → larger dependent \(q^{(2)}\).

**(iii) \(q_{60}^{(3)}\) — no change.** Cause 3 still exits only at year-end from \(l_{61}^{(\tau)-}\). With independent rates unchanged, \(l_{61}^{(\tau)-}\) is unchanged, so \(d^{(3)}\) and \(q^{(3)}\) are unchanged.

**How to say it in English.** Moving a mid-year exit to time 0 steals exposure from the continuous force, inflates the dependent rate for that discrete cause, and leaves a pure year-end cause alone.

**Answer to report:** (i) decrease; (ii) increase; (iii) no change — with the exposure reasons above.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| Survive continuous \(\mu^{(1)}=1.2t\) | \(l(t)=l(0)\exp(-\int 1.2u\,du)=l(0)\exp(-0.6t^2)\) |
| Associated \(q^{\prime(2)}\) | \(q^{\prime(2)}=d^{(2)}/l_{0.5}^{-}\) |
| Dependent balance | \(d^{(1)}=l_{60}-d^{(2)}-d^{(3)}-l_{61}\) |
| Timing comparative | Dependent \(q^{(j)}\) move with exposure; pure year-end \(q^{(3)}\) stable if \(q^{\prime}\) fixed |

**Official targets:** \(q_{60}^{\prime(2)}=0.06978\); \(d_{60}^{(1)}=429\); (c) decrease / increase / no change.
