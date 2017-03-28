---
title: "Note on generating a divergence identity"
modified:
categories: [notes]
excerpt:
tags: [geometry]
date: 2017-03-27T18:00:00-05:00
modified:
---

Special thanks to [Ben Mares](http://tensorial.com/) for posing this
problem.
<script type="math/tex">
\newcommand{\cd}{\nabla}
</script>

## Motivation

The motivation for this calculation comes
from
[Bochner's formula](https://en.wikipedia.org/wiki/Bochner%27s_formula)
for harmonic functions.  On a manifold $$M$$ with metric $$g$$, a
function $$u: M\to \mathbb{R}$$ is harmonic if $$\Delta u = 0$$, where
$$\Delta \equiv \cd^a \cd_a$$ is the Laplacian and $$\cd$$ is the
Levi-Civita connection compatible with $$g$$.  Let's define
$$X_a =\cd_a u$$, which is divergence-free, $$\cd_a X^a = 0$$.
Then Bochner's formula says
<div>
\begin{align}
\label{eq:bochner}
\Delta( \frac{1}{2} X^a X_a )
= (\cd_a X_b)(\cd^a X^b) + R_{ab} X^a X^b \,.
\end{align}
</div>
Why is this formula interesting?  Well, the left hand side is a total
divergence, so it will vanish if integrated over a manifold without
boundary (or if the boundary term vanishes).  Meanwhile, if the metric
is Riemannian, then the first term on the right hand side is
non-negative; and the sign of the final term is determined by the
eigenvalues of the Ricci tensor.  This formula is useful for
estimating energy bounds.

Another viewpoint on this formula is to rearrange it as an identity
for $$|\cd X|^2$$, which looks like a kinetic term.  Then Bochner's
formula says:  $$|\cd X|^2$$ *is a total divergence, modulo
lower-derivative curvature terms*.

A natural question is: does this divergence identity generalize?

## Generating the divergence identity

From here forward let's drop the divergence-free condition, so
$$\cd_a X^a $$ may be non-zero (though the identities hold just as
well for vanishing $$\cd_a X^a$$).

It turns out that we can generalize the above identity by constructing
carefully anti-symmetrized tensor products of the tensor $$M_a{}^b
\equiv \cd_a X^b$$.  These expressions arise in the expansion of the
[characteristic polynomial](https://en.wikipedia.org/wiki/Characteristic_polynomial)
of $$M_a{}^b$$ (the characteristic polynomial made an appearance in
[an earlier note]({{ site.url }}{% post_url 2017-02-08-note-on-a-dimension-dependent-Weyl-identity %})
that I wrote).  The characteristic polynomial of an $$n\times n$$
matrix is given by
$$p_M(t) \equiv \det(tI - M)$$, where $$I$$ is the $$n\times n$$
identity matrix.

The term proportional to $$t^{n-k}$$ is homogeneous of degree $$k$$ in
the coefficients of $$M$$.  Wikipedia writes this
as $$(-1)^k \mathrm{tr}(\Lambda^k M)$$, which is a bit abstruse.
Let's clarify by first forming the $$k$$-th tensor product,
<div>
\begin{align}
M_{i_1}{}^{j_1} M_{i_2}{}^{j_2} \cdots M_{i_k}{}^{j_k} \,.
\end{align}
</div>
Now antisymmetrize on all the i and/or j indices, and completely
contract the upper indices with all of the lower indices.  Let's call
this $$p_{(k)}$$,
<div>
\begin{align}
p_{(k)} =
(\cd_{i_1}X^{[i_1})
(\cd_{i_2}X^{i_2})\cdots
(\cd_{i_k}X^{i_k]}) \,.
\end{align}
</div>
It is important to remember that the antisymmetrization happens first,
before contraction.

This question is now: *is $$p_{(k)}$$ a total divergence, modulo
lower-derivative curvature terms*?  The answer is yes (why else would
I have written these notes).

To see this, let's define the vector
<div>
\begin{align}
D_{(k)}^i \equiv
X^{[i} (\cd_{i_2}X^{i_2}) \cdots (\cd_{i_k}X^{i_k]}) \,.
\end{align}
</div>
What happens when we take the divergence of this vector?  Using the
product rule, we will generate $$k$$ terms (each of which is actually
antisymmetrized over the $$k$$ upper indices, so it's really
$$k\cdot k!$$ terms).

The first of these terms, when $$\cd_i$$ hits $$X^i$$, is precisely
$$p_{(k)}$$.  What about the remaining $$k-1$$ terms, when $$\cd_i$$
hits $$\cd_{i_r}X^{i_r}$$, $$2\le r \le k$$?  That is, a term of the
form
<div>
\begin{align}
X^{[i} (\cd_{i_2}X^{i_2}) \cdots
(\cd_i \cd_{i_r}X^{i_r}) \cdots
(\cd_{i_k}X^{i_k]}) \,.
\end{align}
</div>
The crucial observation is that the two derivative indices $$i\,i_r$$
are contracted with the *completely anti-symmetric* block of indices
$$[i\,i_1\,\ldots\,i_k]$$.  This means that we are free to transfer
over the antisymmetry onto the double derivative indices
$$[i\,i_r]$$; and this makes it a commutator of derivatives and thus a
curvature term.

Thus we arrive at the following divergence identity,
<div>
\begin{align}
\cd_i D_{(k)}^i - p_{(k)} =
\sum_{r=2}^k
\frac{1}{2} X^{[i_1}
(\cd_{i_2}X^{i_2}) \cdots
R_{i_1 i_r}{}^{i_r}{}_j X^{|j|}
\cdots (\cd_{i_k}X^{i_k]})
\,,
\end{align}
</div>
where the vertical bars around $$j$$ mean that we do not
antisymmetrize that index.  Again it is important to antisymmetrize
over the upper indices first, and trace second; so the Riemann does
not automatically become a Ricci.

Thus we have established that $$p_{(k)}$$ is a total divergence,
modulo lower-derivative curvature terms.

We can give a few examples, but the expressions get very large very
quickly.  For $$k=2$$, we have
<div>
\begin{align}
\cd_i D_{(2)}^i - p_{(2)} =
-\frac{1}{2} R_{ab}X^a X^b
\,,
\end{align}
</div>
which is a way of re-writing Bochner's formula Eq. \eqref{eq:bochner}.
For $$k=3$$, we have
<div>
\begin{align}
\cd_i D_{(3)}^i - p_{(3)} =
\frac{1}{3} X^a X^b
\left(
R_{bc}\cd_a X^c
-R_{ab}\cd_c X^c
+R_{acb}{}^d\cd_d X^c
\right)
\,.
\end{align}
</div>
For $$k=4$$, we have the intimidating
<div>
\begin{align}
\cd_i D_{(4)}^i - p_{(4)} =
-\frac{1}{8} X^{a} X^{b}
\Big[&
2 \cd_{a}X^{c} (R_{bd} \cd_{c}X^{d} 
- R_{bc} \cd_{d}X^{d})
\\ &
{}+ R_{ab} (\cd_{c}X^{c} \cd_{d}X^{d} 
    - \cd_{c}X^{d} \cd_{d}X^{c})
\nonumber\\ &
{}+ 2 \cd_{e}X^{d} (R_{acb}{}^{e} \cd_{d}X^{c}
+ R_{cdb}{}^{e} \cd_{a}X^{c} 
- R_{adb}{}^{e} \cd_{c}X^{c})
\Big]\,.\nonumber
\end{align}
</div>
Obviously I would recommend using [xTensor](http://www.xact.es/) to do
these computations.  My notebook to do these calculations is available
upon request.
