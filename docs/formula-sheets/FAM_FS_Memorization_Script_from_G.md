# FAM Formula Sheet — Memorization Script (from G. Option Pricing to End)

**Source:** `Exam_Prep/ALTAM/Formula Sheet/FAM_FS.pdf` (ACTEX Exam FAM formula sheet)  
**Scope:** From **G. Option Pricing** (FAM-S, pages 9–10) through the **entire FAM-L** continuation (pages 11–22: sections A–G). Everything after G. Option Pricing in the PDF is included.  
**Pages covered:** 9–22 (14 pages)

---

## How to use this script

1. **Read aloud / record:** Treat each **Talk-through** as a study audio script. Pause after the formula, then say the talk-through once slowly.
2. **Active recall:** Cover the formula, say the mnemonic, then write the math from memory.
3. **Anki:** Front = Name + “when used”; Back = Formula + Mnemonic. Put Talk-through in Extra.
4. **Order:** FAM-S options first, then FAM-L probability → interest → survival → insurance → annuities → premiums → reserves.
5. **Spelling:** These are **mnemonics** (memory aids), not “pneumonics.”

---

# PART I — FAM-S: G. Option Pricing
## G1. Put and Call Options
### 1. Call payoff

**When used:** European call at expiry; payoff before subtracting premium.

**Formula:**

$$
C(T)=\max\bigl(0,\, S(T)-K\bigr)
$$

**Talk-through:**

A call pays the stock minus the strike when that is positive, otherwise zero. You only exercise when the stock finishes above the strike.

**How to memorize:**

Picture a hockey-stick payoff starting at K on the stock axis. Height above K is S−K.

**Mnemonic:** CALL = Claim Above Listed Limit — stock above strike.

---
### 2. Call profit

**When used:** Economic profit after financing the call premium to time T.

**Formula:**

$$
\text{Profit}=C(T)-C(0)\,e^{rT}
$$

**Talk-through:**

Take the call payoff and subtract the future value of the premium you paid at time zero. The e to the rT grows the premium at the risk-free rate.

**How to memorize:**

Profit = payoff − FV(premium). Never forget to compound the premium.

**Mnemonic:** POFP — Pay Off Future Premium.

---
### 3. Put payoff

**When used:** European put at expiry.

**Formula:**

$$
P(T)=\max\bigl(0,\, K-S(T)\bigr)
$$

**Talk-through:**

A put pays the strike minus the stock when the stock is below the strike; otherwise zero. Mirror image of the call.

**How to memorize:**

Hockey stick opening left of K. Height is K−S.

**Mnemonic:** PUT = Protect Under Threshold — stock under strike.

---
### 4. Put profit

**When used:** Profit after financing the put premium.

**Formula:**

$$
\text{Profit}=P(T)-P(0)\,e^{rT}
$$

**Talk-through:**

Same structure as the call: payoff minus future-valued premium.

**How to memorize:**

Same template as call profit; swap C for P.

**Mnemonic:** Same POFP: Pay Off Future Premium.

---
### 5. Put-call parity

**When used:** No-arbitrage link between European call and put with same K and T (non-dividend stock).

**Formula:**

$$
C(0)-P(0)=S(0)-Ke^{-rT}
$$

**Talk-through:**

Long call and short put equals synthetic long forward: stock minus discounted strike. Left side is the option combo; right side is stock minus cash Ke to the minus rT.

**How to memorize:**

Call minus put equals stock minus cash. Or rearrange: C + Ke^{-rT} = P + S.

**Mnemonic:** CPS-K: Call − Put = Stock − Kash (discounted).

---

## G2. Binomial Option Pricing Model
### 6. One-step stock moves

**When used:** Binomial tree at time step h.

**Formula:**

$$
S_u=S(0)\,u,\qquad S_d=S(0)\,d
$$

**Talk-through:**

From today’s stock, multiply by up factor u or down factor d to get the two possible prices after one step of length h.

**How to memorize:**

u for up, d for down — always relative to S(0).

**Mnemonic:** UD: Up-multiplies, Down-multiplies.

---
### 7. Option payoffs at the node

**When used:** After computing Su, Sd, plug into the option payoff function.

**Formula:**

$$
V_u=\text{payoff}(S_u),\qquad V_d=\text{payoff}(S_d)
$$

**Talk-through:**

Vu and Vd are the option values (or terminal payoffs) in the up and down states.

**How to memorize:**

Compute stock first, then option — never reverse.

**Mnemonic:** STV — Stock Then Value.

---
### 8. Replicating delta

**When used:** Shares of stock in the replicating portfolio.

**Formula:**

$$
\Delta=\frac{V_u-V_d}{S_u-S_d}
$$

**Talk-through:**

Delta is the change in option value over the change in stock value between the two nodes. Same idea as a slope.

**How to memorize:**

Rise over run: option rise over stock rise.

**Mnemonic:** Δ = value-gap over stock-gap.

---
### 9. Replicating bond (cash) amount

**When used:** Amount in the money-market account for replication.

**Formula:**

$$
B=e^{-rh}\frac{u V_d-d V_u}{u-d}
$$

**Talk-through:**

B is the discounted crossed mix of the option payoffs with the up/down factors. You pair u with Vd and d with Vu, then discount by e to the minus r h.

**How to memorize:**

B uses opposite pairing: u with Vd, d with Vu — remember “cross weights.”

**Mnemonic:** Cross and Discount: uVd − dVu, then e^{−rh}.

*Note:* PDF text extraction looked garbled on this line; the standard no-arbitrage formula uses the crossed weights u Vd − d Vu.

---
### 10. Option price via replication

**When used:** Price as cost of replicating portfolio.

**Formula:**

$$
V(0)=\Delta\, S(0)+B
$$

**Talk-through:**

Buy Δ shares and put B in the bank (B may be negative, meaning borrow). That portfolio’s cost is the unique no-arbitrage option price.

**How to memorize:**

Stock piece plus bond piece.

**Mnemonic:** ΔS + B = Deal’s Starting Balance.

---
### 11. Risk-neutral probability

**When used:** Probability used under the risk-neutral measure for one step.

**Formula:**

$$
p^*=\frac{e^{rh}-d}{u-d}
$$

**Talk-through:**

p-star is the unique probability that makes the discounted stock a martingale. Numerator: growth factor minus down; denominator: up minus down.

**How to memorize:**

Think: where does e^{rh} sit between d and u? That fraction is p*.

**Mnemonic:** ERNUD: e^{rh} Relative to u and d.

---
### 12. Option price via risk-neutral expectation

**When used:** Preferred computational form on the exam.

**Formula:**

$$
V(0)=e^{-rh}\bigl(p^* V_u+(1-p^*)V_d\bigr)
$$

**Talk-through:**

Discount the risk-neutral expected payoff: p* on up, one-minus-p* on down, then multiply by e to the minus r h.

**How to memorize:**

Same pattern as pricing any contingent claim under the RN measure.

**Mnemonic:** DEP — Discount Expected Payoff.

---

## G3. Black–Scholes–Merton Model
### 13. Lognormal stock at T

**When used:** GBM under the risk-neutral measure.

**Formula:**

$$
S(T)=S(0)\exp\Bigl(\bigl(r-\tfrac{\sigma^2}{2}\bigr)T+\sigma\sqrt{T}\,Z\Bigr),\quad Z\sim N(0,1)
$$

**Talk-through:**

Log stock is normal. Drift is r minus half sigma squared — the Itô correction — plus sigma root-T times a standard normal.

**How to memorize:**

Remember the −σ²/2 inside the exp — forgetting it is the classic trap.

**Mnemonic:** HSSS — Half Sigma Squared Subtracted.

---
### 14. Black–Scholes call price

**When used:** European call, non-dividend paying stock.

**Formula:**

$$
C(0)=S(0)\,N(d_1)-Ke^{-rT}\,N(d_2)
$$

**Talk-through:**

Stock times N(d1) minus cash-strike times N(d2). First term is the share part; second is the discounted strike weighted by the in-the-money probability factor N(d2).

**How to memorize:**

SN − KN pattern: Stock-Nd1 minus Kash-Nd2.

**Mnemonic:** Socks Now, Kash Next — SN(d1), KN(d2).

---
### 15. Call delta (BSM)

**When used:** Hedge ratio for a call.

**Formula:**

$$
\Delta_C=N(d_1)
$$

**Talk-through:**

Call delta is simply N(d1), between 0 and 1.

**How to memorize:**

Call delta = Nd1 — no minus signs.

**Mnemonic:** Call’s Δ is Clean Nd1.

---
### 16. Black–Scholes put price

**When used:** European put, or via put-call parity.

**Formula:**

$$
P(0)=Ke^{-rT}\,N(-d_2)-S(0)\,N(-d_1)
$$

**Talk-through:**

Mirror of the call with signs flipped and N of negatives: cash times N(−d2) minus stock times N(−d1).

**How to memorize:**

Put = Kash Negative d2 − Stock Negative d1.

**Mnemonic:** Puts Prefer Negative Normals.

---
### 17. Put delta (BSM)

**When used:** Hedge ratio for a put (negative).

**Formula:**

$$
\Delta_P=-N(-d_1)
$$

**Talk-through:**

