# ALTAM Formula Sheet — Comprehensive Memorization Script

**Source:** ACTEX Learning *Exam ALTAM Formula & Review Sheet* (updated 07/25/2023), `ALTAM_FS.pdf` (18 pages).  
**Coverage:** Part A → Part G (Multiple State through Pensions), every formula block on the sheet.  
**Voice:** Read aloud as a study audio script, or split into Anki cloze cards (formula face / talk-through + mnemonic back).

---

## How to use this script

1. **First pass (listen / read):** Go section by section matching the PDF parts (A1, A2, … G4). Do not pause to drill yet—just hear the story of each formula family.
2. **Second pass (speak the formula):** Cover the LaTeX, say the formula from memory, then uncover and correct.
3. **Third pass (Anki):** One card per formula block. Front = Name / when used. Back = Formula + Mnemonic. Keep Talk-through in Extra for review.
4. **Exam cue habit:** Every time you see a trigger word (*sojourn*, *Thiele*, *Type A corridor*, *PUC vs TUC*, *GMDB put*), say the mnemonic out loud once.
5. **Uncertainty notes:** Where PDF extraction of stacked notation was ambiguous, the script uses standard ALTAM / AMLCR notation and flags the reading briefly.

**Spelling reminder:** it is **mnemonic**, not “pneumonic.”

---

# Part A: MULTIPLE STATE MODELS

---

## A1. Markov chain probabilities

### A1.1 — Transition probability \( {}_t p^{ij}_x \)

1. **Name / when used**  
   Probability of being in state \(j\) at duration \(t\), given in state \(i\) at age \(x\). Exam cue: “where will they be at time \(t\)?” (not “did they stay the whole time”).

2. **Formula**
   \[
   {}_t p^{ij}_x = \Pr(\text{in } j \text{ at age } x+t \mid \text{in } i \text{ at age } x)
   \]

3. **Talk-through**  
   Start in \(i\) at age \(x\). After \(t\) years, check the state. If it’s \(j\), count it. Paths can wander through other states; only the *endpoint* matters.

4. **How to memorize**  
   Superscripts read left→right as “from–to.” Time is the pre-subscript. Age is the base.

5. **Mnemonic**  
   “**t-p from-to**: time first, from-to next, age last.”

---

### A1.2 — Occupancy vs sojourn in the same state

1. **Name / when used**  
   Distinguish “in \(i\) at time \(t\)” from “never left \(i\) up to time \(t\).” Exam cue: continuous benefit while *still* disabled vs merely *currently* disabled.

2. **Formula** *(standard ALTAM notation; PDF stacks both as \(tp^{ii}\)—sojourn uses a continuous-stay bar)*
   \[
   {}_t p^{ii}_x = \Pr(\text{in } i \text{ at } x+t \mid \text{in } i \text{ at } x)
   \]
   \[
   {}_t p^{\overline{ii}}_x = \Pr(\text{remain in } i \text{ throughout } [0,t] \mid \text{in } i \text{ at } x)
   \]
   \[
   {}_t p^{\overline{ii}}_x \le {}_t p^{ii}_x
   \]

3. **Talk-through**  
   Occupancy allows exit and return. Sojourn forbids any exit. Sojourn is always smaller or equal.

4. **How to memorize**  
   Bar = “continuous stay” = “no exits allowed.” Inequality: sojourn ≤ occupancy.

5. **Mnemonic**  
   “**Bar means never left**; bare \(ii\) can leave and come back.”

---

### A1.3 — Time-zero transition matrix

1. **Name / when used**  
   Initial condition for Kolmogorov / Chapman–Kolmogorov.

2. **Formula**
   \[
   {}_0 p^{ij}_x =
   \begin{cases}
   1, & i = j \\
   0, & i \neq j
   \end{cases}
   \]

3. **Talk-through**  
   At time zero you are exactly where you start: diagonal ones, off-diagonal zeros.

4. **How to memorize**  
   Identity matrix.

5. **Mnemonic**  
   “**Zero time, identity.**”

---

### A1.4 — Chapman–Kolmogorov equations

1. **Name / when used**  
   Split a long transition at an intermediate time \(r\). Exam cue: multi-year discrete Markov chains, matrix multiplication of one-year \(P\)’s.

2. **Formula**
   \[
   {}_k p^{ij}_x = \sum_{s} {}_r p^{is}_x \; {}_{k-r} p^{sj}_{x+r}
   \]

3. **Talk-through**  
   To go \(i\to j\) in \(k\) years, pick any intermediate state \(s\) at time \(r\): first hop \(i\to s\) in \(r\) years from age \(x\), then \(s\to j\) in the remaining \(k-r\) years from age \(x+r\). Sum over all possible \(s\).

4. **How to memorize**  
   “First leg, second leg, sum the airports.” Matrix form: \(P(0,k)=P(0,r)P(r,k)\).

5. **Mnemonic**  
   “**CK = connect through every state \(s\).**”

---

### A1.5 — Force of transition → continuous sojourn

1. **Name / when used**  
   Survival in a state under competing exit forces. Exam cue: healthy sojourn, disabled sojourn, permanent disability \( {}_t p^{11} \).

2. **Formula**
   \[
   {}_t p^{\overline{ii}}_x = \exp\!\left(
   -\int_0^t \sum_{j\neq i} \mu^{ij}_{x+s}\, ds
   \right)
   \]

3. **Talk-through**  
   While in \(i\), every other state \(j\) pulls with force \(\mu^{ij}\). Total exit force is the sum. Exponentiate minus the integrated total exit force—same idea as \( {}_tp_x = e^{-\int\mu} \) but with *all exits from \(i\)*.

4. **How to memorize**  
   Single-life force → one \(\mu\). Multi-state sojourn → sum of exit \(\mu\)’s.

5. **Mnemonic**  
   “**Sojourn exp-minus-sum of exits.**”

---

### A1.6 — Kolmogorov’s forward equations

1. **Name / when used**  
   Differential equations for \( {}_t p^{ij}_x \) as \(t\) grows. Exam cue: set up / Euler-step transition probabilities.

2. **Formula**
   \[
   \frac{d}{dt}{}_t p^{ij}_x
   = \sum_{k\neq j}
   \Big(
   {}_t p^{ik}_x \, \mu^{kj}_{x+t}
   - {}_t p^{ij}_x \, \mu^{jk}_{x+t}
   \Big)
   \]
   *(Finite-difference form on the sheet: \(({}_{t+h}p^{ij}-{}_tp^{ij})/h\) equals the same RHS.)*

3. **Talk-through**  
   Probability mass in \(j\) rises when you arrive from other \(k\) (inflow \( {}_tp^{ik}\mu^{kj} \)) and falls when you leave \(j\) to other \(k\) (outflow \( {}_tp^{ij}\mu^{jk} \)). Forward = evolve the distribution forward in time.

4. **How to memorize**  
   In − out, only transitions that touch state \(j\).

5. **Mnemonic**  
   “**Forward: into \(j\) minus out of \(j\).**”

---

## A2. Estimation of transition intensities

### A2.1 — Waiting time and transition counts

1. **Name / when used**  
   Exposure definitions for MLE of forces between integer ages.

2. **Formula** *(definitions)*
   - \(T^{(i)}\) = total waiting time in state \(i\) between ages \(x\) and \(x+1\)
   - \(D^{ij}\) = number of direct transitions \(i\to j\) between ages \(x\) and \(x+1\)

3. **Talk-through**  
   Clock only ticks while in \(i\). Count only direct jumps \(i\to j\).

4. **How to memorize**  
   Exposure in denominator, events in numerator—Poisson/MLE pattern.

5. **Mnemonic**  
   “**Time in \(i\), jumps \(i\) to \(j\).**”

---

### A2.2 — MLE and variance of \(\mu^{ij}_x\)

1. **Name / when used**  
   Estimate constant force of transition in an age year; SE / CI questions.

2. **Formula**
   \[
   \widehat{\mu}^{ij}_x = \frac{D^{ij}}{T^{(i)}}
   \qquad
   \operatorname{Var}\!\big(\widehat{\mu}^{ij}_x\big)
   \approx \frac{D^{ij}}{\big(T^{(i)}\big)^2}
   \]

3. **Talk-through**  
   Rate = events over exposure. Variance ≈ events over exposure-squared (Poisson: \(\operatorname{Var}(\hat\lambda)=D/T^2\)).

4. **How to memorize**  
   Same shape as \(\hat\mu = d/E\), \(\widehat{\mathrm{Var}}=d/E^2\).

5. **Mnemonic**  
   “**D over T; variance D over T-squared.**”

---

## A3. Insurance & annuities (multi-state)

### A3.1 — Discrete and continuous insurance \(A^{ij}\), \(\bar A^{ij}\)

1. **Name / when used**  
   EPV of 1 paid on transition into \(j\) (or related payment timing) from current state \(i\).

2. **Formula**
   \[
   A^{ij}_x = \sum_{k=0}^{\infty} v^{k+1}\big({}_{k+1}p^{ij}_x - {}_k p^{ij}_x\big)
   \]
   \[
   \bar A^{ij}_x = \int_0^{\infty} v^t \sum_{k\neq j} {}_t p^{ik}_x \, \mu^{kj}_{x+t}\, dt
   \]

3. **Talk-through**  
   Discrete: payment at year-end when occupancy of \(j\) increases (difference of probabilities). Continuous: at each instant, be in some \(k\neq j\) and jump into \(j\) at force \(\mu^{kj}\); discount \(v^t\).

4. **How to memorize**  
   Continuous insurance = “occupancy × force into benefit state,” integrated and discounted.

5. **Mnemonic**  
   “**Insurance: arrive in \(j\) and get paid.**”

---

### A3.2 — Discrete and continuous annuities \(\ddot a^{ij}\), \(\bar a^{ij}\)

1. **Name / when used**  
   EPV of 1 per year while in state \(j\), starting from state \(i\).

2. **Formula**
   \[
   \ddot a^{ij}_x = \sum_{k=0}^{\infty} v^k \, {}_k p^{ij}_x
   \qquad
   \bar a^{ij}_x = \int_0^{\infty} v^t \, {}_t p^{ij}_x \, dt
   \]

3. **Talk-through**  
   Pay while you *are* in \(j\). Discrete due: probability of being in \(j\) at integer times. Continuous: integrate occupancy.

4. **How to memorize**  
   Annuity weights occupancy; insurance weights transitions.

5. **Mnemonic**  
   “**Annuity pays for being there; insurance pays for getting there.**”

---

### A3.3 — Term / deferred split relations

1. **Name / when used**  
   Split whole-life multi-state EPV into first \(n\) years plus deferred continuation from whatever state you’re in at \(n\).

2. **Formula**
   \[
   A^{ij}_x = A^{ij}_{x:\overline{n}|} + \sum_k v^n \, {}_n p^{ik}_x \, A^{kj}_{x+n}
   \]
   \[
   \bar A^{ij}_x = \bar A^{ij}_{x:\overline{n}|} + \sum_k v^n \, {}_n p^{ik}_x \, \bar A^{kj}_{x+n}
   \]
   \[
   \ddot a^{ij}_x = \ddot a^{ij}_{x:\overline{n}|} + \sum_k v^n \, {}_n p^{ik}_x \, \ddot a^{kj}_{x+n}
   \]
   \[
   \bar a^{ij}_x = \bar a^{ij}_{x:\overline{n}|} + \sum_k v^n \, {}_n p^{ik}_x \, \bar a^{kj}_{x+n}
   \]

