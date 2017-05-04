---
title: "Note on exterior, interior, and Lie derivative superalgebra"
modified:
categories: [notes]
excerpt: "These three objects form a superalgebra! Whoa!"
tags: [geometry, algebra, superalgebra]
date: 2017-05-03T19:18:00-07:00
modified:
---

<script type="math/tex">
\newcommand{\cd}{\nabla}
\newcommand{\pd}{\partial}
\newcommand{\Lie}{\mathcal{L}}
</script>
This is just a short note to help me remember some very important
identities in exterior differential geometry.  For a pleasant
introduction to the topic, I recommend Schutz[^1].  I learned the
superalgebra interpretation from the beginning of Guillemin and
Sternberg[^2].

In exterior differential geometry, there are a few basic operations we
use all the time.  Let's start with a form $$\alpha$$ of degree
$$a$$, and $$\beta$$ of degree $$b$$.  Then we know we can *wedge* the
two together to get a form of degree $$a+b$$,
<div>
\begin{align}
\omega \equiv \alpha \wedge \beta = (-1)^{ab} \beta \wedge \alpha \,.
\end{align}
</div>
Already we can say that the space of forms is [graded and anticommutative](https://en.wikipedia.org/wiki/Graded_ring#Anticommutativity).
When we move a form past another, we pick up this factor of $$(-1)^{ab}$$.
One natural thing we know how to do with forms is to take their
[exterior derivatives](https://en.wikipedia.org/wiki/Exterior_derivative),
<div>
\begin{align}
d\omega = (d\alpha)\wedge \beta + (-1)^{a} \alpha \wedge (d\beta)
\,.
\end{align}
</div>
The exterior derivative operator increases the degree of a form by 1.
From the commutation of partial derivatives, we know that $$d^2=0$$.
We see that $$d$$ satisfies some version of the Leibniz rule, as a
derivative must, but there is a factor of $$(-1)^{a}$$, as if we have
moved a degree 1 form past $$\alpha$$.  The operator $$d$$
is acting very much like it wants to be considered as a degree 1
object.

For our other basic operations we'll need to introduce some vector
fields, $$v, w$$.  The most obvious things to do with vectors are to
pair them with their duals---covectors, i.e. one-forms.  Because too
many people have invented their own notations, we have all the
possibile notations
<div>
\begin{align}
  \langle \alpha, v \rangle = \alpha(v) = v \lrcorner \alpha = i_v \alpha
\end{align}
</div>
for a one-form $$\alpha$$.  Actually we will generalize and allow
$$i_v$$ to mean "insert vector $$v$$ into the first slot of the
following degree $$a$$ form", i.e.
<div>
\begin{align}
(i_v \alpha)(\underbrace{-, \ldots, -}_{a-1~\mathrm{ slots}}) =
\alpha(\underbrace{v, -, \ldots, -}_{a~\mathrm{slots}})
\,.
\end{align}
</div>
Since forms are alternating in all of their slots, we automatically
get the identity
<div>
\begin{align}
i_v i_w = -i_w i_v \,,
\end{align}
</div>
so this
"[interior multiplication](https://en.wikipedia.org/wiki/Interior_product)"
operation satisfies anticommutativity.  When we extend to wedge
products, we again get something that looks like a Leibniz rule,
<div>
\begin{align}
i_v (\alpha \wedge \beta) = (i_v \alpha) \wedge \beta
+ (-1)^a \alpha \wedge (i_v \beta)
\,.
\end{align}
</div>
This is quite interesting, because we again get a factor of $$(-1)^a$$
that looks like we have moved an odd degree form past $$\alpha$$.
Since $$i_v$$ lowers the degree of a form, it's consistent to think of
it as having "degree --1".

The final type of operation we care about here is
the [Lie derivative](https://en.wikipedia.org/wiki/Lie_derivative).
Almost anything can be Lie differentiated along a vector field $$v$$.
I will just skip ahead and remind us that
<div>
\begin{align}
\Lie_v \omega = (\Lie_v \alpha) \wedge \beta + \alpha \wedge (\Lie_v \beta)
\,,
\end{align}
</div>
Again, a Leibniz rule, as it must be, this time without any factors of
--1.  This should make you think that $$\Lie_v$$ is acting like an
object of degree 0, which is consistent with the fact that it does not
change the degree of forms that it acts on.

But there are other ways to take one derivative of a form $$\omega$$
and get back a form of the same degree, using a vector $$v$$.
Specifically, we can first raise the degree with $$d$$ and then lower
it with $$i_v$$, or vice versa.  So you might expect that $$\Lie_v$$
is somehow related to these two other possibilities.  In fact, that is
the content of "Cartan's magic formula",
<div>
\begin{align}
\label{eq:Cartan}
\Lie_v \omega = di_v \omega + i_v d\omega
\,.
\end{align}
</div>
You can prove this inductively if you wish.

Eq. \eqref{eq:Cartan} is very suggestive in two ways.  First, if
you're counting the "degrees" of $$d, \Lie_v, i_v$$ as $$+1, 0, -1$$,
then you'll notice that this formula works out correctly.  Second, on
the right hand side we have the *sum* of two "derivative" operations,
but they are yielding one derivative operation on the left.  Usually
this would happen if we had considered a difference, or commutator of
two derivative operators.  So maybe we have to consider a different
type of commutator?

Let's look at all the identities we have amongst the operators (where
$$[v,w]$$ means the Lie bracket of vector fields):

|---
| :-: | :-: | :-: | :-:
|  | $$d$$ | $$\Lie$$ | $$i$$
|---
| $$d$$ | $$d^2 = 0$$ | $$d\Lie_v - \Lie_v d = 0$$ | $$di_v + i_vd = \Lie_v$$ | 
| $$\Lie$$ | -- | $$\Lie_v \Lie_w - \Lie_w \Lie_v = \Lie_{[v,w]}$$ | $$\Lie_v i_w - i_w \Lie_v = i_{[v,w]}$$
| $$i$$    | -- | -- | $$i_v i_w + i_w i_v = 0$$

You'll notice that minus signs only appear in the row and column
labeled by $$\Lie.$$  That means that we can define for ourselves a
[supercommutator](https://en.wikipedia.org/wiki/Lie_superalgebra),
<div>
\begin{align}
[x,y] \equiv xy - (-1)^{|x|\, |y|} yx
\,,
\end{align}
</div>
where $$|x|$$ is the degree of $$x$$.  Now we can honestly claim that
$$d, \Lie_v, i_v$$ have degrees $$+1, 0, -1$$, because we have a
superalgebra!  Rewriting our table in this language is quite beautiful:


|---
| :-: | :-: | :-: | :-:
|  | $$d$$ | $$\Lie$$ | $$i$$
|---
| $$d$$ | $$[d,d] = 0$$ | $$[d,\Lie_v]= 0$$ | $$[d,i_v] = \Lie_v$$ | 
| $$\Lie$$ | -- | $$[\Lie_v, \Lie_w] = \Lie_{[v,w]}$$ | $$[\Lie_v, i_w] = i_{[v,w]}$$
| $$i$$    | -- | -- | $$[i_v, i_w] = 0$$

Notice that the result on the right hand side of each of these
(super)commutators is almost uniquely determined just by being
consistent about degrees.

# References

[^1]: Schutz, [Geometrical Methods of Mathematical Physics](https://books.google.com/books?id=HAPMB2e643kC)
[^2]: Guillemin and Sternberg, [Supersymmetry and Equivariant de Rham Theory](https://books.google.com/books?id=LWXyCAAAQBAJ)