Put delta is minus N(−d1), between −1 and 0. Equivalent to N(d1)−1.

**How to memorize:**

Put delta = call delta − 1.

**Mnemonic:** Put Δ = Call Δ Minus One.

---
### 18. d1 and d2

**When used:** Arguments of the normal CDFs in BSM.

**Formula:**

$$
d_1=\frac{\log\bigl(S(0)/K\bigr)+\bigl(r+\sigma^2/2\bigr)T}{\sigma\sqrt{T}},\qquad d_2=d_1-\sigma\sqrt{T}
$$

**Talk-through:**

d1 puts log-moneyness plus (r + half variance)T over vol-root-T. d2 is d1 minus one vol-root-T step.

**How to memorize:**

Numerator uses +σ²/2 for d1 (contrast the −σ²/2 in the stock SDE). d2 = d1 − σ√T always.

**Mnemonic:** Plus half in d1; Drop sigma-root-T for d2.

---

---

# PART II — FAM-L (begins immediately after options in the PDF)

The PDF continues with a full **FAM-L** formula sheet (life contingencies). Everything below is from that continuation through the end of the PDF.

---

# A. Review of Probability

## A1. Basic Probability
### 19. CDF

**When used:** Definition of F.

**Formula:**

$$
F(x)=\Pr(X\le x)
$$

**Talk-through:**

The cumulative distribution function is the probability that X is at most x.

**How to memorize:**

F accumulates from the left.

**Mnemonic:** F = Floor-up Probability.

---
### 20. Survival function

**When used:** Right-tail probability.

**Formula:**

$$
S(x)=1-F(x)=\Pr(X>x)
$$

**Talk-through:**

Survival is one minus the CDF — probability of exceeding x.

**How to memorize:**

S for Survive above x.

**Mnemonic:** Survive = 1 − Fall.

---
### 21. PDF from CDF / survival

**When used:** Density for continuous X.

**Formula:**

$$
f(x)=\frac{d}{dx}F(x)=-\frac{d}{dx}S(x)
$$

**Talk-through:**

Density is the derivative of F, or minus the derivative of S.

**How to memorize:**

Differentiate F up; differentiate S and flip the sign.

**Mnemonic:** f = F′ = −S′.

---
### 22. Hazard (failure) rate

**When used:** Instantaneous rate of failure given survival to x.

**Formula:**

$$
\lambda(x)=\frac{f(x)}{S(x)}=-\frac{d}{dx}\log S(x)
$$

**Talk-through:**

Hazard is density over survival. Also equal to minus the derivative of log survival.

**How to memorize:**

λ = f/S. Integrate λ to rebuild S.

**Mnemonic:** Hazard = fatality over survivors.

---
### 23. Survival from hazard

**When used:** Rebuild S from λ.

**Formula:**

$$
S(x)=\exp\Bigl(-\int_{-\infty}^{x}\lambda(t)\,dt\Bigr)
$$

**Talk-through:**

Exponentiate minus the cumulative hazard from minus infinity to x.

**How to memorize:**

S = e to the minus integral of λ.

**Mnemonic:** Survive = e^(−∫hazard).

---
### 24. Cumulative hazard

**When used:** Integrated hazard.

**Formula:**

$$
\Lambda(x)=\int_{-\infty}^{x}\lambda(t)\,dt\quad\Rightarrow\quad S(x)=e^{-\Lambda(x)}
$$

**Talk-through:**

Capital Lambda is the integral of lambda; survival is e to the minus Lambda.

**How to memorize:**

Λ accumulates λ; S = e^{−Λ}.

**Mnemonic:** Big Λ buries little λ.

---

## A2. Expectation & Variance
### 25. Discrete expectation / LOTUS

**When used:** Mean and E[g(X)] for discrete X.

**Formula:**

$$
E[X]=\sum x\,\Pr(X=x),\qquad E[g(X)]=\sum g(x)\,\Pr(X=x)
$$

**Talk-through:**

Sum value times probability. For a function g, sum g(x) times probability — law of the unconscious statistician.

**How to memorize:**

Never transform then take E of X incorrectly — use LOTUS.

**Mnemonic:** Sum x p, Sum g p.

---
### 26. Continuous expectation / LOTUS

**When used:** Mean and E[g(X)] for continuous X.

**Formula:**

$$
E[X]=\int_{-\infty}^{\infty} x f(x)\,dx,\qquad E[g(X)]=\int_{-\infty}^{\infty} g(x)f(x)\,dx
$$

**Talk-through:**

Integrate x f(x). For g(X), integrate g(x) f(x).

**How to memorize:**

Integrals replace sums.

**Mnemonic:** ∫ x f and ∫ g f.

---
### 27. Variance

**When used:** Second-moment formula.

**Formula:**

$$
\mathrm{Var}(X)=E[X^2]-E[X]^2
$$

**Talk-through:**

Variance is mean of squares minus square of mean.

**How to memorize:**

Always E[X²] first, then subtract (EX)².

**Mnemonic:** MSMSM — Mean of Squares Minus Square of Mean.

---
### 28. Standard deviation

**When used:** Scale of X.

**Formula:**

$$
\mathrm{SD}(X)=\sqrt{\mathrm{Var}(X)}
$$

**Talk-through:**

SD is the square root of variance.

**How to memorize:**

Root the variance.

**Mnemonic:** SD = Square-root Deviation.

---
### 29. Covariance

**When used:** Linear dependence measure.

**Formula:**

$$
\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]
$$

**Talk-through:**

Mean of product minus product of means — same pattern as variance.

**How to memorize:**

Variance is Cov(X,X).

**Mnemonic:** Cov = E product − product E.

---
### 30. Correlation

**When used:** Scaled covariance.

**Formula:**

$$
\mathrm{Corr}(X,Y)=\frac{\mathrm{Cov}(X,Y)}{\mathrm{SD}(X)\,\mathrm{SD}(Y)}
$$

**Talk-through:**

Divide covariance by the product of SDs to get a number in [−1,1].

**How to memorize:**

Cov over SD times SD.

**Mnemonic:** Corr = Cov / (σx σy).

---
### 31. Linear combination mean & variance

**When used:** W = aX + bY.

**Formula:**

$$
E[W]=aE[X]+bE[Y],\qquad \mathrm{Var}(W)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\,\mathrm{Cov}(X,Y)
$$

**Talk-through:**

Expectation is linear. Variance brings squares on coefficients plus twice a b times covariance.

**How to memorize:**

Don’t forget the 2ab Cov cross term.

**Mnemonic:** Squares on vars, 2ab on cov.

---
### 32. Sum of i.i.d.

**When used:** S = X1+…+Xn independent identical.

**Formula:**

$$
E[S]=nE[X],\qquad \mathrm{Var}(S)=n\,\mathrm{Var}(X)
$$

**Talk-through:**

Means add to n times mean. Independent variances add to n times variance.

**How to memorize:**

Independence kills covariance cross terms.

**Mnemonic:** n μ and n σ².

---

## A3. Conditional Probability
### 33. Conditional expectation (discrete)

**When used:** E[X | Y=y].

**Formula:**

$$
E[X\mid Y=y]=\sum x\,\Pr(X=x\mid Y=y)
$$

**Talk-through:**

Average x using the conditional distribution given Y equals y.

**How to memorize:**

Same as ordinary E but with conditional probs.

**Mnemonic:** Condition then average.

---
### 34. Conditional expectation (continuous)

**When used:** E[X | Y=y] with density.

**Formula:**

$$
E[X\mid Y=y]=\int_{-\infty}^{\infty} x\, f(x\mid y)\,dx
$$

**Talk-through:**

Integrate x against the conditional density of X given Y equals y.

**How to memorize:**

f(x|y) replaces f(x).

**Mnemonic:** ∫ x f(x|y).

---
### 35. Law of total expectation

**When used:** Tower property / iterated expectation.

**Formula:**

$$
E[X]=E\bigl[E[X\mid Y]\bigr]
$$

**Talk-through:**

The overall mean equals the mean of the conditional means.

**How to memorize:**

Outer E peels the conditioning.

**Mnemonic:** E of E is E — tower.

---
### 36. Law of total variance

**When used:** Variance decomposition.

**Formula:**

$$
\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])
$$

**Talk-through:**

Total variance equals expected conditional variance plus variance of conditional means. First term is within-group noise; second is between-group spread.

**How to memorize:**

EVVE: Expected Var + Var of Expectation.

**Mnemonic:** EV + VE = Total Var.

---

## A4. Common Distributions
### 37. Uniform(a,b)

**When used:** Flat density on [a,b].

**Formula:**

$$
f_X(x)=\frac{1}{b-a},\ a\le x\le b;\quad E[X]=\frac{a+b}{2},\ \mathrm{Var}(X)=\frac{(b-a)^2}{12}
$$

**Talk-through:**

Height is one over width. Mean is midpoint. Variance is width squared over 12.

**How to memorize:**

12 in the variance denominator is the classic memorized constant.

**Mnemonic:** Midpoint mean; width²/12.

---
### 38. Exponential(θ)

**When used:** Memoryless continuous lifetime/severity (mean θ parameterization as on the sheet).

**Formula:**