3. **Talk-through**  
   After \(n\) years you’re in some state \(k\) with probability \( {}_np^{ik} \). Discount \(v^n\), then restart the factor from that new state toward benefit state \(j\). Sum over \(k\).

4. **How to memorize**  
   Classic \(A_x = A_{x:\bar n|} + v^n {}_np_x A_{x+n}\), but sum over intermediate states.

5. **Mnemonic**  
   “**Term piece plus sum-over-states deferred piece.**”

---

### A3.4 — Continuous sojourn annuity

1. **Name / when used**  
   Pay continuously only if never left state \(i\) (e.g., continuous disability benefit with no recovery credit beyond sojourn).

2. **Formula**
   \[
   \bar a^{\overline{ii}}_{x:\overline{n}|} = \int_0^n v^t \, {}_t p^{\overline{ii}}_x \, dt
   \]

3. **Talk-through**  
   Same as continuous annuity but with sojourn probability, term \(n\).

4. **How to memorize**  
   Bar on annuity *and* bar on \(ii\).

5. **Mnemonic**  
   “**Sojourn annuity: integrate barred \(p\).**”

---

### A3.5 — Woolhouse formula, 2 terms

1. **Name / when used**  
   Convert continuous multi-state annuity to \(m\)ths payable; rough UDD-style correction.

2. **Formula**
   \[
   \ddot a^{(m)\,ij}_x \approx \bar a^{ij}_x
   \qquad (i\neq j)
   \]
   \[
   \ddot a^{(m)\,ii}_x \approx \bar a^{ii}_x + \frac{1}{2m}
   \]

3. **Talk-through**  
   Off-diagonal (\(i\neq j\)): leading continuous term only at two-term level. Same-state: add the usual half-period \(1/(2m)\).

4. **How to memorize**  
   Two-term Woolhouse: continuous + \(1/(2m)\) on the “due” same-state annuity.

5. **Mnemonic**  
   “**Two-term: off-diag bare continuous; diagonal add 1 over 2m.**”

---

### A3.6 — Woolhouse formula, 3 terms

1. **Name / when used**  
   Finer conversion including force / interest curvature terms. Matches SOA ALTAM sheet multi-state Woolhouse.

2. **Formula** *(from continuous)*
   \[
   \ddot a^{(m)\,ij}_x \approx \bar a^{ij}_x - \frac{1}{12m^2}\mu^{ij}_x
   \qquad (i\neq j)
   \]
   \[
   \ddot a^{(m)\,ii}_x \approx \bar a^{ii}_x + \frac{1}{2m} + \frac{1}{12m^2}\Big(\delta + \sum_{j\neq i}\mu^{ij}_x\Big)
   \]
   *(from annual due)*
   \[
   \ddot a^{(m)\,ij}_x \approx \ddot a^{ij}_x + \frac{m^2-1}{12m^2}\mu^{ij}_x
   \qquad (i\neq j)
   \]
   \[
   \ddot a^{(m)\,ii}_x \approx \ddot a^{ii}_x - \frac{m-1}{2m} - \frac{m^2-1}{12m^2}\Big(\delta + \sum_{j\neq i}\mu^{ij}_x\Big)
   \]

3. **Talk-through**  
   Third term brings \(\mu\) for cross-state factors and \((\delta+\sum\mu)\) for same-state—like \(\delta+\mu_x\) in single-life Woolhouse, but total exit force replaces \(\mu_x\).

4. **How to memorize**  
   Same-state: interest + total exits. Cross-state: only the direct force \(\mu^{ij}\). Note (SOA): for \(i\neq j\) the “\(1/(2m)\)” middle term is zero.

5. **Mnemonic**  
   “**Diagonal gets delta-plus-exits; off-diagonal gets mu-ij only.**”

---

## A4. Premiums & reserves (multi-state)

### A4.1 — Reserve / cashflow notation

1. **Name / when used**  
   Thiele and discrete reserve recursion setup.

2. **Formula** *(definitions)*
   - \( {}_t V^{(i)} \): reserve at time \(t\) if in state \(i\)
   - \(I^{(i)}\): premium less benefit *while* in state \(i\) (equivalence-principle net cashflow rate/amount)
   - \(b^{(ij)}\): benefit paid on transition \(i\to j\)

3. **Talk-through**  
   Each state has its own reserve. Income net of annuity-type benefits sits in \(I^{(i)}\). Jump benefits sit in \(b^{(ij)}\).

4. **How to memorize**  
   “Stay cashflows vs jump cashflows.”

5. **Mnemonic**  
   “**I for in-state; b for between-states.**”

---

### A4.2 — Discrete recursive reserve formula

1. **Name / when used**  
   Year-by-year (or fraction \(s\)) reserve roll-forward in Markov models.

2. **Formula**
   \[
   \big({}_k V^{(i)} + I^{(i)}\big)(1+i)
   = \sum_j \big(b^{(ij)} + {}_{k+1}V^{(j)}\big)\, p^{ij}_{x+k}
   \]
   \[
   \big({}_k V^{(i)} + s I^{(i)}\big)(1+i)^s
   = \sum_j \big(b^{(ij)} + {}_{k+s}V^{(j)}\big)\, {}_s p^{ij}_{x+k},
   \quad 0<s<1
   \]

3. **Talk-through**  
   Start with reserve plus in-state cashflow, accumulate interest, then equate to expected (transition benefit + next reserve) over next states.

4. **How to memorize**  
   Same skeleton as \((V+P)(1+i)=q(b+0)+p\,{}_{1}V\), vectorized over states.

5. **Mnemonic**  
   “**Reserve plus I, grow, equals expected b-plus-next-V.**”

---

### A4.3 — Thiele’s differential equation (forward & backward Euler)

1. **Name / when used**  
   Continuous-time reserve ODE; numerical Euler steps on exams.

2. **Formula**
   \[
   \frac{d}{dt}{}_t V^{(i)}
   = {}_t V^{(i)}\Big(\delta_t + \sum_{j\neq i}\mu^{ij}_{x+t}\Big)
   + I^{(i)}_t
   - \sum_{j\neq i}\big(b^{(ij)}_t + {}_t V^{(j)}\big)\mu^{ij}_{x+t}
   \]
   - **Euler forward:** \(\dfrac{{}_{t+h}V^{(i)}-{}_t V^{(i)}}{h} =\) RHS at \(t\)
   - **Euler backward:** \(\dfrac{{}_t V^{(i)}-{}_{t-h}V^{(i)}}{h} =\) RHS at \(t\)

3. **Talk-through**  
   Reserve earns interest \(\delta\) and is “charged” for the risk of exiting (the \(\sum\mu\) term with \(V^{(i)}\)). In-state cashflow \(I\) adds. Expected jump cost is force times (benefit plus the reserve you must set up in the new state). Forward Euler marches ahead; backward Euler is often used from a terminal condition backward.

4. **How to memorize**  
   Interest on \(V\) + premium/benefit while here − expected transition strain.

5. **Mnemonic**  
   “**Thiele: δV + I − μ(b+V′).**”

---

## A5. Disability income insurance (discrete DII)

### A5.1 — Three-state DII and transition matrix

1. **Name / when used**  
   Healthy (0) / Sick (1) / Dead (2) with recovery; dead absorbing.

2. **Formula**
   \[
   P(t)=
   \begin{pmatrix}
   p^{00}_{x+t} & p^{01}_{x+t} & p^{02}_{x+t} \\
   p^{10}_{x+t} & p^{11}_{x+t} & p^{12}_{x+t} \\
   0 & 0 & 1
   \end{pmatrix}
   \]

3. **Talk-through**  
   From dead you stay dead. Healthy and sick can move among 0,1,2.

4. **How to memorize**  
   Bottom row \((0,0,1)\).

5. **Mnemonic**  
   “**Dead is sticky: last row identity to death.**”

---

### A5.2 — Multi-year transition probabilities (matrix products)

1. **Name / when used**  
   Compute \( {}_2p^{00} \), \( {}_np^{10} \), etc., by multiplying annual matrices / vectors.

2. **Formula** *(illustrative identities on the sheet)*
   \[
   {}_2 p^{00}_x = p^{00}_x p^{00}_{x+1} + p^{01}_x p^{10}_{x+1} + p^{02}_x p^{20}_{x+1}
   \]
   and if death is absorbing with \(p^{20}=0\), the last term vanishes, leaving the healthy–via–sick paths. Higher \( {}_n p^{10}_x \) are row-vector × product of \(P\) matrices × column selecting destination—sheet shows the pattern for \(n=2,3,4\).

3. **Talk-through**  
   Enumerate one-year steps; matrix multiply. Starting sick, you need the sick-row of the first matrix, then keep multiplying.

4. **How to memorize**  
   Chapman–Kolmogorov in matrix clothes.

5. **Mnemonic**  
   “**DII multi-year: multiply the P’s.**”

---

## A6. Permanent disability model (continuous)

### A6.1 — Forces and transition probabilities (no recovery)

1. **Name / when used**  
   Healthy / Disabled / Dead with \(\mu^{10}=0\) (no recovery).

2. **Formula**
   \[
   {}_t p^{00}_x = \exp\!\Big(-\int_0^t(\mu^{01}_{x+s}+\mu^{02}_{x+s})\,ds\Big)
   \]
   \[
   {}_t p^{01}_x = \int_0^t {}_s p^{00}_x \, \mu^{01}_{x+s} \, {}_{t-s}p^{11}_{x+s}\, ds
   \]
   \[
   {}_t p^{02}_x = 1 - {}_t p^{00}_x - {}_t p^{01}_x
   \]
   \[
   {}_t p^{10}_x = 0,\quad
   {}_t p^{11}_x = \exp\!\Big(-\int_0^t \mu^{12}_{x+s}\,ds\Big),\quad
   {}_t p^{12}_x = 1-{}_t p^{11}_x
   \]
   \[
   {}_t p^{20}_x={}_t p^{21}_x=0,\quad {}_t p^{22}_x=1
   \]

3. **Talk-through**  
   Healthy sojourn fights disablement *and* death. To be disabled at \(t\), disable at \(s\) then survive disabled for \(t-s\). From disabled you only face death. Dead absorbs.

4. **How to memorize**  
   Disability occupancy = integral of “first disablement density × disabled survival.”

5. **Mnemonic**  
   “**PD: no way back; disable then survive disabled.**”

---

### A6.2 — Sick annuity from healthy, with waiting period \(w\)

1. **Name / when used**  
   EPV of continuous sick pay for a life now healthy; elimination period \(w\); term \(n>w\).

