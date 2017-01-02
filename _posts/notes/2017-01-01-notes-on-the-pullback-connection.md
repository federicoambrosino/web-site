---
title: Notes on the pullback connection
modified:
categories: [notes]
excerpt: "In an effort to keep myself organized, I decided I should type up some notes I have laying around."
tags: [geometry]
date: 2017-01-01T15:57:29-08:00
---

<script type="math/tex">
\newcommand{\lie}{\mathcal{L}}
\newcommand{\cd}{\nabla}
\newcommand{\ad}{\mathop{\rm ad}\nolimits}
</script>

{% include toc %}

In an effort to keep myself organized, I decided I should type up
some notes I have laying around.  These calculations are not enough to
be a journal article (or even a note on the arXiv), but slightly
non-trivial, so I don't want to lose them.

## Definitions

This note is on a construction called the *pullback
connection*. Consider a manifold
$$\mathcal{M},$$
and let there be a one-parameter family of diffeomorphisms
$$\varphi_{t}:\mathcal{M}\to \mathcal{M}.$$
The one-parameter family is
of course a Lie group under composition, and
$$\varphi_{s}\circ \varphi_{t} = \varphi_{s+t}.$$
The diffeomorphism induces a number of maps, e.g. the pullback map
$$\varphi_{t}^{*}$$
and the pushforward map
$$\varphi_{t*},$$
sometimes written
$$d\varphi_{t}.$$
While the pullback and pushforward are defined for general maps
between manifolds, since this one is a diffeomorphism from the
manifold to itself, the pullback and pushforward are inverses,
$$\varphi_{t*} = \varphi_{-t}^{*}.$$

Let $$v^{a}$$ be the vector field tangent to the one-dimensional orbits
of $$\varphi.$$  Recall that the Lie
derivative is defined as
\\begin{align}
  \label{eq:lie-deriv-def}
  \lie\_{v} T = \frac{d}{dt} 
  \Big[ \varphi\_{t}^{\*} T \Big]\_{t=0}
  \,.
\\end{align}
Conversely, we can think of the pullback as exponentiation of the Lie
derivative, $$\varphi_{t}^{*}=\exp[t\lie_{v}]$$.

Now let there be a connection $$\cd$$ on this manifold, so that for any
vector field
$$X\in \mathcal{X}(\mathcal{M}),$$
$$\cd_{X}$$
is a map from the space of tensor fields of rank
$$(p,q)$$
to the same space; that
$$\cd_{X}$$
satisfies the Leibniz property, and so on; and in particular
that it only involves $$X$$ but not derivatives of $$X$$ (one example of
such a connection is of course the Levi-Civita connection of a metric,
but we will get to this later).

Given the connection $$\cd$$ and a diffeomorphism
$$\varphi_{t},$$
there is a new connection we can construct: the *pullback connection*,
$$(\varphi_{t}^{*}\cd).$$ 
We define it as follows:
\\begin{align}
  \label{eq:pullback-connection-defn}
  (\varphi_{t}^{*}\cd)\_{X} T \equiv \varphi_{t}^{\*}
  \left[
  \cd_{d\varphi_{t}(X)} 
  \left(
  \varphi_{t\*} T
  \right)
  \right]
  \,.
\\end{align}
In words, this definition is: take tensor $$T$$ and push it forward
along the map; take its derivative with your given connection $$\cd$$,
but in the direction given by the pushed-forward version of $$X$$; then
take the whole result and pull it back.

As we know, the space of connections is an affine space, and there are
connection coefficients
$$C^{c}{}_{ab}$$
which are the difference between two particular connections.  A
natural question would be:
given $$\cd$$ and
$$\varphi_{t},$$
what is the difference
$$(\varphi_{t}^{*}\cd)-\cd?$$

## For a Killing vector field

I will address the general case below, but first
specialize to the case when $$\cd$$ is the Levi-Civita connection of
some metric $$g$$, and $$\varphi_{t}$$ is an isometry of $$g$$, i.e. that
\\begin{align}
  \label{eq:g-isometry}
  g = \varphi\_{t} g
  \,.