$$
f_X(x)=\frac{1}{\theta}e^{-x/\theta},\ x>0;\quad E[X]=\theta,\ \mathrm{Var}(X)=\theta^2
$$

**Talk-through:**

Mean equals θ; variance equals θ squared. Density is (1/θ) e to the minus x over θ.

**How to memorize:**

Mean θ, variance θ² — same number’s square.

**Mnemonic:** Exp: Expect θ, Variance θ².

---
### 39. Normal approximation

**When used:** CLT / portfolio approximation.

**Formula:**

$$
S\;\dot{\sim}\;(\mu=E[S],\,\sigma^2=\mathrm{Var}(S))\Rightarrow \Pr(S\le k)\approx \Phi\Bigl(\frac{k-\mu}{\sigma}\Bigr)
$$

**Talk-through:**

Treat S as roughly normal with its true mean and variance; standardize k and read the standard normal CDF.

**How to memorize:**

Always (k−μ)/σ, not the reverse.

**Mnemonic:** Z = (k−μ)/σ.

---

# B. Review of Financial Mathematics

## B1. Interest Rates
### 40. Effective annual rate i

**When used:** Base interest measure for the year.

**Formula:**

$$
i=\text{annual effective interest rate}
$$

**Talk-through:**

One unit grows to 1+i over a year.

**How to memorize:**

i is the default annual rate unless told otherwise.

**Mnemonic:** i = Increase over year.

---
### 41. Discount rate d

**When used:** Convert among i, d, v.

**Formula:**

$$
d=\frac{i}{1+i}=iv=1-v
$$

**Talk-through:**

d is interest paid at the beginning of the year per unit due at year-end. Equals i over 1+i, equals i v, equals 1−v.

**How to memorize:**

Chain: v=1/(1+i), d=1−v, also d=i/(1+i).

**Mnemonic:** d = i/(1+i) = 1−v.

---
### 42. Discount factor v

**When used:** Present value of 1 due in one year.

**Formula:**

$$
v=\frac{1}{1+i}=1-d
$$

**Talk-through:**

v discounts one year. Also equals 1−d.

**How to memorize:**

v for “value today of a buck next year.”

**Mnemonic:** v = 1/(1+i).

---
### 43. Force of interest δ

**When used:** Continuous compounding equivalent.

**Formula:**

$$
\delta=\log(1+i)
$$

**Talk-through:**

Delta is the natural log of 1+i. Then v to the t equals e to the minus δ t.

**How to memorize:**

δ = ln(1+i), not log base 10.

**Mnemonic:** δ = ln(1+i).

---
### 44. Nominal interest i^{(m)}

**When used:** Interest convertible m-thly.

**Formula:**

$$
i^{(m)}=m\bigl((1+i)^{1/m}-1\bigr)
$$

**Talk-through:**

m times the effective rate per m-th of a year. Constructed so (1 + i^{(m)}/m)^m = 1+i.

**How to memorize:**

Pull out the m-th root of 1+i, subtract 1, times m.

**Mnemonic:** m((1+i)^{1/m}−1).

---
### 45. Nominal discount d^{(m)}

**When used:** Discount convertible m-thly.

**Formula:**

$$
d^{(m)}=m\bigl(1-(1-d)^{1/m}\bigr)
$$

**Talk-through:**

Parallel construction using d instead of i.

**How to memorize:**

Same shape as i^{(m)} but with (1−d).

**Mnemonic:** m(1−(1−d)^{1/m}).

---

## B2. Present Values (Certain Annuities)
### 46. Annuity-due certain

**When used:** Payments of 1 at beginnings of years, n years.

**Formula:**

$$
\ddot{a}_{\overline{n}|}=\frac{1-v^n}{d}
$$

**Talk-through:**

Due means beginning of period; denominator is d.

**How to memorize:**

Due → d in the denominator.

**Mnemonic:** Due uses d.

---
### 47. Annuity-immediate certain

**When used:** Payments of 1 at ends of years.

**Formula:**

$$
a_{\overline{n}|}=\frac{1-v^n}{i}
$$

**Talk-through:**

Immediate means end of period; denominator is i.

**How to memorize:**

Immediate → i.

**Mnemonic:** Immediate uses i.

---
### 48. Continuous certain annuity

**When used:** Payment at rate 1 per year continuously for n years.

**Formula:**

$$
\bar{a}_{\overline{n}|}=\frac{1-v^n}{\delta}
$$

**Talk-through:**

Continuous → force δ in the denominator. Same 1−v^n numerator pattern.

**How to memorize:**

Bar a uses δ.

**Mnemonic:** Bar uses δ.

---
### 49. m-thly annuity-due certain

**When used:** 1/m at the start of each 1/m period.

**Formula:**

$$
\ddot{a}^{(m)}_{\overline{n}|}=\frac{1-v^n}{d^{(m)}}
$$

**Talk-through:**

Same numerator; denominator becomes nominal discount d^{(m)}.

**How to memorize:**

m-thly due → d^{(m)}.

**Mnemonic:** m-due → d^{(m)}.

---

# C. Survival Models

## C1. Survival Function
### 50. PDF of Tx

**When used:** Complete future lifetime density.

**Formula:**

$$
f_x(t)={}_tp_x\,\mu_{x+t}
$$

**Talk-through:**

Density of dying at duration t is survive t years times force at x+t.

**How to memorize:**

Survive then fail: tpx μx+t.

**Mnemonic:** Survive-Force Product.

---
### 51. PMF of Kx

**When used:** Curtate lifetime: whole years lived.

**Formula:**

$$
\Pr(K_x=k)={}_kp_x\, q_{x+k},\quad K_x=\lfloor T_x\rfloor
$$

**Talk-through:**

Die in year k to k+1: survive k years then die within the next year.

**How to memorize:**

kpx then qx+k.

**Mnemonic:** Survive k, die in year k.

---
### 52. Survival function Sx(t)

**When used:** Definition.

**Formula:**

$$
S_x(t)=\Pr(T_x>t)
$$

**Talk-through:**

Probability that future lifetime exceeds t.

**How to memorize:**

Same idea as S(x) but age-based.

**Mnemonic:** Sx(t) = still alive after t.

---
### 53. Chaining survivals

**When used:** Split intervals.

**Formula:**

$$
S_x(u+t)=S_x(u)\,S_{x+u}(t)\quad\Rightarrow\quad S_{x+u}(t)=\frac{S_x(u+t)}{S_x(u)}
$$

**Talk-through:**

Survive u+t from x equals survive u from x times survive t from x+u.

**How to memorize:**

Multiply adjacent survival probabilities.

**Mnemonic:** Chain survivals by multiplication.

---
### 54. From age-0 survival

**When used:** Relate Sx to S0.

**Formula:**

$$
S_0(x+t)=S_0(x)\,S_x(t)\quad\Rightarrow\quad S_x(t)=\frac{S_0(x+t)}{S_0(x)}
$$

**Talk-through:**

Survive to x+t from birth equals survive to x times then survive t more from x.

**How to memorize:**

Conditional survival from radix S0.

**Mnemonic:** Sx(t) = S0(x+t)/S0(x).

---
### 55. Survival function axioms

**When used:** Three conditions on Sx.

**Formula:**

$$
S_x(0)=1;\quad \lim_{t\to\infty}S_x(t)=0;\quad S_x\text{ nonincreasing in }t
$$

**Talk-through:**

Start at 1, end at 0, never go up.

**How to memorize:**

1 → 0, monotone down.

**Mnemonic:** Start-End-Fall: 1, 0, ↓.

---

## C2. Actuarial Notation
### 56. tpx and tqx

**When used:** Core survival/mortality probs.

**Formula:**

$$
{}_tp_x=\Pr(T_x>t),\qquad {}_tq_x=1-{}_tp_x=\Pr(T_x\le t)
$$

**Talk-through:**

tpx: survive t years; tqx: die within t years.

**How to memorize:**

p for persist, q for quit (die).

**Mnemonic:** p persist, q quit.

---
### 57. Chaining t+u px

**When used:** Multiplicative survival.

**Formula:**

$$
{}_{t+u}p_x={}_tp_x\,{}_up_{x+t}
$$

**Talk-through:**

Survive t+u equals survive t then survive u more from the new age.

**How to memorize:**

Same as S chaining.

**Mnemonic:** p multiplies along the path.

---
### 58. t+u qx decomposition

**When used:** Die within t+u.

**Formula:**

$$
{}_{t+u}q_x={}_tq_x+{}_tp_x\,{}_uq_{x+t}
$$

**Talk-through:**

Either die in the first t years, or survive t and then die in the next u.

**How to memorize:**

Early death OR (survive and late death).

**Mnemonic:** Die early + survive-then-die.

---
### 59. Deferred mortality t|u qx

**When used:** Die between t and t+u.

**Formula:**

$$
{}_{t|u}q_x={}_tp_x\,{}_uq_{x+t}={}_tp_x-{}_{t+u}p_x={}_{t+u}q_x-{}_tq_x
$$

**Talk-through:**

Three equivalent forms: survive then die in the window; difference of survivals; difference of cumulative deaths.

**How to memorize:**

Deferred bar | means wait t then risk u.

**Mnemonic:** Wait-then-die: t|u q.