2. **Formula**
   \[
   \bar a^{01}_{x:\overline{n}|}
   = \int_0^n v^t \, {}_t p^{00}_x \, \mu^{01}_{x+t} \, \bar a^{11}_{x+t:\overline{n-t}|}\, dt
   \quad (w=0)
   \]
   \[
   \mathrm{EPV}
   = \int_0^{n-w} v^t \, {}_t p^{00}_x \, \mu^{01}_{x+t}
   \Big(\bar a^{11}_{x+t:\overline{n-t}|} - \bar a^{11}_{x+t:\overline{w}|}\Big)\, dt
   \quad (w>0)
   \]

3. **Talk-through**  
   Become sick at \(t\) while still healthy until then; then attach a disabled annuity for the remaining term. With waiting period \(w\), subtract the first \(w\) years of disabled annuity (or equivalently only credit payment after \(w\) years sick)—sheet writes difference of term disabled annuities.

4. **How to memorize**  
   “Incidence density × annuity-from-onset,” adjust for elimination by subtracting \(\bar a^{11}_{:\bar w|}\).

5. **Mnemonic**  
   “**Disablement density times sick annuity; waiting period subtracts first w.**”

---

## A7. Other Markov chain models (structure cues)

These are **model maps** on the sheet (states & arrows), not new closed-form EPVs. Memorize the *state lists* for exam recognition.

### A7.1 — Long-term care (ADL / cognitive)

1. **Name / when used**  
   LTC with ADL counts and cognitive impairment.

2. **Formula** *(state labels)*
   - 0 Active (≥5 ADLs)
   - 1 Impaired (4 ADLs)
   - 2 Severely impaired (≤3 ADLs)
   - 3 Cognitive impairment
   - 4 Dead

3. **Talk-through**  
   Benefits often depend on which impaired state you’re in; death absorbs.

4. **How to memorize**  
   ADL ladder + separate cognitive + dead.

5. **Mnemonic**  
   “**LTC: ADL steps, cognitive side door, death.**”

---

### A7.2 — Critical / chronic illness models 1–3

1. **Name / when used**  
   CI product design: accelerated vs additional death benefits (models differ by whether CI and death share absorbing structure / duplicate death states on the sheet’s Model 3).

2. **Formula** *(states)*
   - Model 1/2 pattern: Healthy (0) → Critically ill (1) → Dead (2)
   - Model 3 on sheet shows an extra Dead state (3) variant for product/benefit timing distinctions—treat as “know the diagram you are given.”

3. **Talk-through**  
   Always identify whether CI payment accelerates the death benefit or pays in addition.

4. **How to memorize**  
   Read the exam’s state diagram; don’t force one universal CI graph.

5. **Mnemonic**  
   “**CI: healthy–ill–dead; check acceleration.**”

---

### A7.3 — Continuing care retirement communities (CCRC)

1. **Name / when used**  
   ILU / ALU / SNF (+ temporary SNF states).

2. **Formula** *(state labels)*
   - No reentry: ILU(0), ALU(1), SNF(2), Dead(3)
   - Temporary SNF: add STNF(4)
   - Temp SNF from ILU and ALU: STNF(4) and STNF(5)

3. **Talk-through**  
   Temporary SNF allows return; permanent SNF may not. Count the temporary states.

4. **How to memorize**  
   Independent → assisted → skilled → dead, plus optional short-term skilled.

5. **Mnemonic**  
   “**CCRC: ILU–ALU–SNF–Dead; STNF if temporary.**”

---

### A7.4 — Structured settlements (reviewable annuity)

1. **Name / when used**  
   Disabled with uncertain prognosis; possible recovery or permanent disability.

2. **Formula** *(states)*
   - 0 Disabled, uncertain prognosis
   - 1 Recovered
   - 2 Permanently disabled
   - 3 Dead

3. **Talk-through**  
   Annuity may be reviewable until permanence is declared.

4. **How to memorize**  
   Uncertain → recovered or permanent → dead.

5. **Mnemonic**  
   “**Settlement: uncertain, recovered, permanent, dead.**”

---

# Part B: MULTIPLE DECREMENT MODELS

---

## B1. Multiple decrement probabilities

### B1.1 — Total force and total survival / failure

1. **Name / when used**  
   All-cause decrement: \(\tau\) = total.

2. **Formula**
   \[
   \mu^{(\tau)}_{x+s} = \sum_j \mu^{(j)}_{x+s}
   \]
   \[
   {}_t p^{(\tau)}_x = \exp\!\Big(-\int_0^t \mu^{(\tau)}_{x+s}\,ds\Big)
   \]
   \[
   {}_t q^{(\tau)}_x = \int_0^t {}_s p^{(\tau)}_x \, \mu^{(\tau)}_{x+s}\,ds
   \]
   \[
   \mu^{(\tau)}_{x+t} = \frac{\frac{d}{dt}{}_t q^{(\tau)}_x}{{}_t p^{(\tau)}_x}
   \]

3. **Talk-through**  
   Forces add. Total survival is exp of minus total force. Total q integrates survival × total force. Force = density / survival.

4. **How to memorize**  
   Identical to single-life with \(\mu^{(\tau)}\).

5. **Mnemonic**  
   “**Tau force is the sum; tau survival uses tau force.**”

---

### B1.2 — Cause-specific absolute probabilities \( {}_t q^{(j)} \)

1. **Name / when used**  
   Prob of exit by cause \(j\) within \(t\) in the *dependent* (absolute) sense. Note: \( {}_t p^{(j)}_x \) does **not** exist as a standard MD probability.

2. **Formula**
   \[
   {}_t q^{(j)}_x = \int_0^t {}_s p^{(\tau)}_x \, \mu^{(j)}_{x+s}\,ds
   \]
   \[
   {}_t q^{(\tau)}_x = \sum_j {}_t q^{(j)}_x
   \]
   \[
   \mu^{(j)}_{x+t} = \frac{\frac{d}{dt}{}_t q^{(j)}_x}{{}_t p^{(\tau)}_x}
   \]

3. **Talk-through**  
   You must still be under observation (survive all causes) then exit by \(j\). Absolute qs sum to total q.

4. **How to memorize**  
   Always multiply cause force by **total** survival, not primed survival.

5. **Mnemonic**  
   “**Absolute q: total-p times cause-mu.**”

---

### B1.3 — Associated single decrement probabilities

1. **Name / when used**  
   Independent / “net” rates if only cause \(j\) operated.

2. **Formula**
   \[
   {}_t p'^{(j)}_x = \exp\!\Big(-\int_0^t \mu^{(j)}_{x+s}\,ds\Big)
   \]
   \[
   {}_t p^{(\tau)}_x = \prod_j {}_t p'^{(j)}_x
   \]
   \[
   {}_t q'^{(j)}_x = \int_0^t {}_s p'^{(j)}_x \, \mu^{(j)}_{x+s}\,ds
   \]
   \[
   \mu^{(j)}_{x+t} = \frac{\frac{d}{dt}{}_t q'^{(j)}_x}{{}_t p'^{(j)}_x}
   \]

3. **Talk-through**  
   Primed = pretend other causes don’t exist. Product of primed survivals = total survival (independent forces).

4. **How to memorize**  
   Prime = associated single. Product of primes = tau-p.

5. **Mnemonic**  
   “**Primes multiply to tau-p.**”

---

### B1.4 — Time-split identities

1. **Name / when used**  
   Chain rules for survival and deferred probabilities.

2. **Formula**
   \[
   {}_{t+u}p^{(\tau)}_x = {}_t p^{(\tau)}_x \, {}_u p^{(\tau)}_{x+t}
   \]
   \[
   {}_{t+u}q^{(\tau)}_x = {}_t q^{(\tau)}_x + {}_t p^{(\tau)}_x \, {}_u q^{(\tau)}_{x+t}
   \]
   \[
   {}_{t+u}q^{(j)}_x = {}_t q^{(j)}_x + {}_t p^{(\tau)}_x \, {}_u q^{(j)}_{x+t}
   \]
   \[
   {}_{t|u}q^{(j)}_x = {}_t p^{(\tau)}_x \, {}_u q^{(j)}_{x+t}
   \]

3. **Talk-through**  
   Same as single-life Kolmogorov relations; deferred cause-j uses total survival to \(t\) then absolute cause-j q.

4. **How to memorize**  
   Deferred = survive-all × then q.

5. **Mnemonic**  
   “**Deferred j: tau-survive, then q-j.**”

---

### B1.5 — Multiple decrement table relations

1. **Name / when used**  
   Radix \(l^{(\tau)}\), exits \(d^{(j)}\).

2. **Formula**
   \[
   l^{(\tau)}_{x+t} = l^{(\tau)}_x \, {}_t p^{(\tau)}_x
   \]
   \[
   d^{(\tau)}_{x+t} = l^{(\tau)}_x \, {}_t p^{(\tau)}_x \, q^{(\tau)}_{x+t}
   \]
   \[
   d^{(j)}_{x+t} = l^{(\tau)}_x \, {}_t p^{(\tau)}_x \, q^{(j)}_{x+t}
   \]

3. **Talk-through**  
   Living column follows total survival. Cause exits allocate with absolute \(q^{(j)}\).

4. **How to memorize**  
   \(d^{(j)}=l\cdot q^{(j)}\) with the MD living column.

5. **Mnemonic**  
   “**l-tau times q-j makes d-j.**”

---

## B2. Fractional age assumptions

### B2.1 — Constant force of decrement (CFD) between integral ages

1. **Name / when used**  
   Forces constant in the year; relate fractional absolute qs and associated survivals.

