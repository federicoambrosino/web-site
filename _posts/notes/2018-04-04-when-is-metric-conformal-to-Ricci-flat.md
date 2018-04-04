---
title: "(Notes) When is a metric conformal to *Ricci-flat*?"
modified:
categories: [notes]
excerpt: "Integrability conditions when trying to solve for a conformal factor"
tags: [conformal, geometry, integrability]
date: 2018-04-04T16:53:00-07:00
modified:
published: true
---

This question arose when I was discussing with [Kaća
Bradonjić](http://kacabradonjic.com/), who has done work on gravity
theories where conformal geometry plays a different role than in
general relativity.

<script type="math/tex">
\newcommand{\cd}{\nabla}
</script>
Just to be precise, here's the question again.
Let's say we have an *n*-dimensional manifold *M*, and somebody
hands you the metric $$g_{ab}$$.  In all generality, the Riemann
curvature of $$\cd$$ (the Levi-Civita connection of *g*) can have
nonzero Ricci curvature and nonzero Weyl part (details below).  Given
this metric, can there exist a conformal factor $$\Omega(x)>0$$ such
that the conformally transformed metric, $$\tilde{g}_{ab} = \Omega^2
g_{ab}$$, has zero Ricci curvature for its connection $$\tilde{\cd}$$?

First let's recall the
Ricci/Weyl decomposition of the Riemann tensor,
<div>
\begin{align}
\label{eq:R-decomp-proj}
R_{abcd} = S_{r[abcd]} \left[
C_{abcd}
+ \frac{4}{n-2} R_{ac}g_{bd}
- \frac{2}{(n-1)(n-2)} R g_{ac}g_{bd}
\right] \,,
\end{align}
</div>
where the symbol $$S_{r[abcd]}$$ was one I used in [this post]({{
site.url }}{% post_url
/notes/2017-01-09-notes-on-the-E-B-and-3+1-decomp-of-Riem %}) to mean
"project onto the algebraic symmetries of the Riemann tensor" by
antisymmetrizing on *ab*, antisymmetrizing on *cd*, then symmetrizing
on the two pairs.  In [Young
tableau](https://en.wikipedia.org/wiki/Young_tableau) language, that
means projecting with the Young symmetrizer that looks like
![]({{site.url}}/images/youngabcd.png){: .align-center style="height: 3em"}

Next we have to crack open a textbook and look up how tensors that
depend on $$\tilde{g}_{ab}$$ are determined by their counterparts from
$$g_{ab}$$ and various derivatives of $$\Omega$$.  You can find these
in e.g. Appendix D of Wald.[^1]  The easy ones are
<div>
\begin{align}
\tilde{g}^{ab} &= \Omega^{-2} g^{ab} \nonumber\\
\label{eq:confC}
\tilde{C}_{abc}{}^d &= C_{abc}{}^d \,,
\end{align}
</div>
From Eq. \eqref{eq:confC} we immediately see that you can never get
rid of Weyl curvature by conformal transformations (why the Weyl
tensor is sometimes called the conformal tensor).  Hence the most you can
hope for is to be able to get rid of Ricci curvature through a
conformal transformation.

The relationship between the Ricci tensors $$\tilde{R}_{ab}$$ and
$$R_{ab}$$ is nastier.  It's slightly nicer to focus on a
"trace-adjusted" version of Ricci called the [Schouten
tensor](https://en.wikipedia.org/wiki/Schouten_tensor), which in
components is
<div>
\begin{align}
\label{eq:schout}
P_{ab} = \frac{1}{n-2} \left( R_{ab} - \frac{1}{2(n-1)} g_{ab} R
\right) \,.
\end{align}
</div>
This happens to make the Ricci/Weyl decomposition
\eqref{eq:R-decomp-proj} slightly simpler,
<div>
\begin{align}
\label{eq:R-decomp-proj-schout}
R_{abcd} = S_{r[abcd]} \left[
C_{abcd}
+ 4 P_{ac}g_{bd}
\right] \,.
\end{align}
</div>
It *also* has a somewhat straightforward relationship under conformal
transformations,
<div>
\begin{align}
\label{eq:schoutenConf}
\tilde{P}_{ab} = P_{ab} &- \cd_b \cd_a \ln \Omega +
(\cd_a \ln\Omega)(\cd_b \ln \Omega) \nonumber \\
&- \frac{1}{2} g_{ab} g^{cd}(\cd_c \ln\Omega)(\cd_d \ln \Omega)
\,.
\end{align}
</div>

Notice that the trace of Schouten is determined by the trace of Ricci,
$$P = R/(2(n-1))$$, so the vanishing of the Schouten tensor is
equivalent to the vanishing of the Ricci tensor.  Thus we can restate
the original question to ask: when does there exist an $$\Omega$$ such
that $$\tilde{P}_{ab}=0$$?  And this immediately becomes a question of
"integrability" of the system of equations
<div>
\begin{align}
0 = P_{ab} &- \cd_b \cd_a \ln \Omega +
(\cd_a \ln\Omega)(\cd_b \ln \Omega) \nonumber \\
&- \frac{1}{2} g_{ab} g^{cd}(\cd_c \ln\Omega)(\cd_d \ln \Omega)
\,,
\label{eq:integ0}
\end{align}
</div>
which are *n(n-1)/2* partial differential equations for the single
scalar field $$\Omega$$.  For a gentle introduction to the theory of
integrability from a geometric viewpoint, I recommend the sections on
[Frobenius'
theorem](https://en.wikipedia.org/wiki/Frobenius_theorem_(differential_topology))
from Schutz's little geometry book.[^2]

To start with, we recast the second-order system \eqref{eq:integ0} in
first order form by adjoining an auxiliary one-form
<div>
\begin{align}
\label{eq:omega}
\omega_a \equiv \cd_a \ln \Omega
\end{align}
</div>
which must satisfy the integrability condition
<div>
\begin{align}
\label{eq:integomega}
\cd_{[a}\omega_{b]} = 0 \,,
\end{align}
</div>
by the commutativity of (torsion-free) covariant derivatives on a
scalar field (i.e. the one-form $$\omega$$ is closed).  In terms of
this new one-form, Eq. \eqref{eq:integ0} becomes the first-order
system of PDEs
<div>
\begin{align}
\label{eq:integomega1}
\cd_b \omega_a = P_{ab} & +
\omega_a \omega_b - \frac{1}{2} g_{ab} g^{cd}\omega_c \omega_b
\,.
\end{align}
</div>
If we can solve \eqref{eq:integomega1} for $$\omega_a$$ which
satisfies \eqref{eq:integomega}, then it can immediately be integrated
up into a solution for $$\ln\Omega$$.

Now to find the integrability of this first-order system, let's take a
further derivative $$\cd_c$$ of Eq. \eqref{eq:integomega1} and
antisymmetrize over *[cb]* index pair.  On the left-hand side, this
gives a commutator of covariant derivatives, which means we can
convert it into a curvature tensor.  The price is that on the
right-hand, we will be taking derivatives of the $$\omega$$'s.  But if
solutions exist, then we can just reuse \eqref{eq:integomega1} to
replace $$\cd\omega$$ with *P* and squares of $$\omega$$ without
derivatives.  I encourage you to do these manipulations with
[xAct/xTensor](http://www.xact.es/), of course.

The resulting integrability condition is
<div>
\begin{align}
\label{eq:intCondWeyl}
\boxed{C_{abc}{}^d\omega_d = 2\cd_{[a}P_{b]c}} \,.
\end{align}
</div>
As an easy consequence, if the Weyl tensor vanishes, then $$g_{ab}$$
is conformal to Ricci-flat (and indeed conformal to flat) if and only
if $$\cd_{[a}P_{b]c} = 0$$.  This result was already known to Schouten
back in 1920,[^3] but I'm interested in the more general case when
the Weyl tensor is non-vanishing.

So, we have succeeded in turning integrability of \eqref{eq:integ0}
into an algebraic property.  In words, this condition is: Treat the
Weyl tensor as a linear map from $$T^*M$$ to $$T^*M^{\otimes 3}$$;
then a necessary (but not yet sufficient) condition for
\eqref{eq:integ0} to be integrable is that $$\cd_{[a}P_{b]c}$$ must be
in the image of this linear map.

At this point I would be remiss in my duties if I neglected to tell
you that $$\cd_{[a}P_{b]c}$$ has a perhaps more familiar expression.
Start from the Bianchi identity $$\cd_{[a}R_{bc]de}=0$$ and decompose
Riemann into the Weyl and Schouten tensors.  After performing a
contraction, we find the identity
<div>
\begin{align}
\label{eq:divWeyl}
\cd_d C_{abc}{}^d = (3-n)2\cd_{[a}P_{b]c} \,.
\end{align}
</div>

So we can see that $$\cd_{[a}P_{b]c}$$ lives in the representation
labeled by the Young diagram
![]({{site.url}}/images/youngabc.png){: .align-center style="height: 3em"}
In fact you could have seen this from the index symmetries without
knowing identity \eqref{eq:divWeyl}.

Thus it is at least algebraically possible for $$\cd_{[a}P_{b]c}$$ to
live in the image of $$C: T^*M \to T^*M^{\otimes 3}$$.  If it
actually does (which is yet another question) then there is a space of
potential solutions $$\omega_d$$ (unique up to elements of the kernel
of Weyl).  We then need there to be a solution in this space which
satisfies the integrability condition $$\cd_{[a}\omega_{b]}=0$$.  If
all of these conditions are satisfied, then the closed (and exact)
one-form $$\omega$$ exists, $$\Omega$$ may be integrated up, and
finally $$\tilde{g}_{ab}$$ can be found, which is Ricci-flat.

# References

[^1]: [Wald's General Relativity](http://press.uchicago.edu/ucp/books/book/chicago/G/bo5952261.html)
[^2]: [Schutz's Geometrical methods of mathematical physics](http://www.cambridge.org/us/academic/subjects/mathematics/mathematical-physics/geometrical-methods-mathematical-physics)
[^3]: J A Schouten, *Über die konforme Abbildung n-dimensionaler
    Mannigfaltigkeiten mit quadratischer Maßbestimmung auf eine
    Mannigfaltigkeit mit euklidischer Maßbestimmung*, [Math Z (1921)
    11: 58](https://doi.org/10.1007/BF01203193).  Thanks to Uli
    Sperhake for helping me try to understand some of the German in
    this old paper!