---

## C3. Life Tables
### 60. Deaths from lx

**When used:** Table deaths over t years.

**Formula:**

$$
{}_td_x=\ell_x-\ell_{x+t}
$$

**Talk-through:**

Deaths equal lives at x minus survivors at x+t.

**How to memorize:**

ℓ falls only by deaths in a standard table.

**Mnemonic:** d = ℓ now − ℓ later.

---
### 61. tpx from life table

**When used:** Table survival.

**Formula:**

$$
{}_tp_x=\frac{\ell_{x+t}}{\ell_x}
$$

**Talk-through:**

Survivors over initial lives.

**How to memorize:**

ℓ later over ℓ now.

**Mnemonic:** p = ℓ₊ / ℓ.

---
### 62. tqx from life table

**When used:** Table mortality.

**Formula:**

$$
{}_tq_x=\frac{{}_td_x}{\ell_x}=\frac{\ell_x-\ell_{x+t}}{\ell_x}
$$

**Talk-through:**

Deaths over initial lives.

**How to memorize:**

d/ℓ or 1 − ℓ ratio.

**Mnemonic:** q = d/ℓ.

---
### 63. Deferred deaths probability

**When used:** t|u qx from table.

**Formula:**

$$
{}_{t|u}q_x=\frac{{}_ud_{x+t}}{\ell_x}=\frac{\ell_{x+t}-\ell_{x+t+u}}{\ell_x}
$$

**Talk-through:**

Deaths in the deferred window over original ℓx — not over ℓx+t.

**How to memorize:**

Denominator stays ℓx for the probability from age x.

**Mnemonic:** Deferred d over original ℓ.

---

## C4. Force of Mortality
### 64. Force definition

**When used:** μx+t from density/survival.

**Formula:**

$$
\mu_x(t)=\mu_{x+t}=\frac{f_x(t)}{S_x(t)}=-\frac{d}{dt}\log S_x(t)
$$

**Talk-through:**

Same hazard idea as λ: density over survival, or minus d/dt of log S.

**How to memorize:**

μ = fx / Sx.

**Mnemonic:** μ = fail density / survive.

---
### 65. Force integrability condition

**When used:** Must eventually die.

**Formula:**

$$
\lim_{t\to\infty}\int_0^t \mu_s\,ds=\infty
$$

**Talk-through:**

Cumulative force to infinity must diverge so survival goes to zero.

**How to memorize:**

Integral of μ blows up.

**Mnemonic:** ∫μ → ∞.

---
### 66. tpx from force

**When used:** Exponential of integrated force.

**Formula:**

$$
{}_tp_x=\exp\Bigl(-\int_0^t \mu_{x+s}\,ds\Bigr)=\exp\Bigl(-\int_x^{x+t}\mu_s\,ds\Bigr)
$$

**Talk-through:**

Survive by exponentiating minus integrated force along the path.

**How to memorize:**

Same as S = e^{−Λ}.

**Mnemonic:** p = e^{−∫μ}.

---
### 67. tqx as integral

**When used:** Die within t via force.

**Formula:**

$$
{}_tq_x=\int_0^t {}_sp_x\,\mu_{x+s}\,ds
$$

**Talk-through:**

Integrate the density of death over (0,t).

**How to memorize:**

∫ survive-then-force.

**Mnemonic:** q = ∫ p μ.

---
### 68. Deferred q via force

**When used:** Die in (t, t+u).

**Formula:**

$$
{}_{t|u}q_x=\int_t^{t+u}{}_sp_x\,\mu_{x+s}\,ds
$$

**Talk-through:**

Same integral but only over the deferred window.

**How to memorize:**

Limits from t to t+u.

**Mnemonic:** ∫ from t to t+u of p μ.

---

## C5. Expected Future Lifetime
### 69. Complete expectation oex

**When used:** E[Tx].

**Formula:**

$$
e_x^{\circ}=E[T_x]=\int_0^\infty t\,{}_tp_x\mu_{x+t}\,dt=\int_0^\infty {}_tp_x\,dt
$$

**Talk-through:**

Mean complete lifetime equals the integral of tpx dt — the nicer integration-by-parts form.

**How to memorize:**

Prefer ∫ tpx — fewer factors.

**Mnemonic:** oex = ∫ tpx dt.

---
### 70. Curtate expectation ex

**When used:** E[Kx].

**Formula:**

$$
e_x=E[K_x]=\sum_{k=1}^\infty k\,{}_kp_x q_{x+k}=\sum_{k=1}^\infty {}_kp_x
$$

**Talk-through:**

Curtate mean equals the sum of kpx from 1 to infinity.

**How to memorize:**

Sum p’s, not the k·p·q form, when you can.

**Mnemonic:** ex = Σ kpx.

---
### 71. Temporary complete expectation

**When used:** E[min(Tx,n)].

**Formula:**

$$
e_{x:\overline{n}|}^{\circ}=\int_0^n {}_tp_x\,dt
$$

**Talk-through:**

Integrate tpx only to n.

**How to memorize:**

Cap the integral at n.

**Mnemonic:** oex:n = ∫_0^n tpx.

---
### 72. Temporary curtate expectation

**When used:** E[min(Kx,n)].

**Formula:**

$$
e_{x:\overline{n}|}=\sum_{k=1}^n {}_kp_x
$$

**Talk-through:**

Sum kpx from 1 to n.

**How to memorize:**

Parallel to the infinite sum but stop at n.

**Mnemonic:** ex:n = Σ_1^n kpx.

---
### 73. Second moment of Tx

**When used:** For Var(Tx).

**Formula:**

$$
E[T_x^2]=\int_0^\infty 2t\,{}_tp_x\,dt
$$

**Talk-through:**

Integration-by-parts form: twice the integral of t times tpx.

**How to memorize:**

2t inside the integrand.

**Mnemonic:** E[T²] = ∫ 2t tpx dt.

---
### 74. Second moment of Kx

**When used:** For Var(Kx).

**Formula:**

$$
E[K_x^2]=\sum_{k=1}^\infty (2k-1)\,{}_kp_x=2\sum_{k=1}^\infty k\,{}_kp_x-e_x
$$

**Talk-through:**

Use the (2k−1) kpx sum, or twice sum k·kpx minus ex.

**How to memorize:**

Odd weights (2k−1).

**Mnemonic:** (2k−1) weights.

---
### 75. Second moments temporary

**When used:** Capped versions.

**Formula:**

$$
E[\min(T_x,n)^2]=\int_0^n 2t\,{}_tp_x\,dt,\quad E[\min(K_x,n)^2]=\sum_{k=1}^n(2k-1)\,{}_kp_x
$$

**Talk-through:**

Same identities with upper limit n.

**How to memorize:**

Mirror the unlimited formulas.

**Mnemonic:** Same with cap n.

---
### 76. Variances of lifetimes

**When used:** Always second moment minus square mean.

**Formula:**

$$
\mathrm{Var}(T_x)=E[T_x^2]-E[T_x]^2,\quad \mathrm{Var}(K_x)=E[K_x^2]-E[K_x]^2
$$

**Talk-through:**

Standard variance definition.

**How to memorize:**

MSMSM again.

**Mnemonic:** E2 − (E1)².

---
### 77. Recursive lifetime expectations

**When used:** Split temporary + deferred.

**Formula:**

$$
e_x^{\circ}=e_{x:\overline{n}|}^{\circ}+{}_np_x\, e_{x+n}^{\circ},\quad e_x=e_{x:\overline{n}|}+{}_np_x\, e_{x+n}
$$

**Talk-through:**

Mean equals temporary mean plus probability of lasting n times mean from there.

**How to memorize:**

Temp plus deferred residual life.

**Mnemonic:** Temp + npx · later e.

---
### 78. One-year recursion for ex

**When used:** Classic curtate recursion.

**Formula:**

$$
e_x=p_x+p_x e_{x+1}=p_x(1+e_{x+1})
$$

**Talk-through:**

With probability px you get one year plus the curtate expectation from age x+1.

**How to memorize:**

Factor px: ex = px(1+ex+1).

**Mnemonic:** ex = px(1+ex+1).

---
### 79. Temporary recursion

**When used:** Split temporary expectation.

**Formula:**

$$
e_{x:\overline{n}|}=e_{x:\overline{m}|}+{}_mp_x\, e_{x+m:\overline{n-m}|}\ (m<n)
$$

**Talk-through:**

Same pattern inside a temporary window.

**How to memorize:**

m then remaining n−m.

**Mnemonic:** Split m / n−m.

---

## C6. Mortality Laws
### 80. Gompertz

**When used:** Force grows exponentially in age.

**Formula:**

$$
\mu_x=Bc^x\ (c>1),\quad {}_tp_x=\exp\Bigl(-\frac{Bc^x(c^t-1)}{\log c}\Bigr)
$$

**Talk-through:**

Force is B c to the x. Survival integrates that geometric growth.

**How to memorize:**

Gompertz = pure exponential force; Makeham adds A.

**Mnemonic:** Gompertz: B c^x only.

---
### 81. Makeham

**When used:** Constant plus Gompertz.

**Formula:**