\\end{align}
In this case, we see that
\\begin{align}
  \label{eq:pullback-conn-of-g-vanishes}
  (\varphi\_{t}^{\*}\cd)\_{X} g = 0 \quad \forall X\,.
\\end{align}
This is a direct application of the definition of the pullback
connection in Eq. $$\eqref{eq:pullback-connection-defn}$$ and the isometry
condition Eq. $$\eqref{eq:g-isometry}.$$  But since the Levi-Civita
connection is unique, this means that
\\begin{align}
  \label{eq:isometry-conns-agree}
  \varphi\_{t}\text{ is an isometry of }g
  \qquad\Longrightarrow\qquad
  (\varphi_{t}^{*}\cd) = \cd
  \,.
\\end{align}

Since the two connections agree, we have the equality
\\begin{align}
  \cd\_{X} T = \varphi\_{-t}^{\*}
  \left[
  \cd\_{\varphi\_{t}^{\*}(X)}
  \left(
  \varphi\_{t}^{\*} T
  \right)
  \right]
\\end{align}
for all $$X,T$$ (the astute reader will have noticed that we have
flipped the sign of $$t\to -t$$ in order to make later calculations
prettier).  Now we will find the infinitesimal version of this
identity.  Apply the inverse $$\varphi_{t}^{*}$$ to both sides of this
equality, differentiate both sides with respect to $$t$$, and then
evaluate at $$t=0$$:
\\begin{align}
  \frac{d}{dt} \Big[ \varphi\_{t}^{\*} \cd\_{X} T \Big]\_{t=0}
  &=
  \frac{d}{dt} \Big[
  \cd\_{\varphi\_{t}^{\*}(X)} \left( \varphi\_{t}^{*} T \right)
  \Big]\_{t=0}
  \,, \\\
  \lie\_{v} \left( \cd\_{X} T \right)
  &= (\cd\_{X} \lie\_{v} T) + \cd\_{(\lie\_{v}X)} T
    \,.
\\end{align}
This can be elucidated by expanding
$$\cd_{X}$$
in abstract index notation (still suppressing indices on $$T$$),
\\begin{align}
  \lie\_{v} \left( X^{a}\cd\_{a} T \right)
  &= X^{a}(\cd\_{a} \lie\_{v} T) + (\lie\_{v}X)^{a} \cd\_{a} T
    \,, \\\
  (\lie\_{v} X)^{a} \cd\_{a} T + X^{a} \lie\_{v} \cd\_{a} T
  &= X^{a}(\cd\_{a} \lie\_{v} T) + (\lie\_{v}X)^{a} \cd_{a} T
    \,.
\\end{align}
Now cancel the
$$\lie_{v}X$$
terms on both sides.  Noting that $$X^{a}$$
is arbitrary, we have derived an identity
\\begin{align}
  \lie\_{v}\cd\_{a} T = \cd\_{a}\lie_{v} T
\\end{align}
when $$\cd$$ is the Levi-Civita connection of $$g$$ and $$v$$ is a
Killing vector field.

## General connection coefficients for $$(\varphi_{t}^{*}\cd)-\cd$$

Let us further study the difference $$(\varphi_{t}^{*}\cd)-\cd,$$ and we
will lift the restriction that $$\varphi_{t}$$ is an isometry of $$g.$$
First, we need some general properties of the difference of these
connections.  Much of this follows Sec. 3.1 of
Wald.[^1]

All connections agree when acting on scalar functions, so we have
<div>
\begin{align}
  \label{eq:diff-agree-scalar}
  (\varphi_{t}^{*}\cd)_{a}f-\cd_{a}f = 0