2. **Formula** *(for \(0<s\le 1\); sheet also writes forms with \(s+t\le 1\))*
   \[
   {}_s q^{(j)}_x = \frac{q^{(j)}_x}{q^{(\tau)}_x}\Big(1-\big(p^{(\tau)}_x\big)^s\Big)
   \]
   \[
   {}_s p'^{(j)}_{x+t} = \big({}_s p^{(\tau)}_{x+t}\big)^{q^{(j)}_x / q^{(\tau)}_x}
   \]
   \[
   q^{(j)}_x = q^{(\tau)}_x \frac{\log p'^{(j)}_x}{\log p^{(\tau)}_x}
   \]

3. **Talk-through**  
   Under constant forces, absolute fractional exit shares the total exit probability in proportion to annual absolute qs, with exponential survival. Logs convert between primed and tau annual rates.

4. **How to memorize**  
   CFD ↔ exponential ↔ logs.

5. **Mnemonic**  
   “**CFD: logs link q-j to primed p.**”

---

### B2.2 — UDD in the multiple decrement table

1. **Name / when used**  
   Uniform distribution of *decrements* over the year in the MD table.

2. **Formula**
   \[
   {}_s q^{(j)}_x = s\, q^{(j)}_x
   \]
   *(Sheet also lists associated-power / log relations adjacent to this block; if a problem says UDD in the MD table, linear absolute qs are the headline assumption. Cross-check the exam’s exact wording.)*

3. **Talk-through**  
   Absolute exits accumulate linearly through the year.

4. **How to memorize**  
   UDD ⇒ multiply annual q by \(s\).

5. **Mnemonic**  
   “**UDD-MD: s times q-j.**”

---

### B2.3 — UDD in associated single decrement tables

1. **Name / when used**  
   Each cause uniform in its *associated* table; convert to absolute fractional qs.

2. **Formula**
   - Two decrements:
   \[
   {}_s q^{(1)}_x = s q'^{(1)}_x - \frac{s^2}{2} q'^{(1)}_x q'^{(2)}_x
   \]
   - Three decrements:
   \[
   {}_s q^{(1)}_x = s q'^{(1)}_x - \frac{s^2}{2} q'^{(1)}_x\big(q'^{(2)}_x+q'^{(3)}_x\big) + \frac{s^3}{3} q'^{(1)}_x q'^{(2)}_x q'^{(3)}_x
   \]

3. **Talk-through**  
   Leading term is “as if alone.” Quadratic/cubic corrections remove double-counting of simultaneous independent uniform exits.

4. **How to memorize**  
   Inclusion–exclusion pattern in \(s, s^2/2, s^3/3\).

5. **Mnemonic**  
   “**UDD primes: s, minus s-squared over 2 products, plus s-cubed over 3.**”

---

## B3. Estimation of decrement probabilities

### B3.1 — MLE of cause force and of \(q'\)

1. **Name / when used**  
   Exact age-year estimation from exposure in state 0 (alive) and exits to \(j\).

2. **Formula**
   \[
   T^{(0)}=\text{waiting time in state 0 between }x\text{ and }x+1
   \]
   \[
   D^{0j}=\text{direct transitions }0\to j
   \]
   \[
   \widehat{\mu}^{(j)}_x = \frac{D^{0j}}{T^{(0)}}
   \qquad
   \operatorname{Var}\big(\widehat{\mu}^{(j)}_x\big)\approx\frac{D^{0j}}{(T^{(0)})^2}
   \]
   Assumption: \(\mu^{(j)}_x\) constant on \([x,x+1)\).
   \[
   \widehat{q}'^{(j)}_x = 1-e^{-\widehat{\mu}^{(j)}_x}
   \]
   \[
   \operatorname{Var}\big(\widehat{q}'^{(j)}_x\big)
   \approx \big(1-\widehat{q}'^{(j)}_x\big)^2 \frac{D^{0j}}{(T^{(0)})^2}
   \]
   *(PDF extraction shows \(\hat q^{(j)}\) in one variance factor; standard delta-method uses \((1-\hat q')^2\operatorname{Var}(\hat\mu)\).)*

3. **Talk-through**  
   Same MLE as multi-state. Convert force to associated q via \(1-e^{-\mu}\). Variance scales by squared survival factor.

4. **How to memorize**  
   \(\hat q'=1-e^{-\hat\mu}\); multiply force variance by \((p')^2\).

5. **Mnemonic**  
   “**Force D/T; primed q is one minus e to the minus mu.**”

---

## B4. Transitions at exact ages

### B4.1 — Double decrement with one cause at year boundary

1. **Name / when used**  
   Withdrawals or retirements at exact anniversary; other cause uniform/continuous in year.

2. **Formula**
   - Decrement 2 at **beginning** of year:
   \[
   q^{(1)}_x = p'^{(2)}_x\, q'^{(1)}_x,\qquad q^{(2)}_x = q'^{(2)}_x
   \]
   - Decrement 2 at **end** of year:
   \[
   q^{(1)}_x = q'^{(1)}_x,\qquad q^{(2)}_x = p'^{(1)}_x\, q'^{(2)}_x
   \]
   - Decrement 2 at **middle** of year:
   \[
   q^{(1)}_x = {}_{0.5}q^{(1)}_x + {}_{0.5}p^{(\tau)}_x\, {}_{0.5}q^{(1)}_{x+0.5}
   \]
   \[
   = {}_{0.5}q'^{(1)}_x + {}_{0.5}p'^{(1)}_x\, {}_{0.5}p'^{(2)}_x\, {}_{0.5}q'^{(1)}_{x+0.5}
   \]
   \[
   q^{(2)}_x = {}_{0.5}q^{(2)}_x = {}_{0.5}p'^{(1)}_x\, {}_{0.5}q'^{(2)}_x
   \]
   with note \({}_{0.5}q^{(2)}_{x+0.5}=0\).

3. **Talk-through**  
   Whoever goes first “wins.” Beginning: cause 2 takes its primed q immediately; survivors face cause 1. End: reverse. Middle: split the year into two half-years.

4. **How to memorize**  
   Order of exact-age decrement determines who multiplies by whose \(p'\).

5. **Mnemonic**  
   “**Exact-age first takes full primed q; the other multiplies by survivor p-prime.**”

---

## B5. Insurance, annuities, premiums & reserves (MD)

### B5.1 — Cause-of-decrement insurance & total annuity

1. **Name / when used**  
   Benefit on cause \(j\); annuity while alive under all causes.

2. **Formula**
   \[
   A^{(j)}_x = \sum_{k=0}^{\infty} v^{k+1}\, {}_k p^{(\tau)}_x\, q^{(j)}_{x+k}
   \]
   \[
   \bar A^{(j)}_x = \int_0^{\infty} v^t\, {}_t p^{(\tau)}_x\, \mu^{(j)}_{x+t}\, dt
   \]
   \[
   \ddot a^{(\tau)}_x = \sum_{k=0}^{\infty} v^k\, {}_k p^{(\tau)}_x
   \qquad
   \bar a^{(\tau)}_x = \int_0^{\infty} v^t\, {}_t p^{(\tau)}_x\, dt
   \]

3. **Talk-through**  
   Insurance: survive all causes to \(k\), then exit by \(j\). Annuity: pay while still in the table (tau-survival).

4. **How to memorize**  
   Same as life insurance with \(q^{(j)}\) or \(\mu^{(j)}\) and \(p^{(\tau)}\).

5. **Mnemonic**  
   “**MD insurance: tau-p then cause-q.**”

---

### B5.2 — Gross premium reserve recursion (MD)

1. **Name / when used**  
   Discrete reserve with multiple exit benefits and expenses on exit.

2. **Formula**
   \[
   ({}_k V^g + G - e)(1+i)
   = \sum_j \big(b^{(j)}+E^{(j)}\big) q^{(j)}_{x+k} + {}_{k+1}V^g\, p^{(\tau)}_{x+k}
   \]
   \[
   ({}_k V^g + G - e)(1+i)^s
   = \sum_j \big(b^{(j)}+E^{(j)}\big)\, {}_s q^{(j)}_{x+k} + {}_{k+s}V^g\, {}_s p^{(\tau)}_{x+k}
   \]

3. **Talk-through**  
   Premium minus expense, accumulate, then pay expected exit benefits/expenses and set up next reserve for survivors.

4. **How to memorize**  
   One-life recursion with a sum over causes.

5. **Mnemonic**  
   “**V plus G minus e, grow, equals exits plus p-tau next V.**”

---

## B6. Notation bridge: MD ↔ multi-state ↔ statistics

| Multiple decrement | Multiple state | Statistics |
|---|---|---|
| \( {}_t p^{(\tau)}_x \) | \( {}_t p^{00}_x \) | \(\Pr(T_x>t)\) |
| \( {}_t q^{(\tau)}_x \) | \(\sum_j {}_t p^{0j}_x\) *(for \(j\neq 0\))* | \(\Pr(T_x\le t)\) |
| \( {}_t q^{(j)}_x \) | \( {}_t p^{0j}_x \) | \(\Pr(T_x\le t,\, J=j)\) |
| \( {}_t q'^{(j)}_x \) | N/A | \(\Pr(T_x^{(j)}\le t)\) |

1. **Name / when used**  
   Translate symbols across chapters.

2. **Formula** — table above.

3. **Talk-through**  
   In a pure MD alive–causes model, absolute \(q^{(j)}\) is the probability of being in absorbing cause-state \(j\).

4. **How to memorize**  
   Tau ↔ still in 0; cause j ↔ transition to j.

5. **Mnemonic**  
   “**Tau is stay-alive; j is exit label.**”

---

# Part C: MULTIPLE LIFE MODELS

---

## C1. Multiple life probabilities

### C1.1 — Joint-life status \(xy\)

1. **Name / when used**  
   First death fails the status. Cue: “joint life,” bar over \(xy\) in some texts; ACTEX uses \(xy\) vs \(\overline{xy}\) carefully—here **joint** = both alive.

2. **Formula**
   \[
   {}_t p_{xy} = \Pr(T_{xy}>t)=\Pr(T_x>t,\,T_y>t)=e^{-\int_0^t \mu_{x+s:y+s}\,ds}
   \]
   \[
   {}_t q_{xy} = \Pr(T_{xy}\le t)=\Pr(\text{at least one fails within }t)
   \]

3. **Talk-through**  
   Joint lifetime is the *minimum* lifetime. Force is the joint force of failure of the joint status.

4. **How to memorize**  
   Joint fails when the first fails.

5. **Mnemonic**  
   “**Joint = both alive; dies at the first death.**”

---

### C1.2 — Last-survivor status \(\overline{xy}\)

1. **Name / when used**  
   Status fails only at the second death.

2. **Formula**
   \[
   {}_t q_{\overline{xy}} = \Pr(T_{\overline{xy}}\le t)=\Pr(T_x\le t)\Pr(T_y\le t)
   \quad\text{(independent case identity on sheet)}
   \]
   \[
   {}_t p_{\overline{xy}} = \Pr(\text{at least one alive after }t)
   \]

3. **Talk-through**  
   Last survivor lifetime is the *maximum*. Failure means both are dead.

4. **How to memorize**  
   Last survivor “dies” at the second death.

5. **Mnemonic**  
   “**Last survivor = at least one alive.**”

---

### C1.3 — Joint vs last-survivor time splits

1. **Name / when used**  
   Know which status factors and which does **not**.

2. **Formula**
   \[
   {}_{t+u}p_{xy} = {}_t p_{xy}\, {}_u p_{x+t:y+t}
   \]
   \[
   {}_{t|u}q_{xy} = {}_t p_{xy} - {}_{t+u}p_{xy} = {}_t p_{xy}\, {}_u q_{x+t:y+t}
   \]
   \[
   {}_{t+u}p_{\overline{xy}} \neq {}_t p_{\overline{xy}}\, {}_u p_{\overline{x+t:y+t}}
   \]
   (last-survivor does **not** factor the same way)

3. **Talk-through**  
   Joint status is a proper survival status with multiplicative Chapman identity. Last survivor is not a simple “both must survive” clock—so the naive split fails.

4. **How to memorize**  
   Only joint-life gets the clean \(p\cdot p\) split.

5. **Mnemonic**  
   “**Joint splits; last survivor doesn’t.**”

---

### C1.4 — Contingent probabilities

1. **Name / when used**  
   “\(x\) dies first,” “\(x\) dies second,” within \(t\) years.

2. **Formula**
   \[
   {}_t q^{1}_{xy} = \Pr(T_x<T_y,\, T_x\le t)
   \]
   \[
   {}_t q^{1}_{yx} = \Pr(T_y<T_x,\, T_y\le t)
   \]
   \[
   {}_t q^{2}_{xy} = \Pr(T_y<T_x\le t)
   \]
   \[
   {}_t q^{2}_{yx} = \Pr(T_x<T_y\le t)
   \]

3. **Talk-through**  
   Superscript 1 = first death is that life; 2 = second death is that life. Order of ages in the subscript marks whose death is referenced in standard contingent notation \(q^{1}_{xy}\) = \(x\) first.

4. **How to memorize**  
   Top-left number = order of that death among the two.

5. **Mnemonic**  
   “**1 means first death; 2 means second.**”

---

### C1.5 — Independent lifetimes

1. **Name / when used**  
   Default exam assumption unless common shock stated.

2. **Formula**
   \[
   \mu_{x+t:y+t} = \mu_{x+t}+\mu_{y+t}
   \]
   \[
   {}_t p_{xy} = {}_t p_x\, {}_t p_y
   \]
   \[
   {}_t q^{1}_{xy} = \int_0^t {}_s p_x\, {}_s p_y\, \mu_{x+s}\, ds
   \]
   \[
   {}_t q_{\overline{xy}} = {}_t q_x\, {}_t q_y
   \]
   \[
   {}_t q^{2}_{xy} = \int_0^t {}_s p_x\, {}_s q_y\, \mu_{x+s}\, ds
   \]

3. **Talk-through**  
   Forces add; joint survival multiplies. \(x\) first: both alive, then \(x\) dies. \(x\) second: \(y\) already dead, \(x\) still alive, then \(x\) dies.

4. **How to memorize**  
   First-death integrand has \(p_x p_y \mu_x\); second-death has \(p_x q_y \mu_x\).

5. **Mnemonic**  
   “**First: both-p times mu; second: my-p times your-q times mu.**”

---

### C1.6 — Fundamental relations

1. **Name / when used**  
   Connect single, joint, last-survivor, contingent.

2. **Formula**
   \[
   {}_t p_{xy}+{}_t q_{xy}=1,\qquad
   {}_t q_{\overline{xy}}+{}_t p_{\overline{xy}}=1
   \]
   \[
   {}_t q_{xy} = {}_t q^{1}_{xy}+{}_t q^{1}_{yx}
   \]
   \[
   {}_t q_{\overline{xy}} = {}_t q^{2}_{xy}+{}_t q^{2}_{yx}
   \]
   \[
   {}_t p_x+{}_t p_y = {}_t p_{xy}+{}_t p_{\overline{xy}}
   \]
   \[
   {}_t q_x+{}_t q_y = {}_t q_{xy}+{}_t q_{\overline{xy}}
   \]
   \[
   {}_t q_x = {}_t q^{1}_{xy}+{}_t q^{2}_{xy},\qquad
   {}_t q_y = {}_t q^{1}_{yx}+{}_t q^{2}_{yx}
   \]

3. **Talk-through**  
   “Sum of singles = joint + last survivor” is the workhorse identity for insurance and annuities too.

4. **How to memorize**  
   Inclusion of min and max: \(T_x+T_y = T_{xy}+T_{\overline{xy}}\) in the appropriate EPV sense.

5. **Mnemonic**  
   “**x plus y equals joint plus last survivor.**”

---

## C2. Insurance, annuities, premiums & reserves (multiple lives)

### C2.1 — Insurance symbols

1. **Name / when used**  
   Pay on first death, second death, or contingent order.

2. **Formula** *(EPV meanings)*
   - \(\bar A_{xy}\) / \(A_{xy}\): 1 on **first** death
   - \(\bar A_{\overline{xy}}\) / \(A_{\overline{xy}}\): 1 on **second** death
   - \(\bar A^{1}_{xy}\) / \(A^{1}_{xy}\): 1 on \(x\)’s death if \(x\) dies **first**
   - \(\bar A^{2}_{xy}\) / \(A^{2}_{xy}\): 1 on \(x\)’s death if \(x\) dies **second**

3. **Talk-through**  
   Match the status failure time to the payment time.

4. **How to memorize**  
   Same superscript language as contingent qs.

5. **Mnemonic**  
   “**Insurance pays when that status fails.**”

---

### C2.2 — Insurance relations

1. **Name / when used**  
   Re-express awkward symbols via singles and joints.

2. **Formula**
   \[
   \bar A_x+\bar A_y = \bar A_{xy}+\bar A_{\overline{xy}}
   \]
   \[
   \bar A_{xy} = \bar A^{1}_{xy}+\bar A^{1}_{yx}
   \]
   \[
   \bar A_{\overline{xy}} = \bar A^{2}_{xy}+\bar A^{2}_{yx}
   \]
   \[
   \bar A_x = \bar A^{1}_{xy}+\bar A^{2}_{xy}
   \]
   (and discrete analogs with \(A\))

3. **Talk-through**  
   Identical structure to the probability relations.

4. **How to memorize**  
   Mirror the \(p/q\) identities with \(A\)’s.

5. **Mnemonic**  
   “**A’s obey the same plus-joint-plus-last algebra.**”

---

### C2.3 — Annuity symbols & relations

1. **Name / when used**  
   Pay until first death, until second death, or reversionary to \(y\) after \(x\).

2. **Formula**
   - \(\bar a_{xy}\) / \(\ddot a_{xy}\): until **first** death
   - \(\bar a_{\overline{xy}}\) / \(\ddot a_{\overline{xy}}\): until **second** death
   - \(\bar a_{x|y}\) / \(\ddot a_{x|y}\): to \(y\), starting only after \(x\) dies
   \[
   \bar a_x+\bar a_y = \bar a_{xy}+\bar a_{\overline{xy}}
   \]
   \[
   \bar a_{x|y} = \bar a_y - \bar a_{xy}
   \]
   (due analogs with \(\ddot a\))

3. **Talk-through**  
   Reversionary annuity = “y’s annuity minus the joint annuity” because joint already pays while both live; subtracting leaves only the part while \(y\) lives alone after \(x\).

4. **How to memorize**  
   \(x|y\) = after \(x\), to \(y\).

5. **Mnemonic**  
   “**Reversionary: y minus joint.**”

---

### C2.4 — Insurance ↔ annuity identities

1. **Name / when used**  
   Continuous/discrete conversions under constant force of interest.

2. **Formula**
   \[
   \bar A_{xy} = 1 - \delta \bar a_{xy},\qquad
   A_{xy} = 1 - d\,\ddot a_{xy}
   \]
   \[
   \bar A_{\overline{xy}} = 1 - \delta \bar a_{\overline{xy}},\qquad
   A_{\overline{xy}} = 1 - d\,\ddot a_{\overline{xy}}
   \]

3. **Talk-through**  
   Same identity as single life, applied to each status.

4. **How to memorize**  
   \(A=1-\delta a\) for continuous level statuses.

5. **Mnemonic**  
   “**Status A equals one minus delta times status a.**”

---

### C2.5 — Covariances of joint/last present values

1. **Name / when used**  
   Variance of joint vs last survivor PV questions.

2. **Formula**
   \[
   \operatorname{Cov}(v^{T_{xy}}, v^{T_{\overline{xy}}})
   = (\bar A_x-\bar A_{xy})(\bar A_y-\bar A_{xy})
   \]
   \[
   \operatorname{Cov}(\bar a_{T_{xy}}, \bar a_{T_{\overline{xy}}})
   = (\bar a_x-\bar a_{xy})(\bar a_y-\bar a_{xy})
   \]

3. **Talk-through**  
   Using \(T_x+T_y=T_{xy}+T_{\overline{xy}}\) type identities yields these product covariances.

4. **How to memorize**  
   Product of “(single − joint)” terms.

5. **Mnemonic**  
   “**Cov joint/last: product of (single minus joint).**”

---

## C3. Multiple life Markov models

### C3.1 — Classical model vs common shock model

1. **Name / when used**  
   Two-life state space; common shock adds simultaneous death force \(\mu^{03}\).

2. **Formula** *(forces)*
   - Classical: \(\mu^{01},\mu^{02}\) from both-alive; \(\mu^{13}\) from \(x\)-alive-\(y\)-dead; \(\mu^{23}\) from \(y\)-alive-\(x\)-dead
   - Common shock: same plus \(\mu^{03}_{x+t:y+t}\) both-alive → both-dead

3. **Talk-through**  
   States: 0 both alive; 1 only \(x\); 2 only \(y\); 3 both dead. Common shock allows direct 0→3.

4. **How to memorize**  
   Shock = lightning bolt both at once.

5. **Mnemonic**  
   “**Common shock adds mu-zero-three.**”

---

### C3.2 — Notation map: multiple life ↔ multiple state

| Multiple life | Multiple state | Meaning |
|---|---|---|
| \( {}_t p_{xy} \) | \( {}_t p^{00} \) | both alive |
| \( {}_t q_{xy} \) | \( {}_t p^{01}+{}_t p^{02}+{}_t p^{03} \) | joint status failed |
| \( {}_t q_{\overline{xy}} \) | \( {}_t p^{03} \) | both dead |
| \( {}_t p_{\overline{xy}} \) | \( {}_t p^{00}+{}_t p^{01}+{}_t p^{02} \) | at least one alive |
| \( {}_t p_x \) | \( {}_t p^{00}+{}_t p^{01} \) | \(x\) alive |
| \( {}_t q_x \) | \( {}_t p^{02}+{}_t p^{03} \) | \(x\) dead |
| \( {}_t p_y \) | \( {}_t p^{00}+{}_t p^{02} \) | \(y\) alive |
| \( {}_t q_y \) | \( {}_t p^{01}+{}_t p^{03} \) | \(y\) dead |
| \( {}_t q^{1}_{xy} \) | \(\int {}_s p^{00}\mu^{02}\,ds\) \(\neq {}_t p^{02}\) | \(x\) dies first within \(t\) |
| \( {}_t q^{1}_{yx} \) | \(\int {}_s p^{00}\mu^{01}\,ds\) \(\neq {}_t p^{01}\) | \(y\) dies first within \(t\) |
| \( {}_t q^{2}_{xy} \) | \(\int {}_s p^{00}\mu^{01}\,{}_{t-s}p^{13}\,ds\) \(\neq {}_t p^{03}\) | \(x\) dies second within \(t\) |
| \( {}_t q^{2}_{yx} \) | \(\int {}_s p^{00}\mu^{02}\,{}_{t-s}p^{23}\,ds\) \(\neq {}_t p^{03}\) | \(y\) dies second within \(t\) |

1. **Name / when used**  
   Translate contingent probs into Markov integrals; **remember ≠ occupancy** for contingent events.

2. **Formula** — table.

3. **Talk-through**  
   Being in “only \(y\) alive” at time \(t\) is not the same as “\(x\) died first within \(t\)” if further moves can occur—hence the integrals and the ≠ warnings on the sheet.

4. **How to memorize**  
   Contingent needs path timing; occupancy is only a snapshot.

5. **Mnemonic**  
   “**Contingent integrates paths; occupancy is a photo.**”

---

# Part D: PROFIT ANALYSIS

---

## D1. Profit testing

### D1.1 — Premium / assumption vocabulary

1. **Name / when used**  
   Clarify net vs gross vs reserve vs pricing vs profit-test bases.

2. **Formula** *(principles)*
   - Equivalence → net premiums cover benefits
   - Equivalence on gross → gross covers benefits + expenses
   - Otherwise gross also loads profit
   - **Reserve assumptions:** regulator / valuation
   - **Pricing assumptions:** company premium basis
   - **Profit test assumptions:** experience basis for emerging profit

3. **Talk-through**  
   Three “worlds” of assumptions. Profit testing uses the experience world with pre-fixed premiums and reserves.

4. **How to memorize**  
   Net ⊂ benefits; gross ⊂ benefits+expenses(+profit).

5. **Mnemonic**  
   “**Reserve legal, pricing quote, profit-test experience.**”

---

### D1.2 — Expected profit emerging at \(t+1\)

1. **Name / when used**  
   Core profit vector entry for traditional policies.

2. **Formula**
   \[
   \mathrm{Pr}_{t+1}
   = ({}_t V + G_t - E_t)(1+i_t)
   - (DB_{t+1}+E^{DB}_{t+1})\, q_{x+t}
   - {}_{t+1}V\, p_{x+t}
   \]
   Modify \(q,p\) to MD/MS/ML probabilities as needed.

3. **Talk-through**  
   Bring forward reserve + premium − expenses with interest; pay death costs; set up end-of-year reserve for survivors. What’s leftover is expected profit.

4. **How to memorize**  
   Same shape as a reserve recursion, but solved for the residual profit instead of forcing equivalence.

5. **Mnemonic**  
   “**Grow the pot; pay deaths; post next V; leftover is Pr.**”

---

## D2. Profit measures

### D2.1 — Profit vector and signature

1. **Name / when used**  
   Time-\(k\) expected profit per policy in force at 0 vs per starter.

2. **Formula**
   \[
   \Pi_k = {}_{k-1}p_x\, \mathrm{Pr}_k,\qquad \Pi_0=\mathrm{Pr}_0
   \]
   (\(\mathrm{Pr}_0\) usually pre-contract expenses only.)

3. **Talk-through**  
   Signature discounts for survivorship to the start of the year so NPV is per policy issued.

4. **How to memorize**  
   Signature = survival-weighted profit vector.

5. **Mnemonic**  
   “**Signature multiplies Pr by survivors to date.**”

---

### D2.2 — IRR, NPV, partial NPV, DPP, margin

1. **Name / when used**  
   Capital budgeting metrics for a product.

2. **Formula**
   \[
   \sum_{k=0}^n \frac{\Pi_k}{(1+\mathrm{IRR})^k}=0
   \]
   \[
   \mathrm{NPV}=\sum_{k=0}^n \frac{\Pi_k}{(1+r)^k}
   \]
   \[
   \mathrm{NPV}(t)=\sum_{k=0}^t \frac{\Pi_k}{(1+r)^k}
   \]
   \[
   \text{DPP}=\min\{m:\mathrm{NPV}(m)\ge 0\}
   \]
   \[
   M=\frac{\mathrm{NPV}}{\mathrm{EPV(Premiums)}}
   \]
   with EPV(premiums) at hurdle rate \(r\). Premiums can be solved to a target \(M\); reserves may be **zeroized**.

3. **Talk-through**  
   IRR zeros NPV. Hurdle rate \(r\) values the signature. DPP is first break-even duration. Margin scales NPV by PV of premiums.

4. **How to memorize**  
   All are just PV operations on \(\Pi_k\).

5. **Mnemonic**  
   “**IRR roots; NPV discounts; DPP first nonnegative partial NPV.**”

---

## D3. Actual profit & gain by source

### D3.1 — Analysis of surplus order

1. **Name / when used**  
   Attribute overall gain to interest, expense, mortality.

2. **Formula**
   \[
   \text{Overall gain}=\text{Actual profit}-\text{Expected profit}
   \]
   Usual order: **Interest → Expense → Mortality**
   \[
   \begin{align*}
   \text{Gain interest}
   &=\mathrm{Profit}(A_i,E_e,E_m)-\mathrm{Profit}(E_i,E_e,E_m)\\
   \text{Gain expense}
   &=\mathrm{Profit}(A_i,A_e,E_m)-\mathrm{Profit}(A_i,E_e,E_m)\\
   \text{Gain mortality}
   &=\mathrm{Profit}(A_i,A_e,A_m)-\mathrm{Profit}(A_i,A_e,E_m)
   \end{align*}
   \]
   \[
   \text{Overall}=\text{interest}+\text{expense}+\text{mortality gains}
   \]

3. **Talk-through**  
   Change one assumption at a time from expected to actual in the fixed order; each step’s profit difference is that source’s gain.

4. **How to memorize**  
   Ladder: flip interest, then expense, then mortality.

5. **Mnemonic**  
   “**I then E then M — climb the actual ladder.**”

---

# Part E: UNIVERSAL LIFE INSURANCE

---

## E1. UL account values

### E1.1 — Notation

1. **Name / when used**  
   Account value roll-forward ingredients.

2. **Formula** *(definitions)*
   - \(AV_t\): account value  
   - \(P_t\): premium  
   - \(EC_t\): expense charge  
   - \(i^c_t\): credited interest  
   - \(\mathrm{CoI}_t\): cost of insurance  
   - \(q^*_{x+t}\): CoI mortality  
   - \(i^*\): CoI discount rate  
   - \(FA\): face amount  
   - \(SC_t\): surrender charge  

3. **Talk-through**  
   Separate *credited* fund rate from *CoI* pricing rate.

4. **How to memorize**  
   Stars = CoI basis; \(c\) = credited.

5. **Mnemonic**  
   “**Star for CoI; c for credited.**”

---

### E1.2 — Type A vs Type B account value equations

1. **Name / when used**  
   Type A = level face (corridor on NAR); Type B = face plus account.

2. **Formula**
   **Type A**
   \[
   (AV_t+P_t-EC_t)(1+i^c_t)
   = \frac{1+i^c_t}{1+i^*}q^*_{x+t}\, FA
   + \Big(1-\frac{1+i^c_t}{1+i^*}q^*_{x+t}\Big) AV_{t+1}
   \]
   \[
   \mathrm{CoI}_{t+1}=\frac{1}{1+i^*}q^*_{x+t}(FA-AV_{t+1})
   \]
   \[
   ADB_{t+1}=FA-AV_{t+1},\quad DB_{t+1}=FA
   \]

   **Type B**
   \[
   (AV_t+P_t-EC_t)(1+i^c_t)
   = \frac{1+i^c_t}{1+i^*}q^*_{x+t}\, FA + AV_{t+1}
   \]
   \[
   \mathrm{CoI}_{t+1}=\frac{1}{1+i^*}q^*_{x+t}\, FA
   \]
   \[
   ADB_{t+1}=FA,\quad DB_{t+1}=FA+AV_{t+1}
   \]

   **Both:** \(SB_t = AV_{t+1}-SC_{t+1}\) *(sheet timing: surrender benefit from account after roll-forward less surrender charge).*

3. **Talk-through**  
   Premium nets expense charge, credits interest, then CoI is taken. Type A CoI uses net amount at risk \(FA-AV\); Type B charges CoI on full face while DB returns face+AV.

4. **How to memorize**  
   A: constant DB ⇒ shrinking NAR. B: fixed ADB ⇒ DB grows with AV.

5. **Mnemonic**  
   “**A: face fixed, CoI on face minus AV. B: CoI on face, DB face plus AV.**”

---

## E2. UL corridor requirement

### E2.1 — Corridor factor \(\gamma\)

1. **Name / when used**  
   Tax / qualification corridor forcing DB ≥ \(\gamma \times AV\).

2. **Formula**
   - **Type A:** Compute \(AV_{t+1}\). If \(\gamma AV_{t+1}\le FA\), OK. If \(\gamma AV_{t+1}>FA\), replace \(FA\) by \(\gamma AV_{t+1}\) and recompute \(AV_{t+1}\). Revised DB \(=\gamma AV_{t+1}\).
   - **Type B:** Same idea comparing \(\gamma AV\) to \(FA+AV\); if corridor binds, replace \(FA+AV\) by \(\gamma AV\) and recompute. Revised DB \(=\gamma AV_{t+1}\).

3. **Talk-through**  
   Corridor can force a higher death benefit, which increases CoI and feeds back into AV—hence the recalculation loop.

4. **How to memorize**  
   Check \(\gamma AV\) vs current DB definition; if too big, lift DB and redo.

5. **Mnemonic**  
   “**Corridor: gamma AV must not exceed DB; if it does, raise DB and recalc.**”

---

## E3. UL reserves

### E3.1 — Type A NLG reserve

1. **Name / when used**  
   No-lapse guarantee reserve when account may be insufficient vs net premium reserve of face.

2. **Formula**
   \[
   {}_t V^{NLG}
   = \max\big(0,\, (FA)\, A^{1}_{x+t:\overline{n-t}|} - AV_t\big)
   \]
   with EPV of Type A DB referenced as \((FA)A^{1}_{x+t:\overline{n-t}|}\).

3. **Talk-through**  
   If the actuarial PV of remaining pure endowment-style death cover exceeds AV, hold the difference (floored at 0).

4. **How to memorize**  
   NLG reserve = max(0, benefit liability − AV).

5. **Mnemonic**  
   “**NLG: max zero of A-prime face minus account.**”

---

## E4. UL profit testing

### E4.1 — Expected profit with death and surrender

1. **Name / when used**  
   Profit test using account values as the “reserve-like” fund, with decrements death \(d\) and withdrawal \(w\).

2. **Formula**
   \[
   \begin{align*}
   \mathrm{Pr}_{t+1}
   &= (AV_t + P_t - E_t)(1+i_t)\\
   &\quad - (DB_{t+1}+E^{DB}_{t+1})q^{(d)}_{x+t}\\
   &\quad - (SB_{t+1}+E^{SB}_{t+1})q^{(w)}_{x+t}\\
   &\quad - AV_{t+1}\, p^{(\tau)}_{x+t}
   \end{align*}
   \]
   *(Sheet writes \(AV_{t-1}\) in one place; standard timing is begin-year account \(AV_t\) with premium—follow the contract timing in the problem.)*

3. **Talk-through**  
   Same emerging-profit logic, but end “reserve” is the survivor account value, and surrenders have their own benefit/expense.

4. **How to memorize**  
   Two exit drains + survivor AV.

5. **Mnemonic**  
   “**UL profit: grow AV pot; pay death & surrender; keep survivor AV.**”

---

# Part F: EMBEDDED OPTIONS AND EQUITY-LINKED INSURANCE

---

## F1. Embedded options

### F1.1 — Four popular guarantees

1. **Name / when used**  
   Name the GMxB zoo.

2. **Formula** *(names)*
   - GMDB — guaranteed minimum death benefit  
   - GMAB / GMMB — guaranteed minimum accumulation / maturity benefit  
   - GMWB — guaranteed minimum withdrawal benefit  
   - GMIB — guaranteed minimum income benefit  

3. **Talk-through**  
   Each floors a benefit on death, maturity, withdrawals, or annuitization.

4. **How to memorize**  
   D/A-M/W/I = death / accumulation-maturity / withdrawal / income.

5. **Mnemonic**  
   “**GMxB: Death, Accumulation/Maturity, Withdrawal, Income.**”

---

### F1.2 — GMDB return-of-premium (put)

1. **Name / when used**  
   Payoff \(\max(0,K-S_T)\) at death time \(T\).

2. **Formula**
   \[
   \text{Time-}T\text{ payoff}=\max(0,K-S_T)
   \]
   \[
   \text{Time-0 value}=\int_0^{\infty} P(K,t)\, f_T(t)\, dt
   \]
   where \(P(K,t)\) = put price strike \(K\) expiry \(t\); \(f_T\) density of lifetime.

3. **Talk-through**  
   At death, put the fund vs premium guarantee. Value = average put price over the random death time.

4. **How to memorize**  
   ROP GMDB = life-contingent put.

5. **Mnemonic**  
   “**ROP death: integrate puts against lifetime density.**”

---

### F1.3 — Earnings-enhanced death benefit (call)

1. **Name / when used**  
   Pay fraction of fund gain on death.

2. **Formula**
   \[
   \text{payoff}=\alpha\max(0,S_T-K)
   \]
   \[
   \text{value}=\alpha\int_0^{\infty} C(K,t)\, f_T(t)\, dt
   \]

3. **Talk-through**  
   Same as GMDB but call × α.

4. **How to memorize**  
   Enhanced earnings → call not put.

5. **Mnemonic**  
   “**Earnings-enhanced: alpha times integrated calls.**”

---

### F1.4 — GMAB/GMMB return-of-premium

1. **Name / when used**  
   Maturity guarantee at fixed \(\tau\) if still in force.

2. **Formula**
   \[
   \text{payoff at }\tau=\max(0,K-S_\tau)\quad\text{on }\{T^*>\tau\}
   \]
   \[
   \text{value}=P(K,\tau)\times\Pr(T^*>\tau)
   \]

3. **Talk-through**  
   Survival to guarantee date times ordinary put—no integral over death time.

4. **How to memorize**  
   Fixed expiry × survival probability.

5. **Mnemonic**  
   “**Maturity ROP: one put times survival.**”

---

### F1.5 — GMMB Black–Scholes-style explicit value

1. **Name / when used**  
   Closed form when fund follows GBM / BS world with management charge drag \(\xi\).

2. **Formula**
   Definitions: fund \(F_t\), maturity \(n\), premium \(P\), expense \(e\), mgmt \(m\), index \(S_0=1\),
   \[
   \xi=(1-e)(1-m)^{n-1}
   \]
   \[
   \pi(0)=P\, {}_n p_x\Big(e^{-rn}\Phi(-d_2)-\xi\Phi(-d_1)\Big)
   \]
   \[
   d_1=\frac{\ln\xi+(r+\tfrac12\sigma^2)n}{\sigma\sqrt{n}},\qquad
   d_2=d_1-\sigma\sqrt{n}
   \]
   Time-\(t\) reserve:
   \[
   \pi(t)=P\, {}_{n-t}p_{x+t}\Big(e^{-r(n-t)}\Phi(-d_2)-S_t\xi\Phi(-d_1)\Big)
   \]
   \[
   d_1=\frac{\ln(S_t\xi)+(r+\tfrac12\sigma^2)(n-t)}{\sigma\sqrt{n-t}},\qquad
   d_2=d_1-\sigma\sqrt{n-t}
   \]

3. **Talk-through**  
   It’s a put on a prepaid forward that already embeds fee drag \(\xi\). Multiply by survival. As time passes, replace \(n\) by remaining term and insert current index level \(S_t\).

4. **How to memorize**  
   Standard BS put with \(S_0\xi\) playing the role of asset, strike 1 on premium \(P\) scaling; times \({}_np_x\).

5. **Mnemonic**  
   “**GMMB: survival times BS put with fee factor xi.**”

---

### F1.6 — GMDB continuous / monthly sums

1. **Name / when used**  
   Path of option values averaged over death.

2. **Formula**
   \[
   \pi(0)=\int_0^n v(0,t)\, {}_t p_x\, \mu_{x+t}\, dt
   \]
   \[
   \pi(0)=\sum_{t=0}^{12n-1} v\big(0,t/12\big)\, {}_{(t)/12}p_x\, {}_{1/12}q_{x+t/12}
   \]
   with \(v(0,t)=\mathbb{E}^Q_0[e^{-rt}h(t)]\).

3. **Talk-through**  
   Continuous: option value density × mortality density. Monthly: Riemann sum with monthly death probs.

4. **How to memorize**  
   Same pattern as \(\bar A\) but \(v(0,t)\) replaces \(v^t\).

5. **Mnemonic**  
   “**GMDB value: option PV weighted like A-bar.**”

---

## F2. Hedging and rebalancing

### F2.1 — GMMB hedge portfolio

1. **Name / when used**  
   Delta hedge the maturity guarantee.

2. **Formula**
   \[
   \pi(t)={}_{n-t}p_{x+t}\,\nu(t,n)
   \]
   \[
   \text{Stock part}
   ={}_{n-t}p_{x+t}\Big(\frac{\partial}{\partial S_t}\nu(t,n)\Big)S_t
   \]
   \[
   \text{Bond part}
   =\pi(t)-{}_{n-t}p_{x+t}\Big(\frac{\partial}{\partial S_t}\nu(t,n)\Big)S_t
   \]

3. **Talk-through**  
   Survive-weighted option value; stock holds the delta × spot; bond is the residual.

4. **How to memorize**  
   Classic delta-hedge split, times survival.

5. **Mnemonic**  
   “**GMMB hedge: survival × (delta stock + residual bond).**”

---

### F2.2 — GMDB hedge portfolio

1. **Name / when used**  
   Hedge when expiry is the random death time.

2. **Formula**
   \[
   \pi(t)=\int_0^{n-t}\nu(t,w+t)\, {}_w p_{x+t}\, \mu_{x+t+w}\, dw
   \]
   \[
   \text{Stock}
   =\int_0^{n-t} S_t\Big(\frac{\partial\nu}{\partial S_t}\Big)\, {}_w p\, \mu\, dw
   \]
   \[
   \text{Bond}
   =\int_0^{n-t}\Big(\nu-S_t\frac{\partial\nu}{\partial S_t}\Big)\, {}_w p\, \mu\, dw
   \]

3. **Talk-through**  
   Integrate the GMMB-style hedge across possible remaining lifetimes.

4. **How to memorize**  
   GMDB hedge = mortality-mix of maturity hedges.

5. **Mnemonic**  
   “**GMDB hedge integrates GMMB hedges over death time.**”

---

## F3. Profit testing (embedded options)

### F3.1 — Columns if company **buys** options

1. **Name / when used**  
   Profit test layout when risk is reinsured/hedged by purchasing options.

2. **Formula** *(signed columns)*
   - \(+\) Initial expense charge (first period, if any)  
   - \(+\) Management charge  
   - \(-\) Expenses  
   - \(-\) Risk premium  
   - \(+\) Release of beginning reserve (if any)  
   - \(+\) Interest (if any)  
   - \(-\) Reserve per survivor at end (if any)

3. **Talk-through**  
   Charges in; expenses and option/risk premium out; reserve unwind as usual.

4. **How to memorize**  
   Buy options ⇒ pay risk premium line.

5. **Mnemonic**  
   “**Buy hedge: subtract risk premium.**”

---

### F3.2 — Columns if company hedges **internally**

1. **Name / when used**  
   Internal delta-hedge profit test.

2. **Formula** *(signed columns)*
   - \(+\) Initial expense charge  
   - \(+\) Management charge  
   - \(-\) Expenses  
   - \(+\) Release of beginning reserve  
   - \(+\) Interest  
   - \(-\) GMxB cost  
   - \(-\) Hedging/rehedging cost  
   - \(-\) End reserve per survivor  

3. **Talk-through**  
   No external risk premium; instead see guarantee cost and rebalancing P&L.

4. **How to memorize**  
   Internal ⇒ GMxB + rehedge lines replace risk premium.

5. **Mnemonic**  
   “**Internal hedge: GMxB cost and rehedge cost.**”

---

## F4. Equity-linked insurance (general fund)

### F4.1 — Fund recursion

1. **Name / when used**  
   Unit-linked / EL fund update.

2. **Formula**
   \[
   F_{t+1}=(F_t+AP_t)\big(1+i^f_t\big)-MC_{t+1}
   \]
   with \(AP_t\) allocated premium, \(i^f\) fund return, \(MC\) management charge.

3. **Talk-through**  
   Allocate premium into fund, earn fund return, skim management charge.

4. **How to memorize**  
   \((F+AP)(1+i^f)-MC\).

5. **Mnemonic**  
   “**Fund: add allocated, credit fund i, subtract MC.**”

---

### F4.2 — Insurer expected profit

1. **Name / when used**  
   Company cashflows on unallocated premium, charges, guarantees, reserves.

2. **Formula**
   \[
   \begin{align*}
   \mathrm{Pr}_{t+1}
   &= ({}_t V + UAP_t - E_t)(1+i^a_t) + MC_{t+1}\\
   &\quad - (DB_{t+1}-F_{t+1})q^{(d)}_{x+t}\\
   &\quad - (CV_{t+1}-F_{t+1})q^{(w)}_{x+t}\\
   &\quad - {}_{t+1}V\, p^{00}_{x+t}
   \end{align*}
   \]
   where \(UAP_t=P_t-AP_t\).

3. **Talk-through**  
   Insurer earns on assets backing reserve + unallocated premium − expenses; also receives MC. Extra death/surrender costs are only the excess of benefit over fund. Next reserve for those still in force (state 00).

4. **How to memorize**  
   Guarantee strain = benefit − fund, on exits.

5. **Mnemonic**  
   “**EL profit: UAP pot + MC − excess DB/CV over fund − next V.**”

---

# Part G: PENSIONS

---

## G1. Service table

### G1.1 — ALTAM service table decrements

1. **Name / when used**  
   Multiple-decrement employment table.

2. **Formula** *(decrement labels)*
   - \(d_x\) death  
   - \(i_x\) disability  
   - \(w_x\) withdrawal  
   - \(r_x\) retirement  

3. **Talk-through**  
   Same math as Part B with these cause names.

4. **How to memorize**  
   DIWR — death, disability, withdrawal, retirement.

5. **Mnemonic**  
   “**Service table: die, disable, withdraw, retire.**”

---

## G2. Salary scale & replacement ratio

### G2.1 — Salary rate, scale, and projection

1. **Name / when used**  
   Convert salary rates to annual earnings and project across ages.

2. **Formula**
   \[
   s_x=\int_0^1 \bar s_{x+t}\, dt
   \]
   \[
   \bar S_x \approx S_{x-0.5}
   \]
   \[
   S_y = S_x \frac{s_y}{s_x}
   \]

3. **Talk-through**  
   Scale \(s_x\) aggregates the salary-rate curve over the year of age. Project salary by ratio of scales.

4. **How to memorize**  
   Salaries move in proportion to \(s\).

5. **Mnemonic**  
   “**New salary: old times s-new over s-old.**”

---

### G2.2 — Replacement ratio & salary averages

1. **Name / when used**  
   Adequacy metric; FAS/CAS benefit bases.

2. **Formula**
   \[
   R=\frac{\text{pension income year after retirement}}{\text{salary year before retirement}}
   \]
   \[
   n_{x_r}=x_r-x_e
   \]
   \[
   TPE_{x_r}=S_{x_e}+\cdots+S_{x_r-1}
   \]
   \[
   S^F_{x_r}=\frac{S_{x_r-k}+\cdots+S_{x_r-1}}{k}
   \]
   \[
   S^C_{x_r}=\frac{TPE_{x_r}}{n_{x_r}}
   \]

3. **Talk-through**  
   Final average = last \(k\) years. Career average = total pensionable earnings / service years.

4. **How to memorize**  
   F = final window; C = career total over n.

5. **Mnemonic**  
   “**Final averages last k; career divides TPE by n.**”

---

## G3. Defined benefit plans

### G3.1 — Accrual and annual benefit

1. **Name / when used**  
   DB formula at retirement.

2. **Formula**
   \[
   B=n_{x_r}\,\alpha\, S^F_{x_r}
   \quad\text{(final average)}
   \]
   \[
   B=n_{x_r}\,\alpha\, S^C_{x_r}=\alpha\, TPE_{x_r}
   \quad\text{(career average)}
   \]
   Sponsor may need to fund \(B\ddot a_{x_r}\) at retirement; early retirement applies reduction \(RF_{x_r}\).

3. **Talk-through**  
   Benefit = service × accrual × average salary definition.

4. **How to memorize**  
   Career average collapses to \(\alpha\times TPE\).

5. **Mnemonic**  
   “**B equals n alpha salary-average; career is alpha TPE.**”

---

### G3.2 — APV of DB plan

1. **Name / when used**  
   EPV of future retirement benefits for a member now aged \(x\).

2. **Formula**
   **Final average**
   \[
   APV=\sum_{x_r} n_{x_r}\,\alpha\, S^F_{x_r}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]
   **Career average**
   \[
   APV=\sum_{x_r} \alpha\, TPE_{x_r}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]

3. **Talk-through**  
   Sum over possible retirement ages: amount × annuity × discount × retirement probability from the service table.

4. **How to memorize**  
   Benefit × annuity × \(v\) × \(r/l\).

5. **Mnemonic**  
   “**APV: sum retirement ages of B times a-double-dot times v times r over l.**”

---

### G3.3 — Accrued liability: PUC vs TUC

1. **Name / when used**  
   Projected Unit Credit vs Traditional Unit Credit accrued liability.

2. **Formula**
   **PUC — final average**
   \[
   AL=\sum_{x_r} n_x\,\alpha\, S^F_{x_r}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]
   **PUC — career average**
   \[
   AL=\sum_{x_r} n_x\,\alpha\, \frac{TPE_{x_r}}{n_{x_r}}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]
   **TUC — final average**
   \[
   AL=\sum_{x_r} n_x\,\alpha\, S^F_{x}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]
   **TUC — career average**
   \[
   AL=\sum_{x_r} \alpha\, TPE_{x}\,(1-RF_{x_r})\,\ddot a_{x_r}\, v^{x_r-x}\, \frac{r_{x_r}}{l_x}
   \]

3. **Talk-through**  
   Both credit current service years \(n_x\). **PUC projects** the salary average to retirement (\(S^F_{x_r}\) or full-career TPE). **TUC uses today’s** salary measure (\(S^F_x\) or \(TPE_x\)).

4. **How to memorize**  
   P = projected salary; T = today’s salary.

5. **Mnemonic**  
   “**PUC projects; TUC takes today’s salary.**”

---

### G3.4 — Normal contribution

1. **Name / when used**  
   Annual normal cost from reserve recursion / unit credit formulas.

2. **Formula**
   \[
   C = v\, p^{00}_x\, {}_1 V - {}_0 V + \mathrm{EPV(mid\text{-}year exit benefits)}
   \]
   No exit benefits, **PUC**:
   \[
   C={}_0 V\Big(\frac{1}{n}\Big)
   \]
   No exit benefits, **TUC**:
   \[
   C={}_0 V\Big(\frac{S_{x+1}}{S_x}\cdot\frac{n+1}{n}-1\Big)
   \]

3. **Talk-through**  
   General: discounted expected next AL minus current AL, plus mid-year exit benefit EPV. PUC without exits: each year accrues \(1/n\) of the projected AL pattern. TUC also inflates for next year’s salary and extra service year.

4. **How to memorize**  
   PUC NC ≈ AL/n; TUC NC adjusts for salary growth and \(n\to n+1\).

5. **Mnemonic**  
   “**PUC cost AL over n; TUC cost grows with salary and n-plus-one.**”

---

## G4. Retiree healthcare plans

### G4.1 — Benefit premium annuity \(\ddot a^{B}\)

1. **Name / when used**  
   EPV of a stream of medical premiums \(B(x,t)\) growing by age and time.

2. **Formula**
   \[
   \ddot a^{B}(x,t)=\sum_{k=0}^{\infty}\frac{B(x+k,t+k)}{B(x,t)}\, v^k\, {}_k p_x
   \]
   With factors \(c=B(x+1,t)/B(x,t)\) and \(1+j=B(x,t+1)/B(x,t)\):
   \[
   \ddot a^{B}(x,t)=\sum_{k=0}^{\infty} c^k (1+j)^k v^k\, {}_k p_x
   =\ddot a_x @ i^*
   \]
   where
   \[
   1+i^*=\frac{1+i}{c(1+j)}
   \]
   \[
   EPV=B(x,t)\,\ddot a^{B}(x,t)
   \]

3. **Talk-through**  
   Normalize by today’s premium; age and trend inflate future premiums. Absorb growth into a modified interest rate and use an ordinary annuity-due.

4. **How to memorize**  
   Trend factors fold into \(i^*\).

5. **Mnemonic**  
   “**Healthcare a-B: ordinary a at i-star with c and j in the denominator.**”

---

### G4.2 — AVTHB and APBO

1. **Name / when used**  
   Actuarial value of total health benefits; accumulated postretirement benefit obligation attribution.

2. **Formula**
   \[
   AVTHB=\sum_{t=0}^{65-x} B(x+t,t)\,\ddot a^{B}(x+t,t)\, v^t\, \frac{r_{x+t}}{l_x}
   \]
   or with \(B(x,0)\) factored and \(i^*\):
   \[
   AVTHB=B(x,0)\sum_{t=0}^{65-x} \ddot a_{x+t}@i^*\, (v^*)^t\, \frac{r_{x+t}}{l_x}
   \]
   (retirement no later than 65 on the sheet.)
   \[
   {}_0 V=\mathrm{APBO}
   =\sum_{t=0}^{65-x} B(x+t,t)\,\ddot a^{B}(x+t,t)\, v^t\, \frac{r_{x+t}}{l_x}
   \times \frac{x-x_0}{x+t-x_0}
   \]
   where \(x_0\) is attribution start age.

3. **Talk-through**  
   AVTHB values all future retiree medical EPVs weighted by retirement decrements. APBO attributes only the fraction of career already worked by attribution rules.

4. **How to memorize**  
   APBO = AVTHB pieces × service fraction.

5. **Mnemonic**  
   “**APBO multiplies each retirement slice by service fraction.**”

---

### G4.3 — Healthcare normal cost

1. **Name / when used**  
   Annual cost for retiree medical attribution.

2. **Formula**
   \[
   C=v p_x\, {}_1 V - {}_0 V + \mathrm{EPV(mid\text{-}year exit benefits)}
   \]
   No exit benefits:
   \[
   C={}_0 V\Big(\frac{1}{n}\Big)
   \]
   with \(n\) = years of service.

3. **Talk-through**  
   Same unit-credit style as pensions: next obligation discounted minus current, or simply APBO/n when clean.

4. **How to memorize**  
   Twin of pension NC formulas.

5. **Mnemonic**  
   “**Retiree medical NC: same recursion; or APBO over n.**”

---

# Closing recap checklist — formula families

Use this as a final “say it once” audio checklist.

### Part A — Multiple state
- [ ] \( {}_t p^{ij} \) vs sojourn \( {}_t p^{\overline{ii}} \)
- [ ] Chapman–Kolmogorov; Kolmogorov forward
- [ ] MLE \(\mu^{ij}=D^{ij}/T^{(i)}\)
- [ ] \(A^{ij},\bar A^{ij},\ddot a^{ij},\bar a^{ij}\) + term splits
- [ ] Woolhouse 2- and 3-term (diag vs off-diag)
- [ ] Discrete reserve recursion; **Thiele** + Euler
- [ ] DII matrices; PD probabilities; sick annuity with waiting period
- [ ] LTC / CI / CCRC / structured settlement state maps

### Part B — Multiple decrement
- [ ] \(\mu^{(\tau)}=\sum\mu^{(j)}\); absolute \(q^{(j)}\) vs primed \(q'^{(j)}\)
- [ ] \(p^{(\tau)}=\prod p'^{(j)}\); deferred \( {}_{t|u}q^{(j)} \)
- [ ] CFD vs UDD (MD table vs associated tables)
- [ ] MLE forces → \(q'=1-e^{-\mu}\)
- [ ] Exact-age decrements (begin/end/mid)
- [ ] \(A^{(j)},\bar a^{(\tau)}\); gross reserve recursion
- [ ] MD ↔ multi-state notation bridge

### Part C — Multiple lives
- [ ] Joint vs last survivor; contingent 1st/2nd
- [ ] Independent: \(p_{xy}=p_x p_y\); integrand patterns
- [ ] \(x+y=\text{joint}+\text{last}\) for \(p,q,A,a\)
- [ ] Reversionary \(a_{x|y}=a_y-a_{xy}\)
- [ ] \(A=1-\delta a\) on statuses; joint/last covariances
- [ ] Classical vs common-shock forces; contingent ≠ occupancy

### Part D — Profit
- [ ] Emerging \(\mathrm{Pr}_{t+1}\) recursion residual
- [ ] Signature \(\Pi_k\); IRR; NPV; DPP; margin
- [ ] Gain by source order **I → E → M**

### Part E — UL
- [ ] Type A vs B AV / CoI / DB / ADB
- [ ] Corridor \(\gamma\) recalc
- [ ] NLG reserve \(\max(0, FA\cdot A^1 - AV)\)
- [ ] UL profit with death & surrender

### Part F — Embedded / EL
- [ ] GMxB names; ROP put; earnings call; maturity put×survival
- [ ] GMMB BS formula with \(\xi\); GMDB integral/sum
- [ ] GMMB/GMDB delta hedges
- [ ] Buy-options vs internal-hedge profit columns
- [ ] Fund recursion; EL insurer profit with excess DB/CV

### Part G — Pensions / retiree medical
- [ ] Service table DIWR; salary scale ratios
- [ ] FAS/CAS; replacement ratio; \(B=n\alpha S\)
- [ ] APV; **PUC vs TUC** AL; NC formulas
- [ ] \(\ddot a^{B}\) at \(i^*\); AVTHB; APBO fraction; medical NC

---

**End of script.**  
Covered source: `ALTAM_FS.pdf`, pages **1–18**, Parts **A–G**.  
Approximate formula / formula-block count in this script: **~95** named blocks (plus model maps and notation tables).

*When a stacked PDF glyph was ambiguous, standard ALTAM/AMLCR notation was used and noted inline.*