$$
\mu_x=A+Bc^x,\quad {}_tp_x=\exp\Bigl(-At-\frac{Bc^x(c^t-1)}{\log c}\Bigr)
$$

**Talk-through:**

Extra e to the minus A t from the constant A, times the Gompertz factor.

**How to memorize:**

Makeham = A + Gompertz.

**Mnemonic:** Makeham Adds A.

---
### 82. Weibull force

**When used:** Power force in age.

**Formula:**

$$
\mu_x=kx^n,\quad {}_tp_x=\exp\Bigl(-\frac{k\bigl((x+t)^{n+1}-x^{n+1}\bigr)}{n+1}\Bigr)
$$

**Talk-through:**

Integrate a power: difference of age to the n+1, over n+1.

**How to memorize:**

Antiderivative age^{n+1}/(n+1).

**Mnemonic:** Weibull: power ages.

---
### 83. Constant force (exponential lifetime)

**When used:** μ constant.

**Formula:**

$$
\mu_x=\mu,\quad {}_tp_x=e^{-\mu t}
$$

**Talk-through:**

Memoryless: survival depends only on duration t, not age.

**How to memorize:**

CFM: p = e^{−μt}.

**Mnemonic:** Constant → pure exponential p.

---
### 84. Uniform distribution (de Moivre)

**When used:** Uniform lifetime to ω.

**Formula:**

$$
\mu_x=\frac{1}{\omega-x},\quad {}_tp_x=1-\frac{t}{\omega-x}\quad(0\le t\le\omega-x)
$$

**Talk-through:**

Force blows up as age approaches omega. Survival is linear down to omega.

**How to memorize:**

Straight-line lives under de Moivre.

**Mnemonic:** De Moivre: linear survival to ω.

---
### 85. Beta / generalized de Moivre

**When used:** Power of linear survival.

**Formula:**

$$
\mu_x=\frac{\alpha}{\omega-x},\quad {}_tp_x=\Bigl(1-\frac{t}{\omega-x}\Bigr)^\alpha
$$

**Talk-through:**

Alpha equals 1 recovers uniform. Larger alpha changes the shape.

**How to memorize:**

Raise de Moivre survival to alpha.

**Mnemonic:** Beta: (linear survival)^α.

---

## C7. Approximations (Fractional Ages)
### 86. UDD between integer ages

**When used:** Uniform deaths in the year of age.

**Formula:**

$$
\ell_{x+s}=\ell_x-s\,d_x,\quad {}_sq_x=s q_x,\quad {}_sq_{x+t}=\frac{s q_x}{1-t q_x},\quad q_x={}_sp_x\mu_{x+s}
$$

**Talk-through:**

Under UDD, deaths spread evenly: s-year q from integer age is s times annual q. The formula for sq from age x+t uses 1−t qx in the denominator. Also qx equals spx μx+s under UDD.

**How to memorize:**

UDD: qs = s q. Remember the 1−tq denominator for sqx+t.

**Mnemonic:** UDD: linear ℓ, qs=sq.

---
### 87. Constant force between integer ages

**When used:** CFM within the year.

**Formula:**

$$
\ell_{x+s}=\ell_x (p_x)^s,\quad {}_sp_x=(p_x)^s,\quad \mu_{x+s}=-\log p_x
$$

**Talk-through:**

Force constant inside the year implies exponential survival in s and μ equals minus log px.

**How to memorize:**

CFM: p to the s and μ=−ln p.

**Mnemonic:** CFM: powers of p.

---

## C8. Select Survival Model
### 88. Select vs ultimate mortality

**When used:** k-year select period.

**Formula:**

$$
q_{[x]+h}<q_{x+h}\ (h<k);\quad q_{[x]+h}=q_{x+h}\ (h\ge k)
$$

**Talk-through:**

Recently selected lives have lower mortality than ultimate same age until the select period ends; then they equal ultimate.

**How to memorize:**

Select better (lower q) for h < k; then merges.

**Mnemonic:** SST — Select Safer Temporarily.

---
### 89. Select survival probabilities

**When used:** Dual statement for p.

**Formula:**

$$
p_{[x]+h}>p_{x+h}\ (h<k);\quad p_{[x]+h}=p_{x+h}\ (h\ge k)
$$

**Talk-through:**

Higher survival while select; equal after the select period.

**How to memorize:**

Opposite inequality from q.

**Mnemonic:** Select p superior early.

---

# D. Insurance

## D1. Actuarial Present Value Functions
### 90. Pure endowment nEx

**When used:** Pay 1 at n if alive.

**Formula:**

$$
{}_nE_x=A^{1}_{\ x:\overline{n}|}=v^n\,{}_np_x,\quad {}^2_nE_x=(v^n)^2\,{}_np_x
$$

**Talk-through:**

Discount n years and multiply by survival. Second-moment interest uses v to the 2n with the same survival.

**How to memorize:**

nEx = v^n npx.

**Mnemonic:** Endow if Endure: v^n npx.

---
### 91. Continuous whole life insurance

**When used:** Pay at moment of death.

**Formula:**

$$
\bar{A}_x=\int_0^\infty v^t\,{}_tp_x\mu_{x+t}\,dt,\quad {}^2\bar{A}_x=\int_0^\infty (v^t)^2\,{}_tp_x\mu_{x+t}\,dt
$$

**Talk-through:**

Integrate discounted death density. Second moment: square the discount (double the force).

**How to memorize:**

Bar A integrates v^t tpx μ.

**Mnemonic:** Bar A = ∫ v^t p μ.

---
### 92. Continuous term and endowment insurance

**When used:** n-year term and endowment.

**Formula:**

$$
\bar{A}^{1}_{x:\overline{n}|}=\int_0^n v^t\,{}_tp_x\mu_{x+t}\,dt,\quad \bar{A}_{x:\overline{n}|}=\bar{A}^{1}_{x:\overline{n}|}+v^n{}_np_x
$$

**Talk-through:**

Term integrates only to n. Endowment adds the pure endowment.

**How to memorize:**

Endowment = term + pure endowment.

**Mnemonic:** E = T + PE.

---
### 93. Discrete whole life Ax

**When used:** Pay at end of year of death.

**Formula:**

$$
A_x=\sum_{k=0}^\infty v^{k+1}\,{}_kp_x q_{x+k},\quad {}^2A_x=\sum_{k=0}^\infty (v^{k+1})^2\,{}_kp_x q_{x+k}
$$

**Talk-through:**

Sum over years of death: discount k+1 years times die in that year.

**How to memorize:**

v^{k+1} kpx qx+k.

**Mnemonic:** End-year pay: v^{k+1}.

---
### 94. Discrete term and endowment

**When used:** Finite-term versions.

**Formula:**

$$
A^{1}_{x:\overline{n}|}=\sum_{k=0}^{n-1}v^{k+1}{}_kp_x q_{x+k},\quad A_{x:\overline{n}|}=A^{1}_{x:\overline{n}|}+v^n{}_np_x
$$

**Talk-through:**

Stop the death sum at n−1; endowment adds pure endowment.

**How to memorize:**

Same E = T + PE pattern.

**Mnemonic:** Discrete E = T + PE.

---
### 95. m-thly insurance sum

**When used:** Benefits paid at end of 1/m period of death.

**Formula:**

$$
A^{(m)1}_{x:\overline{n}|}=\sum_{k=0}^{nm-1} v^{k/m+1/m}\,{}_{k/m}p_x\,{}_{1/m}q_{x+k/m}
$$

**Talk-through:**

Finer grid: discount to the end of the 1/m interval of death.

**How to memorize:**

Step in units of 1/m.

**Mnemonic:** m-thly: sum over nm periods.

---
### 96. Insurance relations (split / defer)

**When used:** Whole = temporary + deferred.

**Formula:**

$$
\bar{A}_x=\bar{A}^{1}_{x:\overline{n}|}+{}_nE_x\bar{A}_{x+n},\quad A_x=A^{1}_{x:\overline{n}|}+{}_nE_x A_{x+n},\quad {}_{n|}\bar{A}_x={}_nE_x\bar{A}_{x+n}
$$

**Talk-through:**

Deferred insurance equals endow then insure. Endowment equals term plus pure endowment.

**How to memorize:**

Deferred insurance = endow then insure.

**Mnemonic:** Whole = term + deferred.

---
### 97. Insurance recursions

**When used:** One-year look-forward.

**Formula:**

$$
A_x=vq_x+vp_x A_{x+1},\quad A^{1}_{x:\overline{n}|}=vq_x+vp_x A^{1}_{x+1:\overline{n-1}|}
$$

**Talk-through:**

Die this year: get v; survive: get v times next year’s APV. Same with v² for second moments.

**How to memorize:**

Die path + survive path.

**Mnemonic:** vq + vp A_next.

---

## D2. Present Value Random Variables Z
### 98. Whole life Z (continuous / discrete)

**When used:** PV of unit (or b) death benefit.

**Formula:**

$$
Z=b v^{T_x}\ (T_x>0);\qquad Z=b v^{K_x+1}\ (K_x=0,1,\ldots)
$$

**Talk-through:**

Continuous: discount the exact lifetime. Discrete: discount to end of year of death K+1.

**How to memorize:**

T vs K+1 is the continuous/discrete split everywhere.