\end{align}
</div>
for all scalar fields $$f$$.  Next, examine their difference when acting
on the product of a scalar field $$f$$ and a one-form field
$$\omega_{b}$$.  Using the Leibniz rule, we find
<div>
\begin{align}
  \label{eq:diff-on-f-omega}
  (\varphi_{t}^{*}\cd)_{a}(f\omega_{b})-\cd_{a}(f\omega_{b}) =
  f \left[ (\varphi_{t}^{*}\cd)_{a}\omega_{b}-\cd_{a}\omega_{b} \right]
  \,.
\end{align}
</div>
This tells us that the difference in fact only depends on the value of
$$\omega_{b}$$ at each point, and not on the derivative of $$\omega_{b}$$:
consider a point $$p$$ where $$f(p)=1$$ but the gradient of $$f$$ is
arbitrarily large; still at that point,
$$(\varphi_{t}^{*}\cd)_{a}(f\omega_{b})-\cd_{a}(f\omega_{b})$$ agrees
with $$(\varphi_{t}^{*}\cd)_{a}\omega_{b}-\cd_{a}\omega_{b}$$.
There is a more rigorous argument given in [^1], but the
conclusion is the same: $$(\varphi_{t}^{*}\cd)_{a}-\cd_{a}$$ is just a
linear transformation of its argument at each point on the manifold.
Therefore, there is a tensor field $$C(t)^{c}{}_{ab}$$ (the connection
coefficients) such that
<div>
\begin{align}
  \label{eq:diff-def-of-C}
  (\varphi_{t}^{*}\cd)_{a}\omega_{b}-\cd_{a}\omega_{b} =
  C(t)^{c}{}_{ab} \omega_{c}
  \,.
\end{align}
</div>
This is extended by linearity to vectors and tensors in the usual way,
with $$C(t)^{c}{}_{ab}$$ correcting each down index with a plus sign and
each up index with a minus sign.  For example, when acting on the
metric, we have
<div>
\begin{align}
  \label{eq:diff-on-g}
  (\varphi_{t}^{*}\cd)_{a}g_{bc}-\cd_{a}g_{bc} =
  C(t)^{d}{}_{ab} g_{dc} + C(t)^{d}{}_{ac} g_{bd}
  \,.
\end{align}
</div>

The first property of $$C(t)^{c}{}_{ab}$$ we can establish is that it is
symmetric in its lower two indices.  To show this, let the one-form be
the gradient of a scalar, $$\omega_{b}=\cd_{b}f =
(\varphi_{t}^{*}\cd)_{b}f$$.  Then we have
<div>
\begin{align}
  \label{eq:C-is-symm}
  (\varphi_{t}^{*}\cd)_{a}(\varphi_{t}^{*}\cd)_{b} f
  - \cd_{a} \cd_{b} f =
  C(t)^{c}{}_{ab} \cd_{c} f
  \,.
\end{align}
</div>
Since $$\cd_{a}$$ is (by assumption) torsion-free, then so is
$$(\varphi_{t}^{*}\cd)_{a}$$.  Therefore, both terms on the left hand
side of Eq. \eqref{eq:C-is-symm} are symmetric, and so is their
difference.  Thus $$C(t)^{c}{}_{ab} = C(t)^{c}{}_{(ab)}$$ is symmetric
in its lower two indices.

Now to make progress, we will expand $$C(t)$$ as a power series in $$t$$,
<div>
\begin{align}
  \label{eq:C-power-series-first-few}
  C(t)^{c}{}_{ab} &= C^{(0)c}{}_{ab} + t C^{(1)c}{}_{ab} + \ldots \\
  \label{eq:C-power-series}
  C(t)^{c}{}_{ab} &= \sum_{k=0}^{\infty}
                    \frac{t^{k}}{k!}C^{(k)c}{}_{ab} \,, \\
  C^{(k)c}{}_{ab} &\equiv
  \frac{d^{k}}{dt^{k}} C(t)^{c}{}_{ab} \Big|_{t=0} \,.
\end{align}
</div>
Clearly
$$C^{(0)c}{}_{ab} = 0,$$
since $$\varphi_{0}$$
is the identity map, so
$$(\varphi_{0}^{*}\cd)=\cd.$$

