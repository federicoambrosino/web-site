---
title: "Note on simple(r) equations for Einstein-dilaton-Gauss-Bonnet and dynamical Chern-Simons theories"
modified:
categories: [notes]
excerpt: "Here to save you some algebra and column-inches"
tags: [geometry, algebra, Gauss-Bonnet, Chern-Simons, beyond-GR, code, xTensor]
date: 2017-08-06T22:43:00-07:00
modified:
---

Special thanks to Helvi Witek, who originally showed me one simplified
form of the "C-tensor" in Einstein-dilaton-Gauss-Bonnet (EDGB).
<script type="math/tex">
\newcommand{\cd}{\nabla}
\newcommand{\dR}{ {}^{*}\!R}
\newcommand{\ddR}{ {}^{*}\!R^{*}{} }
</script>

---

If you've ever looked into theories beyond general relativity, you're
already aware that their field equations can be very complicated.  For
example, here's a clip from [one paper on EDGB](https://arxiv.org/abs/1511.05513):

![Scary equations for EDGB]({{ site.url }}/images/EDGB-scary.png ) 

Ack!  That's pretty unwieldy.  But don't despair, it turns out that
the above mess can be written much more compactly.  This equivalence
can be easily verified using the [xAct/xTensor suite](http://www.xact.es/).
You can download my notebook named
`EDGB-and-DCS-EOMs-and-C-tensors-simplified.nb` from the
[xAct examples collection](https://github.com/xAct-contrib/examples).

Just to set conventions, let's work with the action
<div>
\begin{align}
\label{eq:action1}
S = \int d^4x \sqrt{-g} \left[
\frac{1}{2}m_{pl}^2 R
- \frac{1}{2} (\cd^a \vartheta) (\cd_a \vartheta)
\right]
+ S_{int}
\end{align}
</div>
where $$\vartheta$$ is a scalar (dilaton or axion) and $$S_{int}$$ is
a non-minimal interaction term between the scalar and curvature.

## Einstein-dilaton-Gauss-Bonnet

For EDGB, let's take
<div>
\begin{align}
\label{eq:SEDGB}
S_{int}^{EDGB} = -\frac{1}{8} m_{pl} \ell^2
\int d^4x \sqrt{-g}
F(\vartheta)
\left[
R^2 - 4 R_{ab}R^{ab} + R_{abcd}R^{abcd}
\right]
\end{align}
</div>
with some arbitrary coupling function F, and some dimensional
parameter $$\ell$$.  Now this above curvature combination might seem
arbitrary, but it's actually the 4-dimensional Euler density (see
e.g. [Bob McNees's notes](http://jacobi.luc.edu/Useful.html#EulerDensities)).
It's more natural to write that as
<div>
\begin{align}
\label{eq:euler4}
\ddR_{abcd}R^{abdc} = R^2 - 4 R_{ab}R^{ab} + R_{abcd}R^{abcd}.
\end{align}
</div>
Here we've defined the *double-dual* $$\ddR$$ of the Riemann tensor.
First, we dualize on the left two antisymmetric indices to define the
left-dual,
<div>
\begin{align}
\label{eq:leftdual}
\dR^{abcd} \equiv \frac{1}{2} \epsilon^{abef} R_{ef}{}^{cd},
\end{align}
</div>
and then we further dualize on the right two antisymmetric indices to
get the double-dual,
<div>
\begin{align}
\label{eq:doubledual}
\ddR^{abcd} \equiv \dR^{ab}{}_{gh} \frac{1}{2} \epsilon^{ghcd}
= \frac{1}{2} \epsilon^{abef} R_{efgh} \frac{1}{2} \epsilon^{ghcd}.
\end{align}
</div>

Now, it's an exercise in algebraic manipulation to show that the
equation for the metric from the action defined in
Eqs. \eqref{eq:action1}, \eqref{eq:SEDGB} is given simply by
<div>
\begin{align}
\label{eq:eom-EDGB}
\boxed{
m_{pl}^2 G_{ab} - m_{pl} \ell^2 \cd^c \cd^d
\left[
\ddR_{cabd} F(\vartheta)
\right] = T_{ab}
}
\end{align}
</div>
where $$T_{ab}$$ is the stress-energy tensor for matter plus the
canonical stress-energy tensor for the scalar field.  That's quite a
bit simpler than the image above, isn't it!  If you want to get
xTensor to verify this for you, grab
`EDGB-and-DCS-EOMs-and-C-tensors-simplified.nb` from the
[xAct examples collection](https://github.com/xAct-contrib/examples).

I wrote the above in a certain way to make it look very similar to the
case of dynamical Chern-Simons (DCS, below), but before moving on---recall
that one reason people like EDGB is that the equations of motion are
only second order in the metric.  That's not obvious from the way I
wrote it, because it looks like you might get third and fourth
derivatives of the metric.  However, one nice property of the
double-dual of Riemann is that it's divergence free (see MTW
Eq. (13.51) and exercise 13.11).  This means we can rewrite
<div>
\begin{align}
\label{eq:C-tensor-EDGB-idents}
\cd^c \cd^d
\left[
\ddR_{cabd} F(\vartheta)
\right]
=
\cd^c
\left[
\ddR_{cabd} \cd^d F(\vartheta)
\right]
=
\ddR_{cabd} \cd^c \cd^d F(\vartheta).
\end{align}
</div>
Now it's obvious that there are only second derivatives of the metric.
However, the first or second forms might give more insight, because
from them you can see that this so-called "C-tensor" is itself the
divergence of some tensor.  That's the kind of thing you might want to
integrate over a region...

## Dynamical Chern-Simons

Anyway, on to DCS. Now we use the interaction term
<div>
\begin{align}
\label{eq:SDCS}
S_{int}^{DCS} = -\frac{1}{8} m_{pl} \ell^2
\int d^4x \sqrt{-g}
F(\vartheta)
\dR^{abcd} R_{abcd}
\end{align}
</div>
with just a single dual.  Again it looks kind of arbitrary, but
when $$\dR^{abcd} R_{abcd}$$ is integrated over the whole manifold,
you get a topological invariant.

The equation for the metric in DCS is also kind of scary looking, but
again some algebra shows that you can write it as
<div>
\begin{align}
\label{eq:eom-DCS}
\boxed{
m_{pl}^2 G_{ab} - m_{pl} \ell^2 \cd^c \cd^d
\left[ \dR_{c(ab)d} F(\vartheta)
\right] = T_{ab}
}
\end{align}
</div>
where $$(ab)$$ means that we are symmetrizing (with a factor of 1/2)
on those two indices.  This looks very similar to the expression for
EDGB!  However, the single-dual of Riemann is not divergence-free, so
this equation does have third derivatives of the metric.  The
double-divergence, though, does vanish, so there are no fourth
derivatives.

All of the above calculations are in my notebook
`EDGB-and-DCS-EOMs-and-C-tensors-simplified.nb` in the
[xAct examples collection](https://github.com/xAct-contrib/examples).
Hope you learned something!