**Mnemonic:** T continuous; K+1 discrete.

---
### 99. Term insurance Z

**When used:** Benefit only if death before n.

**Formula:**

$$
Z=\begin{cases}b v^{T_x},& T_x<n\\ 0,& T_x\ge n\end{cases}\quad\text{(discrete: }K=0,\ldots,n-1\text{)}
$$

**Talk-through:**

Pay if early death; else nothing.

**How to memorize:**

Zero after n.

**Mnemonic:** Term: pay only if T<n.

---
### 100. Endowment insurance Z

**When used:** Death benefit or maturity.

**Formula:**

$$
Z=\begin{cases}b v^{T_x},& T_x<n\\ b v^n,& T_x\ge n\end{cases}
$$

**Talk-through:**

If survive n, pay discounted b at n; if die earlier, pay at death.

**How to memorize:**

Term Z plus pure endowment on survival.

**Mnemonic:** Die or mature — always something.

---
### 101. Pure endowment Z

**When used:** Survival benefit only.

**Formula:**

$$
Z=\begin{cases}0,& T_x<n\\ b v^n,& T_x\ge n\end{cases}
$$

**Talk-through:**

Only paid if alive at n.

**How to memorize:**

Opposite of term.

**Mnemonic:** Pure: survive to get paid.

---
### 102. Deferred whole life Z

**When used:** Insurance starting after n.

**Formula:**

$$
Z=\begin{cases}0,& T_x<n\\ b v^{T_x},& T_x\ge n\end{cases}
$$

**Talk-through:**

Nothing if death in deferral; thereafter like whole life from issue, still discounting from time 0.

**How to memorize:**

Zero until n, then v^T.

**Mnemonic:** Deferred: silence then insure.

---

## D3. Expected Present Values
### 103. EPV insurance (b units)

**When used:** E[Z] for standard contracts.

**Formula:**

$$
E[Z]=b\bar{A}_x\ \text{or}\ bA_x;\ \ b\bar{A}^{1}_{x:\overline{n}|};\ \ b\bar{A}_{x:\overline{n}|};\ \ b\,{}_nE_x;\ \ b\,{}_{n|}\bar{A}_x
$$

**Talk-through:**

Multiply benefit b by the corresponding A symbol — bar for continuous.

**How to memorize:**

E[Z] = b × actuarial symbol.

**Mnemonic:** Benefit times A-symbol.

---

## D4. Variance of Present Values
### 104. Insurance PV variance pattern

**When used:** For Z = b v^T type claims.

**Formula:**

$$
\mathrm{Var}(Z)=b^2\bigl({}^2A-(A)^2\bigr)
$$

**Talk-through:**

For each contract, use the matching second-moment insurance symbol at double force: variance equals b squared times (²A minus A squared). Holds for whole life, term, endowment, pure endowment, deferred — continuous and discrete.

**How to memorize:**

Always ²A − A², times b².

**Mnemonic:** b²(second − first²).

---

## D5. Insurance Approximations
### 105. UDD insurance relations

**When used:** Convert discrete to continuous under UDD.

**Formula:**

$$
\bar{A}_x=\frac{i}{\delta}A_x,\quad \bar{A}^{1}_{x:\overline{n}|}=\frac{i}{\delta}A^{1}_{x:\overline{n}|},\quad A^{(m)}_x=\frac{i}{i^{(m)}}A_x,\quad {}^2\bar{A}_x=\frac{2i+i^2}{2\delta}\,{}^2A_x
$$

**Talk-through:**

Important: endowment continuous is NOT simply (i/δ) times discrete endowment — the sheet marks not equal. Use the listed identities carefully.

**How to memorize:**

i/δ for whole and term under UDD; watch the endowment exception.

**Mnemonic:** UDD: i/δ — endowment caveat.

---
### 106. Claims acceleration

**When used:** Alternate continuous approximation.

**Formula:**

$$
\bar{A}_x=(1+i)^{1/2}A_x,\quad A^{(m)}_x=(1+i)^{(m-1)/(2m)}A_x,\quad {}^2\bar{A}_x=(1+i)\,{}^2A_x
$$

**Talk-through:**

Assume claims on average halfway through the year (or m-th). Again, endowment continuous is not simply (1+i)^{1/2} times discrete endowment.

**How to memorize:**

Half-year: square root of (1+i). Double force gets full (1+i).

**Mnemonic:** Accelerate by √(1+i).

---

# E. Annuities

## E1. Actuarial Annuity Functions
### 107. Continuous annuity APV (simple integrals)

**When used:** Whole life and temporary.

**Formula:**

$$
\bar{a}_x=\int_0^\infty v^t\,{}_tp_x\,dt,\quad \bar{a}_{x:\overline{n}|}=\int_0^n v^t\,{}_tp_x\,dt
$$

**Talk-through:**

Integrate discount times survival — no mu. Second moments use v to the 2t.

**How to memorize:**

Annuity integrates v^t tpx; insurance integrates v^t tpx μ.

**Mnemonic:** Annuity: ∫ v^t p (no μ).

---
### 108. Discrete due annuity APV

**When used:** Payments at year starts while alive.

**Formula:**

$$
\ddot{a}_x=\sum_{k=0}^\infty v^k\,{}_kp_x,\quad \ddot{a}_{x:\overline{n}|}=\sum_{k=0}^{n-1}v^k\,{}_kp_x
$$

**Talk-through:**

Sum discounted survival probabilities. Temporary stops before n.

**How to memorize:**

Due sum from k=0.

**Mnemonic:** Due: Σ v^k kpx.

---
### 109. m-thly temporary due

**When used:** 1/m per period.

**Formula:**

$$
\ddot{a}^{(m)}_{x:\overline{n}|}=\sum_{k=0}^{nm-1}\frac{1}{m}v^{k/m}\,{}_{k/m}p_x
$$

**Talk-through:**

Each payment is 1/m; discount and survive to each payment date.

**How to memorize:**

nm terms of size 1/m.

**Mnemonic:** m-due: (1/m) Σ v^{k/m} p.

---
### 110. Annuity relations

**When used:** Split, defer, due vs immediate.

**Formula:**

$$
\bar{a}_x=\bar{a}_{x:\overline{n}|}+{}_nE_x\bar{a}_{x+n},\quad \ddot{a}_x=1+a_x,\quad \ddot{a}_{x:\overline{n}|}=1+a_{x:\overline{n-1}|}=1+a_{x:\overline{n}|}-{}_nE_x
$$

**Talk-through:**

Also temporary equals certain plus pure-endowment times later annuity. Deferred equals nEx times later annuity.

**How to memorize:**

Due = 1 + immediate.

**Mnemonic:** Due = 1 + immediate.

---
### 111. Annuity recursions

**When used:** One-year forward.

**Formula:**

$$
\ddot{a}_x=1+v p_x\ddot{a}_{x+1},\quad \ddot{a}_{x:\overline{n}|}=1+v p_x\ddot{a}_{x+1:\overline{n-1}|}
$$

**Talk-through:**

Pay 1 now; if survive, discount next year’s due annuity.

**How to memorize:**

1 + vp ä_next.

**Mnemonic:** One now, then maybe more.

---
### 112. Insurance–annuity identities

**When used:** Convert A to a.

**Formula:**

$$
\bar{a}_x=\frac{1-\bar{A}_x}{\delta},\quad \ddot{a}_x=\frac{1-A_x}{d},\quad \ddot{a}^{(m)}_{x:\overline{n}|}=\frac{1-A^{(m)}_{x:\overline{n}|}}{d^{(m)}}
$$

**Talk-through:**

Continuous uses δ; due uses d; m-thly uses d^{(m)}. Same pattern for temporary with matching A and a. Second-moment versions use 2δ or 2d−d².

**How to memorize:**

a = (1−A) / interest-measure.

**Mnemonic:** (1−A)/δ or d.

---

## E2–E3. Annuity PV Random Variables & Expectations
### 113. Whole life annuity Y

**When used:** Continuous and due.

**Formula:**

$$
Y=b\frac{1-v^{T_x}}{\delta},\qquad Y=b\frac{1-v^{K_x+1}}{d}
$$

**Talk-through:**

Annuity PV is the certain-annuity formula stopped at lifetime. Continuous uses δ and T; due uses d and K+1.

**How to memorize:**

Y = b times ä-certain for the random term.

**Mnemonic:** Y mirrors certain ä with random term.

---
### 114. Term / certain-and-life / deferred Y

**When used:** Standard contract definitions on the sheet.

**Formula:**

$$
\text{Term: stop at }\min(T,n);\ \text{certain-and-life: guarantee }n\text{ then life};\ \text{deferred: start after }n\text{ (PV uses }v^n-v^T\text{ over }\delta\text{)}
$$

**Talk-through:**

Term annuity pays while alive but not beyond n. Certain-and-life guarantees n years then continues if alive. Deferred pays nothing until n, then life thereafter.

**How to memorize:**

Three flavors: capped, guaranteed floor n, delayed start.

**Mnemonic:** Cap / Guarantee / Delay.

---
### 115. E[Y] annuity symbols

**When used:** Expectations.

**Formula:**