Now order-by-order, the connection coefficients' expansion
$$C^{(k)c}{}_{ab}$$ can be computed by taking $$k$$ derivatives of
Eq. \eqref{eq:diff-on-g} (with $$X^{a}$$ contracted into the $$a$$ slot).
We will perform the expansion for $$k=1$$:
<div>
\begin{align}
  \frac{d}{dt} \left[
  (\varphi_{t}^{*}\cd)_{X}g_{bc}
  \right] &=
  \frac{d}{dt} \left[
  X^{a}C(t){}_{cab} +
  X^{a}C(t){}_{bac}
  \right] \\
  \frac{d}{dt} \left[
  \varphi_{t}^{*} \left( \cd_{(\varphi_{-t}^{*}X)} \varphi_{-t}^{*} g_{bc}
  \right) \right] &=
  X^{a} \left( C^{(1)}_{cab} + C^{(1)}_{bac} \right)
  \,.
\end{align}
</div>
There are three terms on the left, one from each of the pullbacks.
These are
<div>
\begin{align}
  \lie_{v}( \cd_{X} g_{bc})
  + \cd_{(\lie_{-v}X)} g_{bc}
  + \cd_{X} \lie_{-v} g_{bc}
  &=
  X^{a} \left( C^{(1)}_{cab} + C^{(1)}_{bac} \right)
  \\
  - X^{a} \cd_{a} \lie_{v} g_{bc}
  &=
  X^{a} \left( C^{(1)}_{cab} + C^{(1)}_{bac} \right)
  \\
  \label{eq:cd-lie-g-is-C-plus-C}
  - \cd_{a} \lie_{v} g_{bc}
  &=
  C^{(1)}_{cab} + C^{(1)}_{bac}
  \,.
\end{align}
</div>
Now we can do the following index gymnastics.  Take
Eq. \eqref{eq:cd-lie-g-is-C-plus-C} with the given index order, on the
left hand side, $$abc$$; add to it the same expression, but with the
indices in the order $$bac$$; and then subtract from it the same
expression but with the indices in the order $$cab$$.  Then using the
symmetry on the last two indices of $$C$$, we can solve for
<div>
\begin{align}
  \label{eq:C1-down-sol}
  C^{(1)}_{cab} = \frac{-1}{2} \Big(
  \cd_{a} \lie_{v} g_{bc} + \cd_{b} \lie_{v} g_{ac}
  - \cd_{c} \lie_{v} g_{ab}
  \Big)
  \,.
\end{align}
</div>

## Expansion of pullback connection

Here we are going to present an explicit formula in terms of Lie
derivatives for the expansion of the pullback connection.  I think
this is not completely rigorous, but it seems satisfactory to me, and
I checked it up to high order in Mathematica.

First, let us re-write the definition of the pullback connection
Eq. \eqref{eq:pullback-connection-defn} as
<div>
\begin{align}
  (\varphi_{t}^{*}\cd)_{X} T &{}\equiv
  \varphi_{t}^{*}
  \left[
  \cd_{d\varphi_{t}(X)} 
  \left(
  \varphi_{t*} T
  \right)
  \right] \\
  &{}=
  \varphi_{t}^{*}
  \left[
  (\varphi_{-t}^{*} X)^{a}
  \cd_{a} 
  \left(
  \varphi_{-t}^{*} T
  \right)
  \right]
  \,.
\end{align}
</div>
Here, if the left hand side is evaluated at point $$p$$, then on the
right hand side, the up/down indices $$a$$ are in the spaces
$$T_{\varphi(p)}\mathcal{M}$$ and $$T_{\varphi(p)}^{*}\mathcal{M}$$.  Now
we are about to do something which a classical differential geometer
might find illegal, but it seems fine to me.  Recall that the
pullback/pushforward commute with tensor product, so
$$\varphi(A\otimes B) = \varphi(A)\otimes\varphi(B)$$.  We apply this to
the right hand side, yielding
<div>
\begin{align}
  (\varphi_{t}^{*}\cd)_{X} T &{}=
  X^{a}
  \varphi_{t}^{*}
  \left[
  \cd_{a} 
  \left(
  \varphi_{-t}^{*} T
  \right)
  \right]
  \,.
