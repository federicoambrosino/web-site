---
title: "Note on a (dimension-dependent) Weyl identity"
modified:
categories: [notes]
excerpt:
tags: [geometry, algebra, xTensor]
date: 2017-02-08T16:00:00-08:00
modified:
---

There is a nice 4-dimensional Weyl identity that I can never seem to
remember off the top of my head; so I decided I need to write this
note so I don't have to remember it in the future.  The identity is:
<div>
\begin{align}
\label{eq:theIdentity}
C_{a}{}^{cde}C_{bcde} = \frac{1}{4}g_{ab} C^{cdef}C_{cdef} \,.
\end{align}
</div>
This identity comes in handy for simplifying the equations of motion
of Einstein-dilaton-Gauss-Bonnet gravity.

So, how do we work out this identity so we don't have to remember it?
I gave a hint when I said this is a dimension-dependent identity: it's
specific to dimension 4.  Most[^1] dimension-dependent
identities come from antisymmetrizing some expression over more than
$$d$$ indices, where $$d$$ is the dimension. Because there are only
$$d$$ coordinates, antisymmetrizing over more than $$d$$ slots will
automatically vanish (i.e. more than $$d$$ vectors must be
linearly-dependent in a $$d$$-dimensional vector space).

This particular identity comes from antisymmetrizing over $$[abcdf]$$
in the expression:
<div>
\begin{align}
\label{eq:antisymmetrize}
0 = C^{ab}{}_{[ab}C^{cd}{}_{cd}\delta^e{}_{f]} \,.
\end{align}
</div>
Obviously this will produce $$5!=120$$ terms in a sum, but the vast
majority of them vanish because Weyl is tracefree on every pair of
indices.

In fact, up to index order, there are only 5 combinations that are not
obviously vanishing.  The first Weyl tensor vanishes unless the lower
indices are two of $$\{c,d,f\}$$; similarly, the second Weyl tensor
vanishes unless the lower indices are two of $$\{a,b,f\}$$.  This
allows us to enumerate all of the possibilities in short order.  After
applying the antisymmetry of Weyl on the latter two indices, there
are exactly 5 index permutations of $$\{abcdf\}$$ that are allowed,
and they are (lexicographically):
<div>
\begin{align*}
C^{ab}{}_{cd}C^{cd}{}_{ab}\delta^e{}_{f} \,,
C^{ab}{}_{cd}C^{cd}{}_{af}\delta^e{}_{b} \,,
C^{ab}{}_{cd}C^{cd}{}_{bf}\delta^e{}_{a} \,,\\
C^{ab}{}_{cf}C^{cd}{}_{ab}\delta^e{}_{d} \,,
C^{ab}{}_{df}C^{cd}{}_{ab}\delta^e{}_{c} \,.
\end{align*}
</div>
All that remains to do is to contract the $$\delta$$ indices and
figure out the signature of each permutation to get the sign
correct. Doing so gives the identity \eqref{eq:theIdentity} (with an
index raised and indices renamed).