$$
E[Y]=b\bar{a}_x,\ b\ddot{a}_x,\ b\bar{a}_{x:\overline{n}|},\ b\ddot{a}_{x:\overline{n}|},\ b\,{}_{n|}\bar{a}_x,\ \ldots
$$

**Talk-through:**

Benefit rate or payment size times the matching annuity actuarial present value.

**How to memorize:**

E[Y]=b×a-symbol.

**Mnemonic:** b times ä.

---

## E4. Variance of Annuity PVs
### 116. Annuity variance

**When used:** Whole life and temporary (as on the sheet).

**Formula:**

$$
\mathrm{Var}(Y)=b^2\frac{{}^2A-(A)^2}{\delta^2}\ \text{(continuous)},\quad b^2\frac{{}^2A-(A)^2}{d^2}\ \text{(due)}
$$

**Talk-through:**

Because Y = (1−Z)/interest-measure for unit benefits, variance scales insurance variance by 1/δ² or 1/d². Use matching A symbols for temporary cases.

**How to memorize:**

Annuity var = insurance var / (δ or d)².

**Mnemonic:** Var(Y) = Var(Z)/δ².

---

## E5. Annuity Approximations
### 117. UDD annuity conversions

**When used:** Continuous and m-thly from due.

**Formula:**

$$
\bar{a}_x=\frac{i d}{\delta^2}\ddot{a}_x-\frac{i-\delta}{\delta^2},\quad \ddot{a}^{(m)}_x=\frac{i d}{i^{(m)}d^{(m)}}\ddot{a}_x-\frac{i-i^{(m)}}{i^{(m)}d^{(m)}}
$$

**Talk-through:**

UDD gives exact conversion identities with a correction term — not just a simple factor. Temporary m-thly multiplies the correction by (1−nEx).

**How to memorize:**

Remember the subtraction correction, not only the id/δ² factor.

**Mnemonic:** UDD ä: factor minus correction.

---
### 118. Woolhouse 2-term

**When used:** Common exam approximation.

**Formula:**

$$
\bar{a}_x\approx\ddot{a}_x-\tfrac12,\quad \ddot{a}^{(m)}_x\approx\ddot{a}_x-\frac{m-1}{2m},\quad \ddot{a}^{(m)}_{x:\overline{n}|}\approx\ddot{a}_{x:\overline{n}|}-\frac{m-1}{2m}(1-{}_nE_x)
$$

**Talk-through:**

Shift due annuity toward continuous or m-thly by roughly half a payment period.

**How to memorize:**

2-term: subtract half, or (m−1)/(2m).

**Mnemonic:** Woolhouse-2: ä − ½.

---
### 119. Woolhouse 3-term

**When used:** Adds force/interest correction.

**Formula:**

$$
\bar{a}_x\approx\ddot{a}_x-\tfrac12-\frac{1}{12}(\mu_x+\delta),\quad \ddot{a}^{(m)}_x\approx\ddot{a}_x-\frac{m-1}{2m}-\frac{m^2-1}{12m^2}(\mu_x+\delta)
$$

**Talk-through:**

Third term uses a (μx+δ)/12 style correction. If μx is not given, the sheet allows μx ≈ −½(log px−1 + log px). Temporary m-thly also adjusts the third term with nEx(μx+n+δ).

**How to memorize:**

2-term plus (μ+δ)/12.

**Mnemonic:** Woolhouse-3: plus (μ+δ)/12.

---

# F. Premiums

## F1. Net Premium Formulas
### 120. Net premiums (equivalence)

**When used:** Benefit APV over annuity APV.

**Formula:**

$$
P_x=\frac{A_x}{\ddot{a}_x},\quad P^{1}_{x:\overline{n}|}=\frac{A^{1}_{x:\overline{n}|}}{\ddot{a}_{x:\overline{n}|}},\quad P_{x:\overline{n}|}=\frac{A_{x:\overline{n}|}}{\ddot{a}_{x:\overline{n}|}},\quad \bar{P}(\bar{A}_x)=\frac{\bar{A}_x}{\bar{a}_x}
$$

**Talk-through:**

Annual or continuous net premium equates EPV benefits to EPV premiums: P = A/a with matching payment timing.

**How to memorize:**

Premium = insurance / annuity.

**Mnemonic:** P = A/ä.

---

## F2. Equivalence Principle
### 121. Loss at issue

**When used:** Net and gross.

**Formula:**

$$
{}_0L^n=\mathrm{PV(benefits)}-\mathrm{PV(premiums)},\quad {}_0L^g=\mathrm{PV(ben)}+\mathrm{PV(exp)}-\mathrm{PV(prem)}
$$

**Talk-through:**

Insurer’s PV loss at issue: benefits — plus expenses if gross — minus premiums.

**How to memorize:**

Gross adds expenses on the plus side.

**Mnemonic:** Loss = out − in.

---
### 122. Equivalence principle

**When used:** Set E[loss]=0 to solve premium.

**Formula:**

$$
E[{}_0L]=0\ \Rightarrow\ \mathrm{EPV(ben)}=\mathrm{EPV(prem)}\ (\text{net});\ \mathrm{EPV(ben+exp)}=\mathrm{EPV(prem)}\ (\text{gross})
$$

**Talk-through:**

Choose P or G so expected loss at issue is zero.

**How to memorize:**

Zero expected loss defines net/gross premium.

**Mnemonic:** E[L]=0 locks P.

---

## F3. Expectation and Variance of Loss at Issue
### 123. Gross loss whole life (continuous / discrete)

**When used:** Claim expense E, premium expense e, gross premium G.

**Formula:**

$$
{}_0L^g=(b+E)v^{T}-(G-e)\frac{1-v^{T}}{\delta}=\Bigl(b+E+\frac{G-e}{\delta}\Bigr)Z-\frac{G-e}{\delta}
$$

**Talk-through:**

Benefits inflated by claim expense; premium reduced by expense loading e. Rewrite as linear in the insurance PV Z. Discrete analog uses d and K+1.

**How to memorize:**

Think: effective benefit b+E, effective premium rate G−e.

**Mnemonic:** Bigger benefit, smaller net premium income.

---
### 124. E and Var of 0Lg (whole life)

**When used:** From the linear form.

**Formula:**

$$
E[{}_0L^g]=(b+E)A-(G-e)a,\quad \mathrm{Var}({}_0L^g)=\Bigl(b+E+\frac{G-e}{\delta\text{ or }d}\Bigr)^2\bigl({}^2A-A^2\bigr)
$$

**Talk-through:**

Expectation: benefit APV minus premium APV. Variance: square the coefficient of Z times the insurance variance factor. Use bars and δ for continuous; A, ä, d for discrete.

**How to memorize:**

E is linear; Var scales (coeff)²(²A−A²).

**Mnemonic:** E: (b+E)A−(G−e)a; Var: coeff²(²A−A²).

---
### 125. Endowment insurance loss versions

**When used:** Same structure with endowment A and a.

**Formula:**

$$
E[{}_0L^g]=(b+E)A_{x:\overline{n}|}-(G-e)a_{x:\overline{n}|},\quad \mathrm{Var}=\Bigl(b+E+\frac{G-e}{\delta\text{ or }d}\Bigr)^2\bigl({}^2A_{x:\overline{n}|}-A_{x:\overline{n}|}^2\bigr)
$$

**Talk-through:**

Piecewise definition of L depending on death before or after n, but the compact Z form still holds with endowment Z.

**How to memorize:**

Replace whole-life symbols by endowment symbols.

**Mnemonic:** Same pattern, endowment symbols.

---

## F4. Portfolio Percentile Principle
### 126. Portfolio percentile premium

**When used:** Choose G so Pr(aggregate loss < 0) ≈ α.

**Formula:**

$$
S=\sum_{j=1}^n L^g_j \;\dot{\sim}\; N\bigl(nE[{}_0L^g],\, n\mathrm{Var}({}_0L^g)\bigr),\quad \frac{0-nE[{}_0L^g]}{\sqrt{n\mathrm{Var}({}_0L^g)}}=z_\alpha
$$

**Talk-through:**

Sum n i.i.d. policy losses; normal approx; set the standardized zero equal to the α-quantile zα of the standard normal. Solve for the premium inside E[L] and Var(L).

**How to memorize:**

Normal portfolio: (0 − nμ) / √(nσ²) = zα.

**Mnemonic:** Zero sits at zα on the aggregate.

---

# G. Reserves (FAM-L)

## G1. Prospective Formula
### 127. Net premium reserve

**When used:** Prospective net reserve at duration t.

**Formula:**

$$
{}_tV^n=E[{}_tL\mid T_x\ge t]=\mathrm{EPV}_t(\text{benefits})-\mathrm{EPV}_t(\text{net premiums})
$$

**Talk-through:**

Reserve is expected future loss given survival: future benefits minus future net premiums, all valued at time t.

**How to memorize:**

Prospective: look forward only.

**Mnemonic:** V = future ben − future prem.

---
### 128. Gross premium reserve

**When used:** Include expenses.

**Formula:**

$$
{}_tV^g=\mathrm{EPV}_t(\text{ben})+\mathrm{EPV}_t(\text{exp})-\mathrm{EPV}_t(\text{gross premiums})
$$

**Talk-through:**

