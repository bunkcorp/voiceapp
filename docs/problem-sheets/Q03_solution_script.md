# ALTAM Sample Question 3 — Solution Script
*(MLC Fall 2015 Q4 · 10 points)*

---

## 1. Problem restatement

**Product.** Special **fully discrete 2-year term** on **(60)**.

| Feature | Detail |
|---------|--------|
| Death benefit | **1,000** + return of gross premiums paid **with interest at 6%** |
| Withdrawal | Double decrement; **no** withdrawal benefit |
| Interest | \(i=0.06\) (so \(v=1/1.06\)) |
| Premium | Annual gross **G** (due at start of each year in force) |
| Loss | \(_{0}L\) = insurer’s loss at issue |

**Double-decrement table:**

| \(x\) | \(q_x^{(d)}\) | \(q_x^{(w)}\) |
|------:|:-------------:|:-------------:|
| 60 | 0.06 | 0.04 |
| 61 | 0.12 | 0.00 |

**Parts.** (a) Fill loss/probability table for four exhaustive events. (b) Moments \(E[{}_0L]=a-bG\) and \(\operatorname{Var}({}_0L)=cG^2+dG+e\). (c) With \(N=200\), \(G=130\), \(\Pr({}_{\mathrm{agg}}L>0)\) by normal approx (no continuity correction).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Loss table (4 pts)

**Intuition.** Four mutually exclusive paths: die year 1, withdraw year 1, die year 2, survive both years. On each path, write PV of benefit minus PV of premiums paid, then attach the path probability.

**How to say it in English.** Discount everything to issue. Death pays 1,000 plus premiums accumulated at 6%; because the contract interest matches \(i=0.06\), those returned premiums cancel their own discounting and leave a clean \(1000v\) or \(1000v^2\). Survival pays nothing and you keep both premiums.

**Factors:** \(v=1/1.06\), \(v^2=v\cdot v\). Survival probabilities: \({}_1p_{60}^{(\tau)}=0.90\), \({}_1p_{61}^{(\tau)}=0.88\).

| Event | \({}_0L\mid\text{event}\) | Probability |
|-------|---------------------------|-------------|
| Death year 1 | \(1000v=\mathbf{943.4}\) | \(0.06\) |
| Withdrawal year 1 | \(\mathbf{-G}\) | \(0.04\) |
| Death year 2 | \(1000v^2=\mathbf{890.0}\) | \(0.90\times 0.12=\mathbf{0.108}\) |
| Neither (survive 2 yrs) | \(-(1+v)G=\mathbf{-1.9434\,G}\) | \(0.90\times 0.88=\mathbf{0.792}\) |

**Why ROP vanishes on death paths.** Benefit \(=1000+G(1.06)\) at end of year 1 (one premium), or \(1000+G(1.06)^2+G(1.06)\) at end of year 2 (two premiums). Discounting at 6% turns the ROP pieces into \(+G\) (and \(+G+Gv\)), which cancel the premium outflows on those paths — leaving only \(1000v\) or \(1000v^2\).

**Answer to report:** the four rows above (official rounded values).

---

### Part (b)(i) — \(E[{}_0L]=a-bG\) (2 pts)

**Intuition.** Weight each path’s loss by its probability; collect the constant term and the coefficient of \(G\).

**Formula:**

\[
E[{}_0L]
=(943.4)(0.06)+(-G)(0.04)+(890.0)(0.108)+(-1.9434\,G)(0.792)
\]

**Plug-in (official SOA):**

\[
E[{}_0L]=\mathbf{152.7}-\mathbf{1.579}\,G
\]

so \(a=\mathbf{152.7}\) (show 150 to nearest 10), \(b=\mathbf{1.579}\) (show 1.58 to nearest 0.01).

**Answer to report:** \(a=152.7\), \(b=1.579\).

---

### Part (b)(ii) — \(\operatorname{Var}({}_0L)=cG^2+dG+e\) (2 pts)

**Intuition.** Use \(\operatorname{Var}(L)=E[L^2]-(E[L])^2\) with the same four-point distribution — do **not** use a memorized level-benefit term formula.

**Formulas:**

\[
E[{}_0L^2]
=(943.4)^2(0.06)+G^2(0.04)+(890.0)^2(0.108)+(1.9434\,G)^2(0.792)
\]

\[
\operatorname{Var}({}_0L)=E[{}_0L^2]-\bigl(152.7-1.579\,G\bigr)^2
\]

**Official SOA expansion:**

\[
\operatorname{Var}({}_0L)=\mathbf{0.538}\,G^2+\mathbf{482.2}\,G+\mathbf{115{,}630}
\]

so \(c=\mathbf{0.54}\) (nearest 0.01; show 0.5 to nearest 0.1), \(d=\mathbf{482}\) (nearest 1; show 480 to nearest 10), \(e=\mathbf{115{,}630}\) (nearest 100; show 116,000 to nearest 1,000).

**Answer to report:** \(c=0.538\), \(d=482.2\), \(e=115{,}630\) (then round as the stem asks).

---

### Part (c) — Aggregate normal approximation (2 pts)

**Intuition.** Independent identical policies → \(E[L_{\mathrm{agg}}]=N\,E[{}_0L]\), \(\operatorname{Var}(L_{\mathrm{agg}})=N\,\operatorname{Var}({}_0L)\). Standardize and use \(\Phi\).

**Plug-in with \(G=130\), \(N=200\):**

\[
E[{}_0L]=152.7-1.579(130)=\mathbf{-52.57}
\]

\[
\operatorname{Var}({}_0L)=0.538(130)^2+482.2(130)+115{,}630=\mathbf{187{,}408}
\]

\[
E[L_{\mathrm{agg}}]=200(-52.57)=\mathbf{-10{,}514},\qquad
\sqrt{\operatorname{Var}(L_{\mathrm{agg}})}=\sqrt{200\times 187{,}408}=\mathbf{6{,}122.2}
\]

\[
\Pr(L_{\mathrm{agg}}>0)
=1-\Phi\!\left(\frac{0-(-10{,}514)}{6{,}122.2}\right)
=1-\Phi(1.72)
=\mathbf{0.0427}
\]

**Answer to report:** \(\mathbf{0.0427}\).

---

## 4. Formula cheat sheet

| Object | Expression / target |
|--------|---------------------|
| \(v\) | \(1/1.06\) |
| Death Y1 | \(1000v=943.4\), \(p=0.06\) |
| Withdraw Y1 | \(-G\), \(p=0.04\) |
| Death Y2 | \(1000v^2=890.0\), \(p=0.108\) |
| Survive 2 yrs | \(-(1+v)G=-1.9434G\), \(p=0.792\) |
| \(E[{}_0L]\) | \(152.7-1.579G\) |
| \(\operatorname{Var}({}_0L)\) | \(0.538G^2+482.2G+115{,}630\) |
| \(\Pr(L_{\mathrm{agg}}>0)\) at \(G=130\), \(N=200\) | **0.0427** |
