# ALTAM Sample Question 28 — Solution Script
*(Fall 2018 WA Q1 · 10 points)*

---

## 1. Problem restatement

**Product.** Fully discrete **10-year term** of **50,000** to healthy **(60)**; premium waived when sick. 3-state Markov: Healthy (0), Sick (1), Dead (2). Annual transition matrix (age \(60+k\)):

\[
\begin{pmatrix}
0.90-0.01k & 0.05 & 0.05+0.01k\\
0.70-0.01k & 0.20 & 0.10+0.01k\\
0 & 0 & 1
\end{pmatrix}
\]

Gross premium **5,000** from year 3 onward; PV basis **i = 6%**, maint **150**/yr; issue expense **300**. Given APV functions at \(k=2\) (age 62, remaining 8 years).

**Profit test:** earned **5.7%**, hurdle **8%**, pre-contract **200**, maint **60**; given \(\Pi_1=84.74\), \(\Pi_2=80.35\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — \({}_{2}p^{01}_{60}\) (2 pts)

\[
{}_{2}p^{01}_{60}
={}_{1}p^{00}_{60}\,{}_{1}p^{01}_{61}
+{}_{1}p^{01}_{60}\,{}_{1}p^{11}_{61}
=(0.90)(0.05)+(0.05)(0.20)=\mathbf{0.055}
\]

---

### Part (b) — Gross premium policy values (4 pts)

**How to say it in English.** Prospective reserve = EPV of death benefits and maintenance by state occupancy, minus EPV of premiums while healthy.

**(i) Healthy at \(t=2\):**

\[
{}_{2}V^{(0)}
=50{,}000\,\bar{A}^{02}_{62:\overline{8}|}
+150(\ddot{a}^{00}+\ddot{a}^{01})
-5{,}000\,\ddot{a}^{00}
\]

\[
=50{,}000(0.46667)+150(4.7328+0.2533)-5{,}000(4.7328)=\mathbf{417.415}
\]

Show **420**.

**(ii) Sick at \(t=2\):**

\[
{}_{2}V^{(1)}
=50{,}000\,\bar{A}^{12}
+150(\ddot{a}^{10}+\ddot{a}^{11})
-5{,}000\,\ddot{a}^{10}
\]

\[
=50{,}000(0.49680)+150(3.334+1.406)-5{,}000(3.334)=\mathbf{8{,}881}
\]

Show **8,880**.

**(iii) Given \({}_{3}V^{(0)}=1{,}788\).** Recursion from Healthy:

\[
\bigl({}_{2}V^{(0)}+5{,}000-150\bigr)(1.06)
=p^{02}(50{,}000)+p^{00}{}_{3}V^{(0)}+p^{01}{}_{3}V^{(1)}
\]

At age 62: \(p^{00}=0.88\), \(p^{01}=0.05\), \(p^{02}=0.07\):

\[
{}_{3}V^{(1)}=\dfrac{5{,}583.46-3{,}500-1{,}573.44}{0.05}=\mathbf{10{,}200.40}
\]

---

### Part (c) — \(\Pi_3\) and DPP (4 pts)

**(i)** Emerging profits by start-of-year state at earned 5.7%, maint 60:

\[
\mathrm{PPV}_3^{(0)}
=\bigl(417.415+5{,}000-60\bigr)(1.057)
-0.88(1{,}788)-0.05(10{,}200.4)-0.07(50{,}000)
=79.328
\]

\[
\mathrm{PPV}_3^{(1)}
=\bigl(8{,}881-60\bigr)(1.057)
-0.68(1{,}788)-0.20(10{,}200.4)-0.12(50{,}000)
=67.877
\]

Occupancy at duration 2: \({}_{2}p^{00}=0.8355\), \({}_{2}p^{01}=0.055\):

\[
\Pi_3=0.8355(79.328)+0.055(67.877)=\mathbf{70.012}
\]

Show **70**.

**(ii) Cumulative NPV at hurdle 8%** (\(v=1/1.08\)):

| \(t\) | \(\Pi_t\) | \(\mathrm{NPV}_t\) |
|------:|----------:|-------------------:|
| 0 | −200.00 | −200.00 |
| 1 | 84.74 | −121.54 |
| 2 | 80.35 | −52.65 |
| 3 | 70.01 | **2.93** |

First non-negative cumulative NPV at \(t=3\) ⇒ **DPP = 3 years**.

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| 2-step \(p^{01}\) | \(p^{00}p^{01}+p^{01}p^{11}\) |
| \(V^{(0)}\) | \(S A^{02}+150(\ddot{a}^{00}+\ddot{a}^{01})-P\ddot{a}^{00}\) |
| \(V^{(1)}\) | \(S A^{12}+150(\ddot{a}^{10}+\ddot{a}^{11})-P\ddot{a}^{10}\) |
| Recursion | \((V+P-E)(1+i)=\sum_j p^{0j}(\mathrm{ben}_j+V^{(j)})\) |
| Signature | \(\Pi_t=\sum_j {}_{t-1}p^{0j}\,\mathrm{PPV}_t^{(j)}\) |
| DPP | first \(t\) with \(\sum_{k=0}^t\Pi_k v^k\ge 0\) |

**Official targets:** \({}_{2}p^{01}=0.055\); \(V^{(0)}_2=417.415\) (420); \(V^{(1)}_2=8{,}881\) (8,880); \(V^{(1)}_3=10{,}200.40\); \(\Pi_3=70.012\) (70); DPP = **3 years**.
