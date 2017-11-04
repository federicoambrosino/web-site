---
title: "Note on Lie derivatives and divergences"
modified:
categories: [notes]
excerpt: "When can you integrate-by-parts with Lie derivatives?"
tags: [geometry]
date: 2017-04-12T18:00:00-05:00
modified:
---

<script type="math/tex">
\newcommand{\cd}{\nabla}
\newcommand{\pd}{\partial}
\newcommand{\Lie}{\mathcal{L}}
</script>
One of Saul Teukolsky's favorite pieces of advice is if you're ever
stuck, try integrating by parts.  If we're working with a covariant
derivative $$\cd_a$$, and we have some tensor quantities $$S, T$$ under
an integral, then every calculus student knows that we can move the
derivative from one to the other,
<div>
\begin{align}
\int_R S (\cd_a T) \sqrt{|g|} d^nx =
\int_R (- \cd_a S) T \sqrt{|g|} d^nx + \textrm{boundary term.}
\end{align}
</div>
(Of course, this only makes sense if your integral itself makes
sense---so $$\cd, S, T$$ together make the integrand a scalar.)  Here
$$R$$ is the integration region, and the boundary terms above come
from
[Stokes' theorem](https://en.wikipedia.org/wiki/Stokes%27_theorem),
converting the integral of a total divergence in $$R$$ into the
integral of a flux through the boundary $$\pd R$$.

Sometimes in differential geometry, instead of dealing with a
metric-compatible covariant derivative $$\cd_a$$, we're dealing with a
[Lie derivative](https://en.wikipedia.org/wiki/Lie_derivative)
$$\Lie_v$$ along a vector field $$v$$.  Wouldn't it be convenient,
then, if we could integrate by parts with Lie derivatives?  That is,
do we have the property that
<div>
\begin{align}
\label{eq:Lie-int-by-parts-q}
\int_R S (\Lie_v T) \sqrt{|g|} d^nx \overset{?}{=}
\int_R (- \Lie_v S) T \sqrt{|g|} d^nx + \textrm{boundary term?}
\end{align}
</div>
After all, integrating by parts comes from rearranging the Leibniz
rule $$\cd_a(S\, T) = (\cd_a S) T + S (\cd_a T)$$.  But the Lie
derivative, being a
[derivation](https://en.wikipedia.org/wiki/Derivation_(differential_algebra)),
also satisfies the Leibniz rule,
<div>
\begin{align}
\label{eq:Lie-Leibniz}
\Lie_v(S\, T) = (\Lie_v S) T + S (\Lie_v T) .
\end{align}
</div>
But in reality all this gets us is the formula
<div>
\begin{align}
\int_R S (\Lie_v T) \sqrt{|g|} d^nx =
\int_R (- \Lie_v S) T \sqrt{|g|} d^nx +
\int_R \Lie_v(S \, T) \sqrt{|g|}d^nx \,.
\end{align}
</div>

If we want this to become Eq. \eqref{eq:Lie-int-by-parts-q}, then we
need the final term to be a total divergence.  The sufficient
condition for this to be a total divergence is that $$v^a$$ *must be
divergence-free*.  We can show this by detouring back through
covariant derivatives.  First, notice that for this integrand
to make sense, we need all the indices in the product $$ST$$ to be
contracted so that it is a scalar.  Now the action of a Lie derivative
on a scalar is the same as the action of that vector on the scalar,
and can also be expressed in terms of any covariant derivative,
<div>
\begin{align}
\Lie_v(S \, T) = v(S \, T) = v^a \pd_a (S \, T )= v^a \cd_a (S \, T) \,.
\end{align}
</div>
Notice that when $$\cd_a v^a = 0$$, we can pull it inside the
derivative,
<div>
\begin{align}
\cd_a v^a = 0 \quad \Longrightarrow \quad
v^a \cd_a (S \, T) = \cd_a (  v^a  S \, T) \,.
\end{align}
</div>
When this is the case, we can turn the last term into a boundary
integral,
<div>
\begin{align}
&\cd_a v^a = 0 \quad \Longrightarrow \nonumber\\
&\int_R S (\Lie_v T) \sqrt{|g|} d^nx =
\int_R (- \Lie_v S) T \sqrt{|g|} d^nx +
\int_{\pd R} S T v^a n_a \sqrt{|\gamma|} d^{n-1} x
\,,
\end{align}
</div>
where $$n_a$$ is the unit normal to the boundary $$\pd R$$ and
$$\sqrt{|\gamma|} d^{n-1}x$$ is the proper "area" element.

## Special case: Killing vector field

A
[Killing vector field](https://en.wikipedia.org/wiki/Killing_vector_field)
(KVF) is a special case of a divergence-free
vector field.  If $$v$$ is a KVF, it generates an isometry of the
metric,
<div>
\begin{align}
\Lie_v g = 0 \quad \Longrightarrow \quad
\cd_{(a} v_{b)} = 0 \quad \Longrightarrow \quad
\cd_a v^a = 0 \,,
\end{align}
</div>
where the last equality comes from taking the trace of the middle
equation.  Thus we have the corollary that we can "integrate by parts"
the Lie derivative along any Killing vector field.
