# ALTAM Sample Question 29 — Solution Script
*(Spring 2019 WA Q5 · 8 points)*

---

## 1. Problem restatement

**Product.** 5-year term + partially accelerated CI rider on Healthy \((x)\). States: Healthy (0), CI (1), Dead after CI (2), Dead no CI (3).

**Benefits (year-end):** CI alive in State 1 → **600,000**; death from State 0 → **1,000,000**; death from State 1 → **500,000**. Premiums **30,000**/yr in State 0 only.

**Profit test:** \(i=6\%\), hurdle **10%**, commission **5%**, State-1 maint **100**, pre-contract **500**. Transitions at \(x+k\): \(p^{01}=0.01+0.002k\), \(p^{02}=0.008+0.003k\), \(p^{03}=0.004\), \(p^{12}=0.25\). Reserves given at \(t=2,3,4\).

---

## 2–3. Part-by-part walkthrough

### Part (a) — Emerging profit year 3 from State 0 (3 pts)

**How to say it in English.** Accumulate start-of-year reserve plus premium net of commission at fund interest; subtract expected CI and death benefits and expected end-of-year reserves for survivors in 0 and 1.

At age \(x+2\): \(p^{01}=p^{02}=0.014\), \(p^{03}=0.004\), \(p^{00}=0.968\).

\[
\mathrm{PPV}_3^{(0)}
=\bigl(12{,}000+30{,}000-1{,}500\bigr)(1.06)
-0.014(600{,}000)-0.014(1{,}000{,}000)-0.004(1{,}000{,}000)
-0.968(9{,}000)-0.014(210{,}000)
\]

\[
=42{,}930-8{,}400-14{,}000-4{,}000-8{,}712-2{,}940=\mathbf{4{,}878}
\]

Show **4,900** (nearest 100).

---

### Part (b) — Emerging profit year 3 from State 1 (2 pts)

No premium; maint 100; death benefit 500,000 with \(p^{12}=0.25\); survivors keep \(V^{(1)}_3=210{,}000\).

\[
\mathrm{PPV}_3^{(1)}
=(280{,}000-100)(1.06)-0.25(500{,}000)-0.75(210{,}000)
=\mathbf{14{,}194}
\]

Show **14,200**.

---

### Part (c) — Profit signature \(\Pi_3\) (2 pts)

Occupancy at start of year 3:

\[
{}_{2}p^{00}=(0.978)(0.973)=\mathbf{0.951594}
\]

\[
{}_{2}p^{01}=(0.978)(0.012)+(0.01)(0.75)=\mathbf{0.019236}
\]

\[
\Pi_3={}_{2}p^{00}\,\mathrm{PPV}_3^{(0)}+{}_{2}p^{01}\,\mathrm{PPV}_3^{(1)}
=(0.951594)(4{,}878)+(0.019236)(14{,}194)=\mathbf{4{,}914.91}
\]

---

### Part (d) — Partial NPV(3) (1 pt)

Given \(\Pi_0=-500\), \(\Pi_1=-770\), \(\Pi_2=3{,}536\); \(v=1/1.1\):

\[
\mathrm{NPV}(3)
=-500-\dfrac{770}{1.1}+\dfrac{3{,}536}{1.1^{2}}+\dfrac{4{,}914.91}{1.1^{3}}
=\mathbf{5{,}414.96}
\]

---

## 4. Formula cheat sheet

| Use | Formula |
|-----|---------|
| State profit | \(\mathrm{PPV}=(V+P-E)(1+i)-\sum p^{jk}\mathrm{ben}_{jk}-\sum p^{jk}V^{(k)}\) |
| Signature | \(\Pi_t=\sum_j {}_{t-1}p^{0j}\,\mathrm{PPV}_t^{(j)}\) |
| 2-step \(p^{00}\) | \(p^{00}_0 p^{00}_1\) |
| 2-step \(p^{01}\) | \(p^{00}_0 p^{01}_1+p^{01}_0 p^{11}_1\) |
| Partial NPV | \(\sum_{k=0}^{3}\Pi_k/(1.1)^k\) |

**Official targets:** \(\mathrm{PPV}_3^{(0)}=4{,}878\) (show 4,900); \(\mathrm{PPV}_3^{(1)}=14{,}194\) (show 14,200); \(\Pi_3=4{,}914.91\); \(\mathrm{NPV}(3)=5{,}414.96\).
