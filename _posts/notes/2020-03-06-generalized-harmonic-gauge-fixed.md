---
title: "Notes: Generalized harmonic form of Einstein's equations from a gauge-fixed action"
modified:
categories: [notes]
excerpt: "The generalized harmonic formulation can be derived by adding a gauge-fixing term to the Einstein-Hilbert action"
tags: [general relativity]
date: 2020-03-06T00:00:00-06:00
published: true
---

This is another note in the series of "if I don't write it down in an
easy-to-find place, then I'm going to have to keep re-deriving this
result."

The Einstein-Hilbert action for the theory of general relativity is
<div>
\begin{align}
I_{EH} = \frac{1}{16\pi} \int R \sqrt{-g} d^4x
\,.
\end{align}
</div>
This is a beautiful diffeomorphism-invariant integral, so it leads to
the diff-invariant equations of motion (the Einstein field equations)
$$G_{ab} = 8\pi T_{ab}$$ (once you add the matter action).

Because of diff-invariance, the solutions to Einstein's equations are
not unique.  There are an infinite number of coordinate
transformations that you can perform on a solution.  Physicists think
of these as the same (they "mod out gauge") but from the simpler PDEs
point of view, they're different solutions.  So, to pose GR as an
initial value problem, you need to fix a gauge.

One pretty gauge choice is the "generalized harmonic" gauge,
<div>
\begin{align}
\label{eq:ghcond}
\newcommand{\cd}{\nabla}
\cd_b\cd^b x^{(a)} = g^{ab}H_b(x, g)
\,.
\end{align}
</div>
Here the four functions $$H_b$$ can depend on the coordinate
functions $$x^{(a)}$$ and metric, but not derivatives of the
metric.  This gauge choice is a generalization of the one that [Yvonne
Choquet-Bruhat](https://en.wikipedia.org/wiki/Yvonne_Choquet-Bruhat)
used to prove well-posedness of the Einstein field equations.  The
generalization was introduced by Friedrich[^1] and used to first
successfully evolve a binary black hole merger by Pretorius.[^2]  This
is also the choice we make in
[SpEC](https://www.black-holes.org/code/SpEC.html), see Lindblom et al.[^3]

The reason this gauge choice is nice is that when you write
out the Einstein equations in this gauge, the [principal
part](https://en.wikipedia.org/wiki/Symbol_of_a_differential_operator)
is manifestly that of the scalar wave operator on the manifold, plus
lower order terms.  That is, the Einstein equations become
<div>
\begin{align}
\newcommand{\pd}{\partial}
0 = g^{cd}\pd_c\pd_d g_{ab} + 2\cd_{(a}H_{b)} + \text{L.O.T.s} +
16\pi(T_{ab} - \frac{1}{2}g_{ab} T^c{}_c)
\,,
\end{align}
</div>
where L.O.T.s stands for lower order terms (that do not affect the
manifest hyperbolicity of the equations).  Aside: here you can
see why $$H_b$$ is allowed to depend on $$g$$ but not on $$\pd g$$ --
the latter would affect the principal part.

Now, usually these gauge conditions are imposed at the level of the
equations of motion to show hyperbolicity.  However sometimes we want
to see the gauge getting fixed in the action.  This is important for
e.g. diagrammatic methods like using Feynman diagrams (inverting to
find a unique propagator is the momentum-space cousin to showing
well-posedness of the PDEs).
For examples see [^4] and [^5].

So, let's try to add a gauge-fixing term to the action to get the
generalized harmonic formulation of GR.  The easiest guess is
something like a Feynman-’t Hooft gauge fixing term,
<div>
\begin{align}
I_{g.f.} = \frac{1}{16\pi} \int
\xi
(\Gamma_{acd} g^{cd} + H_a)g^{ab}(\Gamma_{bcd}g^{cd} + H_b)
\sqrt{-g} d^4x
\,.
\end{align}
</div>
This tries to impose the GH condition \eqref{eq:ghcond} because
$$\square x^{(a)} = - \Gamma^a = -\Gamma^a{}_{cd}g^{cd}$$.  Note that
this type of gauge-fixing term has long been known (for the special
case of $$H=0$$) to post-Newtonian practitioners.[^4] Now if we
vary[^6] $$I_{EH}+I_{g.f.}$$, we get the principal part
<div>
\begin{align}
& g^{cd} \pd_{c}\pd_{d}g_{ab}
+ (1 + 2 \xi) g^{cd} \pd_{a}\pd_{b}g_{cd}\nonumber\\
&{}-  (1 + 2 \xi) g^{cd} \pd_{a}\pd_{d}g_{bc}
-  (1 + 2 \xi) g^{cd} \pd_{b}\pd_{d}g_{ac}
\,.
\end{align}
</div>
By making the choice $$\xi=-\frac{1}{2}$$, we get the principal part
to agree with the scalar wave operator.

It is only a little bit of work to show that the equations you get by
variation of $$I_{EH}+I_{g.f.}$$, with the choice
$$\xi=-\frac{1}{2}$$, is "on-shell" equivalent to Eq. (7) of Ref.[^3]
(that is, you have to do some "on-shell" replacements of $$H_a$$ with
$$\Gamma_a$$ to get the exact same equation, but only in
lower-order-terms).

The punchline is that the generalized harmonic formulation of
Einstein's equations comes from adding the above gauge-fixing term
(with $$\xi=-\frac{1}{2}$$) to the Einstein-Hilbert action.

# References

[^1]: Friedrich, H. On the hyperbolicity of Einstein’s and other
    gauge field equations, [Commun. Math. Phys. **100**, 525-543
    (1985)](https://doi.org/10.1007/BF01217728).

[^2]: Pretorius, F. Evolution of Binary Black-Hole Spacetimes,
    [Phys. Rev. Lett. **95**, 121101
    (2005)](https://doi.org/10.1103/PhysRevLett.95.121101).

[^3]: Lindblom, Scheel, Kidder, Owen, and Rinne. A new generalized
    harmonic evolution system, [Class. Quantum Grav. **23** S447
    (2006)](https://doi.org/10.1088/0264-9381/23/16/S09).

[^4]: Appendix C of Damour & Schäfer, Lagrangians for *n* point masses
    at the second post-Newtonian approximation of general relativity,
    [Gen. Rel. Grav. **17**, 879-905
    (1985)](https://link.springer.com/article/10.1007%2FBF00773685).

[^5]: Goldberger and Rothstein, Effective field theory of gravity for
    extended objects, [Phys. Rev. D **73**, 104029
    (2006)](https://doi.org/10.1103/PhysRevD.73.104029).

[^6]: Maybe the variation is subtle... I treated $$H_a$$ as fixed when
    varying the metric.