Of course, all of this is much easier with
the [xAct/xTensor package](http://www.xact.es/).  I highly recommend
this to find e.g. the Riemann form of the above identity.  It comes
from the same expression as \eqref{eq:antisymmetrize} but replacing
$$C$$ with $$R$$, and now there are many more combinations that do not
vanish, but instead produce Ricci terms.  Explicitly, we get the
unwieldy
<div>
\begin{align}
R_{ebcd} R_{f}{}^{bcd} = 
\frac{1}{4} g_{ef} R_{abcd}R^{abcd}
- g_{ef} R_{ab}R^{ab}
+ 2 R^{bc} R_{ebfc}
+ 2 R_{eb} R_f{}^b
+ \frac{1}{4} g_{ef} R^2 
- R R_{ef} \,.
\end{align}
</div>

While I was hunting for my lost identity, I came across a nice
paper[^2] on the more general topic of dimension-dependent
identities.  This included, for example, the fact that the
[Cayley-Hamilton theorem](https://en.wikipedia.org/wiki/Cayley%E2%80%93Hamilton_theorem)
can be derived from a dimension-dependent identity. Specifically,
consider an $$n$$-dimensional vector space $$V$$ and the matrix
$$T^a{}_b$$ with indices in $$V$$ and $$V^*$$.  Then the
Cayley-Hamilton theorem for $$T$$ can be written as
<div>
\begin{align}
T^{i_1}{}_{[i_1}
T^{i_2}{}_{i_2} \cdots T^{i_n}{}_{i_n}
\delta^{a}{}_{b]} = 0 \,,
\end{align}
</div>
where there are $$n$$ copies of $$T$$, and an antisymmetrization over
$$n+1$$ indices.

This doesn't obviously look like the Cayley-Hamilton theorem, but: it
is a linear combination of various matrix powers of $$(T^k)^a{}_b$$,
with coefficients determined by various traces of other powers of
$$T$$ in a very specific way (they turn out to be
[elementary symmetric polynomials](https://en.wikipedia.org/wiki/Elementary_symmetric_polynomials)
of the eigenvalues of $$T$$).

An example makes this a bit easier to see. Let's expand this for
$$n=4$$ dimensions. Again, I recommend using xTensor. For shorthand,
let me write the matrix power
<div>
\begin{align}
(T^k)^a{}_b \equiv T^a{}_{i_1} T^{i_1}{}_{i_2} \cdots T^{i_{k-1}}{}_b
\end{align}
</div>
and denote the trace with $$[T] \equiv T^a{}_a$$. Then the
four-dimensional Cayley-Hamilton theorem says
<div>
\begin{align}
0 ={}& 5 T^{i_1}{}_{[i_1}
T^{i_2}{}_{i_2} T^{i_3}{}_{i_3} T^{i_4}{}_{i_4} 
\delta^{a}{}_{b]} \\
0={}&  (T^4)^a{}_b
- (T^3)^a{}_b [T]
+ (T^2)^a{}_b \tfrac{1}{2} ([T]^2 - [T^2]) \\
&{}+ T^a{}_b \tfrac{1}{6} (-[T]^3 + 3 [T] [T^2] - 2 [T^3]) \nonumber\\
&{}+ \delta^a{}_b \tfrac{1}{24} ([T]^4 - 6 [T]^2 [T^2] + 3 [T^2]^2
  + 8 [T] [T^3] - 6 [T^4]) \,. \nonumber
\end{align}
</div>
What are all those strange combinations of traces? Well, use the
identity that $$[T^k] = \sum_{i=1}^n \lambda_i^k$$ (easiest proved for
diagonalizable matrices by going into the diagonal basis) where
$$\lambda_i$$ is the i'th eigenvalue.  Then you will readily verify
that these are in fact the elementary symmetric polynomials of the
eigenvalues of $$T$$, explicitly:
<div>
\begin{align*}
\tfrac{1}{24} ([T]^4 - 6 [T]^2 [T^2] + 3 [T^2]^2 + 8 [T] [T^3] - 6
[T^4]) &= \lambda_1 \lambda_2 \lambda_3 \lambda_4 \\
 \tfrac{1}{6} ([T]^3 - 3 [T] [T^2] + 2 [T^3])&= \lambda_1 \lambda_2
 \lambda_3 + \lambda_1 \lambda_2 \lambda_4 + \lambda_1 \lambda_3
 \lambda_4 + \lambda_2 \lambda_3 \lambda_4 \\
 \tfrac{1}{2} ([T]^2 - [T^2]) &= \lambda_1 \lambda_2 + \lambda_1 \lambda_3 +
 \lambda_1 \lambda_4 + \lambda_2 \lambda_3 + \lambda_2 \lambda_4 +
 \lambda_3 \lambda_4 \\
 [T] &= \lambda_1 + \lambda_2 + \lambda_3 + \lambda_4
\end{align*}
</div>
So this is indeed the characteristic polynomial of $$T$$! (Aside:
equations such as these are examples of
[Newton-Girard identities](https://en.wikipedia.org/wiki/Newton%27s_identities)).

# Footnotes

[^1]: I think there may be more complicated ones which come from
    [Garnir relations](https://en.wikipedia.org/wiki/Garnir_relations),
    but I know nothing about these.

[^2]: Edgar and Höglund, J.Math.Phys. 43 (2002) 659-677
    [arXiv:gr-qc/0105066](https://arxiv.org/abs/gr-qc/0105066)