Same idea with expenses added and gross premiums subtracted.

**How to memorize:**

Gross V uses G and expense streams.

**Mnemonic:** V^g = ben + exp − gross prem.

---
### 129. Expense reserve

**When used:** Difference gross minus net.

**Formula:**

$$
{}_tV^e={}_tV^g-{}_tV^n=\mathrm{EPV}_t(\text{expenses})-\mathrm{EPV}_t(\text{expense loadings})
$$

**Talk-through:**

Expense reserve isolates the expense prefunding.

**How to memorize:**

Ve = Vg − Vn.

**Mnemonic:** Expense V = gross V − net V.

---

## G2. Expectation and Variance of Future Loss
### 130. Future loss tLg (whole life)

**When used:** Parallel to issue loss but from time t.

**Formula:**

$$
{}_tL^g=(b+E)v^{T_{x+t}}-(G-e)\frac{1-v^{T_{x+t}}}{\delta}
$$

**Talk-through:**

Restart the clock at age x+t for the remaining lifetime random variable. Discrete uses k and K_{x+k}.

**How to memorize:**

Same as 0L but age x+t symbols.

**Mnemonic:** Restart at x+t.

---
### 131. E and Var of future loss

**When used:** Prospective mean/variance.

**Formula:**

$$
E[{}_tL^g\mid T_x\ge t]=(b+E)\bar{A}_{x+t}-(G-e)\bar{a}_{x+t},\quad \mathrm{Var}({}_tL^g\mid T_x\ge t)=\Bigl(b+E+\frac{G-e}{\delta}\Bigr)^2\bigl({}^2\bar{A}_{x+t}-(\bar{A}_{x+t})^2\bigr)
$$

**Talk-through:**

Mean future loss is the gross prospective reserve expression when G is the gross premium. Variance uses the usual coefficient-squared times (²A−A²) at the new age. Discrete analog uses A, ä, d.

**How to memorize:**

E[tL] is exactly the prospective gross reserve formula.

**Mnemonic:** E[tL] = reserve formula.

---
### 132. Endowment future loss

**When used:** Remaining term n−t.

**Formula:**

$$
E[{}_tL^g\mid T_x\ge t]=(b+E)\bar{A}_{x+t:\overline{n-t}|}-(G-e)\bar{a}_{x+t:\overline{n-t}|}
$$

**Talk-through:**

Use temporary symbols with remaining term n−t (or n−k discrete). Variance uses the matching endowment second-moment factor.

**How to memorize:**

Remaining term shrinks.

**Mnemonic:** Symbols with n−t.

---

## G3. Recursive Reserves
### 133. Net premium reserve recursion

**When used:** Year-to-year reserve roll-forward.

**Formula:**

$$
({}_kV+P)(1+i)=b\,q_{x+k}+{}_{k+1}V\, p_{x+k}
$$

**Talk-through:**

Start-of-year reserve plus premium, accumulate with interest, funds death claims on those who die and end-of-year reserves on survivors.

**How to memorize:**

In with interest = claims + survivor reserves.

**Mnemonic:** Accumulate = die-pay + live-reserve.

---
### 134. Gross premium reserve recursion

**When used:** With expenses.

**Formula:**

$$
({}_kV^g+G-e)(1+i)=(b+E)q_{x+k}+{}_{k+1}V^g\, p_{x+k}
$$

**Talk-through:**

Same recursion with gross premium net of expense e, and claim including expense E.

**How to memorize:**

G−e in, b+E out on death.

**Mnemonic:** Gross: G−e and b+E.

---
### 135. Reserves between premium dates

**When used:** Fractional duration s.

**Formula:**

$$
({}_kV+P)(1+i_k)^s = b\,v^{1-s}\,{}_sq_{x+k}+{}_{k+s}V\,{}_sp_{x+k}
$$

**Talk-through:**

Accumulate partway through the year; remaining death benefit discounted for the leftover fraction. A companion identity rolls from k+s to k+1 with the leftover survival probabilities.

**How to memorize:**

Two-step: k→k+s and k+s→k+1.

**Mnemonic:** Split the year at s.

---
### 136. FA + kV death benefit special recursion

**When used:** Policy pays face plus reserve on death.

**Formula:**

$$
({}_{k-1}V+P)(1+i)=(FA+{}_kV)q_{x+k-1}+{}_kV\, p_{x+k-1}
$$

**Talk-through:**

Because the death benefit includes the reserve, rearrange to kV = (_{k−1}V+P)(1+i) − FA q_{x+k−1}.

**How to memorize:**

Death benefit includes the reserve itself.

**Mnemonic:** Face+Reserve on death.

---
### 137. Closed form for FA+kV case

**When used:** After iterating the recursion.

**Formula:**

$$
{}_kV = P\,\ddot{a}_{\overline{k}|}(1+i)^k - FA\sum_{j=1}^k q_{x+j-1}(1+i)^{k-j}
$$

**Talk-through:**

Reserve equals accumulated premiums minus accumulated expected face claims along a deterministic interest path.

**How to memorize:**

Accumulated prem annuity minus accumulated FA times q’s.

**Mnemonic:** Accum P minus accum claims.

---

## G4. FPT Reserves
### 138. FPT first-year premium α

**When used:** Full preliminary term: structure first year as one-year term.

**Formula:**

$$
E[{}_0L^{\mathrm{FPT}}]=v q_x-\alpha=0\ \Rightarrow\ \alpha=v q_x
$$

**Talk-through:**

First-year premium α pays exactly for that year’s mortality cost: α = v qx.

**How to memorize:**

Year-1 premium = one-year term cost vqx.

**Mnemonic:** α = v qx.

---
### 139. FPT renewal premium β — whole life

**When used:** Set 1V FPT form to zero: Ax+1 − β äx+1 = 0.

**Formula:**

$$
{}_1V^{\mathrm{FPT}}=A_{x+1}-\beta\ddot{a}_{x+1}=0\ \Rightarrow\ \beta=\frac{A_{x+1}}{\ddot{a}_{x+1}}
$$

**Talk-through:**

Renewal premium is the net premium for a whole life issued at age x+1.

**How to memorize:**

β = P_{x+1}.

**Mnemonic:** Renewal = new issue at x+1.

---
### 140. FPT renewal — term

**When used:** Remaining term after year 1.

**Formula:**

$$
\beta=\frac{A^{1}_{x+1:\overline{n-1}|}}{\ddot{a}_{x+1:\overline{n-1}|}}
$$

**Talk-through:**

β is the net premium at age x+1 for an (n−1)-year term.

**How to memorize:**

Age up one, term down one.

**Mnemonic:** x+1 and n−1 term.

---
### 141. FPT renewal — endowment

**When used:** Remaining endowment after year 1.

**Formula:**

$$
\beta=\frac{A_{x+1:\overline{n-1}|}}{\ddot{a}_{x+1:\overline{n-1}|}}
$$

**Talk-through:**

β is the net premium at age x+1 for an (n−1)-year endowment.

**How to memorize:**

Age up one, term down one.

**Mnemonic:** x+1 and n−1 endowment.

---

---

# Closing Recap Checklist

Use this as a final audio pass — say each family name, then the key template:

### FAM-S Options
- [ ] Call/put payoff max(0, ±(S−K)); profit = payoff − premium·e^{rT}
- [ ] Put-call parity: C−P = S−Ke^{-rT}
- [ ] Binomial: Δ, B, p*, V=e^{-rh}(p*Vu+(1−p*)Vd)
- [ ] BSM: C=SN(d1)−Ke^{-rT}N(d2); d2=d1−σ√T; put via negatives / parity

### FAM-L Probability & Interest
- [ ] F, S, f, λ, Λ and S=e^{-Λ}
- [ ] Var = E[X²]−(EX)²; total variance EV+VE
- [ ] i, d, v, δ, i^{(m)}, d^{(m)}; ä=(1−vⁿ)/d, a=/i, ā=/δ

### Survival
- [ ] tpx, tqx, t|uqx; ℓ ratios; μ; oex=∫tpx; laws (Gompertz/Makeham/CFM/UDD/de Moivre)
- [ ] UDD vs CFM fractional ages; select vs ultimate

### Insurance & Annuities
- [ ] A from ∫/Σ death density; a from ∫/Σ survival; P=A/a
- [ ] Z and Y definitions; Var = b²(²A−A²) or that over δ²/d²
- [ ] UDD i/δ and Woolhouse ä−½−(μ+δ)/12

### Premiums & Reserves
- [ ] Equivalence E[L]=0; gross loss linear in Z
- [ ] Portfolio percentile normal zα equation
- [ ] Prospective V; recursive (V+P)(1+i)=bq+(V₊)p
- [ ] FPT: α=vqx, β=premium at x+1

---

## Document stats

- **Source PDF:** `/Users/kevinwoods/Desktop/ActuarialExams/Exam_Prep/ALTAM/Formula Sheet/FAM_FS.pdf`
- **Sections in this script:** FAM-S **G1–G3**; FAM-L **A1–A4, B1–B2, C1–C8, D1–D5, E1–E5, F1–F4, G1–G4**
- **Formula / formula-block entries:** 141
- **PDF pages:** 9–22

*Generated for memorization / audio study. No git commit.*