\end{align}
</div>
There is no pullback/pushforward acting on $$X^{a}$$ on the RHS because
the pullback and pushforward have inverted each other.  Now this
notation looks quite bad, because the up index on $$X^{a}$$ is in
$$T_{p}\mathcal{M}$$.  Inside the square brackets of the pullback, the
down index on $$\cd_{a}$$ is very much in the space
$$T_{\varphi(p)}^{*}\mathcal{M}$$.  However, this index is then pulled
back to live in $$T_{p}^{*}\mathcal{M}$$, so it may be correctly
contracted with $$X^{a}$$.  I'm not sure if this is just a shortcoming
of the abstract index notation, or if there is a deeper issue to
understand here.

We continue being cavalier physicist and replace $$\varphi_{t}^{*}$$
with $$\exp[t\lie_{v}]$$.  Therefore, we have an expression for the
pullback connection as
<div>
\begin{align}
  \label{eq:pullback-conn-as-exp-cd-exp}
  (\varphi_{t}^{*}\cd)_{a} T = \exp[t\lie_{v}] \cd_{a}\exp[-t\lie_{v}] T
  \,.
\end{align}
</div>
Through a standard formula in the theory of Lie algebras, we can
formally re-express this as
<div>
\begin{align}
  (\varphi_{t}^{*}\cd)_{a} T ={}& (e^{t[\lie_{v},-]} \cd_{a}) T
  = (e^{t \ad_{\lie_{v}} } \cd_{a}) T
  \\
  (\varphi_{t}^{*}\cd)_{a} T
  ={}& \sum_{k=0}^{\infty} \frac{t^{k}}{k!}
  \left((\ad_{\lie_{v}})^{k} \cd_{a}\right)
  T \,,
\end{align}
</div>
where $$[-,-]$$ is the commutator, $$\ad_{\lie_{v}}\cd_{a} =
[\lie_{v},\cd_{a}]$$ is the adjoint action of $$\lie_{v}$$ on $$\cd_{a}$$,
and
<div>
\begin{align}
  \label{eq:ad-k-cd}
  (\ad_{\lie_{v}})^{k} \cd_{c} =
  \underbrace{[\lie_{v},[\lie_{v},\cdots [\lie_{v}}_{
  k\text{ Lie derivative commutators}}
  , \cd_{c} ]]]
  \,.
\end{align}
</div>

Through explicit calculation in the [xTensor](http://www.xact.es/)
package for
Mathematica, I have confirmed that this expression agrees
with the geometric definition up to 12th order in $$t$$ (this
calculation takes only half a second for 6th order, but scales very
badly with order because of two pushforwards and one pullback; and
thus 12th order takes almost 7 minutes on my laptop).

This calculation allows us to find an explicit expression for
$$C^{(k)}_{cab}$$ as defined in Eq. \eqref{eq:C-power-series}.  We
follow the same approach as above, by acting with
$$(\varphi_{t}^{*}\cd)_{a}-\cd_{a}$$ on $$g_{bc}$$.  Now each side is expanded
in a power series and powers of $$t^{k}$$ are equated.  Again we play
the index gymnastics game and take the combination of equations with
indices in the orders $$(abc)+(bac)-(cab)$$.  This allows us to find
<div>
\begin{align}
  \label{eq:C-k-explicit}
  2 C^{(k)}_{cab} =
  \left((\ad_{\lie_{v}})^{k} \cd_{a}\right) g_{bc} +
  \left((\ad_{\lie_{v}})^{k} \cd_{b}\right) g_{ac} -
  \left((\ad_{\lie_{v}})^{k} \cd_{c}\right) g_{ab}
  \,.
\end{align}
</div>

# References

[^1]: [Wald's General Relativity](http://press.uchicago.edu/ucp/books/book/chicago/G/bo5952261.html)
