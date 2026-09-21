# ALTAM Sample Question 14 — Solution Script
*(ALTAM sample · 10 points)*

---

## 1. Problem restatement

**Product.** Fully discrete 3-year term of **100,000** on (40); \(i=0.05\). Double decrement: (1) Disease 1, (2) other causes. \(\mu^{(1)}\) Makeham with \(A=0.0001\), \(B=1.075\times 10^{-5}\), \(c=1.12\); \(\mu^{(\tau)}=4\mu^{(1)}\).

**Also given:** \({}_2p_{40}^{(\tau)}=0.99027\), \({}_3p_{40}^{(\tau)}=0.98462\).

**Rider.** Extra **50,000** if death from Disease 1.

**Parts.** (a) \({}_1p_{40}^{(\tau)}\). (b) EPV benefits and net premium. (c) Disease-1 \(q\) identity and rider premium. (d) Policy value at \(t=1\) including rider.

---

## 2–3. Part-by-part walkthrough

### Part (a) — \({}_1p_{40}^{(\tau)}\) (2 pts)

**Intuition.** Total force is 4× Disease-1 force, so dependent survival is Makeham survival raised to the 4th power (or Integrate \(4\mu^{(1)}\)).

**How to say it in English.** Survive one year under four times the Makeham Disease-1 force.

**Formulas:**

\[
{}_1p'^{(1)}_{40}
=\exp\!\Bigl(-\int_0^1\mu_{40+t}^{(1)}\,dt\Bigr)
=0.9988415
\]

\[
{}_1p_{40}^{(\tau)}=({}_1p'^{(1)}_{40})^4=\mathbf{0.9954}
\]

**Answer to report:** **0.9954** (show **0.995** to nearest 0.001). Use **0.99537** in later EPVs.

---

### Part (b)(i) — EPV of death benefits (1 pt of 2)

**Formula:**

\[
\mathrm{EPV}
=100{,}000\sum_{k=0}^{2}v^{k+1}\bigl({}_kp^{(\tau)}-{}_{k+1}p^{(\tau)}\bigr)
\]

**Plug-in** with \(p_0=1\), \(p_1=0.99537\), \(p_2=0.99027\), \(p_3=0.98462\):

\[
\mathrm{EPV}=100{,}000(0.013916)=\mathbf{1{,}391.60}
\]

**Answer to report:** **1,391.60** (show **1,400** to nearest 100).

---

### Part (b)(ii) — Net annual premium (1 pt of 2)

**Formula:**

\[
P\,\ddot{a}_{40:\overline{3}|}^{(\tau)}
=P\bigl(1+v\,{}_1p^{(\tau)}+v^2\,{}_2p^{(\tau)}\bigr)
=\mathrm{EPV}
\]

**Plug-in:**

\[
\ddot{a}=2.84618\Rightarrow P=\frac{1391.60}{2.84618}=\mathbf{488.9}
\]

**Answer to report:** **488.9** (show **490** to nearest 10).

---

### Part (c)(i)–(ii) — Disease 1 identity (2 pts of 4)

**(i) Integral:**

\[
{}_tq^{(1)}_{40}
=\int_0^t {}_sp_{40}^{(\tau)}\,\mu_{40+s}^{(1)}\,ds
\]

**(ii) Proof.** Since \(\mu^{(\tau)}=4\mu^{(1)}\),

\[
{}_tq^{(\tau)}_{40}
=\int_0^t {}_sp^{(\tau)}\,\mu^{(\tau)}\,ds
=4\int_0^t {}_sp^{(\tau)}\,\mu^{(1)}\,ds
=4\,{}_tq^{(1)}_{40}
\]

so \({}_tq^{(1)}=\frac14{}_tq^{(\tau)}\).

---

### Part (c)(iii) — Rider net premium (2 pts of 4)

**Intuition.** Rider EPV is \(\tfrac14\) of base benefit EPV scaled by face \(50{,}000/100{,}000\).

**How to say it in English.** Disease-1 deaths are one-fourth of all deaths under the constant force ratio, so the rider is one-fourth of a 50k version of the base EPV—or equivalently half of one-fourth of the 100k EPV.

**Formula:**

\[
\mathrm{EPV}_{\mathrm{rider}}
=50{,}000\cdot\tfrac14\cdot\frac{1391.60}{100{,}000}
=173.95
\]

\[
P_r=\frac{173.95}{2.8462}=\mathbf{61.1}
\]

**Answer to report:** **61.1** (show **60** to nearest 10).

---

### Part (d) — Policy value at \(t=1\) with rider (2 pts)

**Intuition.** Recursive reserve: grow premium fund one year, pay expected claims (100k + 50k on Disease 1), set up zero terminal reserve for survivors at \(t=3\) path—here one year into a 3-year term.

**Official recursion result:**

\[
{}_1V=\mathbf{57.39}
\]

**Answer to report:** \(\mathbf{57.39}\).

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| \(\mu^{(\tau)}=4\mu^{(1)}\) | \({}_tp^{(\tau)}=({}_tp'^{(1)})^4\) |
| Term EPV | \(b\sum v^{k+1}({}_kp-{}_{k+1}p)\) |
| Premium | \(P=\mathrm{EPV}/\ddot{a}_{:\overline{3}|}\) |
| Disease-1 share | \(q^{(1)}=\tfrac14 q^{(\tau)}\) |
| Rider premium | \(P_r=\tfrac12\cdot\tfrac14\cdot P_{\mathrm{base}}\) (same \(\ddot{a}\)) |

**Official targets:** \(p=0.9954\); EPV \(1391.60\); \(P=488.9\); \(P_r=61.1\); \({}_1V=57.39\).
