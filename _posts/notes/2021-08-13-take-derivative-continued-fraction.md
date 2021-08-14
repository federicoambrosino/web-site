---
title: "Notes: How to take a derivative of a generalized continued fraction"
modified:
categories: [notes]
excerpt: "So you have a function in terms of a continued fraction, and
you want to compute its derivative..."
tags: [continued fractions, numerical methods, python, scientific computing]
date: 2021-08-14T00:00:00-06:00
published: true
---

{% include toc %}

Entire books have been written about generalized continued
fractions[^1]⁻[^2], and there is a great review article on numerical
evaluation[^3].  Of course the [article on
Wikipedia](https://en.wikipedia.org/wiki/Continued_fraction) is also
good.  But I didn't find an explanation of how to compute a derivative
of a generalized continued fraction in any of these, which is why I
wrote up these notes.  Anyway, let's start at the beginning.

# Simple continued fractions

Before we get into generalized continued fractions, we should start
with their predecessors, just plain continued fractions.
Traditionally, a continued fraction was a way to represent any real
number -- for example, $$\phi = (1+\sqrt{5})/2$$ -- by the *closest*
rational approximations.  A simple algorithm lets you generate an
infinite sequence of *integers* $$[b_0; b_1, b_2, b_3 \ldots]$$ by
subtracting off one rational approximation and finding the integer
whose reciprocal is closest to the remainder.  The sequence $$[b_0;
b_1, b_2, b_3 \ldots]$$ is our way of denoting
<div>
\begin{align}
\label{eq:tradan}
x = b_0 + \frac{1}{b_1 + \frac{1}{b_2 + \frac{1}{b_3 + \ldots}}}
\,.
\end{align}
</div>
Nesting all those fractions can make things look messy, so people
usually resort to a kind of hacky notation,
<div>
\begin{align}
\label{eq:notation}
x = b_0 + \frac{1}{b_1 +} \frac{1}{b_2 +} \frac{1}{b_3 + }\ldots
\,.
\end{align}
</div>
If this sequence terminates, then it's a rational number.
For a number like $$\phi$$, there is an obvious pattern,
<div>
\begin{align}
\label{eq:phi}
\phi = [1; 1, 1, 1 \ldots] = 1 + \frac{1}{1 +} \frac{1}{1 +}
\frac{1}{1 + }\ldots
\,.
\end{align}
</div>
In fact, a "quadratic irrational" will have a continued fraction with
a periodic sequence of integers!  Other numbers have patterns without
repeating, while some just don't have any pattern you can spot...
<div>
\begin{align}
\label{eq:examples}
e &= [2;1,2,1,1,4,1,1,6,1,1,8 \ldots] \\
\pi &= [3; 7, 15, 1, 292, 1, 1, 1, 2, 1, \ldots]
\,.
\end{align}
</div>

Obviously we're not going to be taking derivatives of constants, so
let's move on to generalized continued fractions.

# Generalized continued fractions

It's not hard to imagine how to generalize the classical continued
fractions so that they depend on some parameter $$x$$.  This kind of
thing actually comes up quite naturally in the theory of three term
recurrence relations, which is used for solving certain differential
equations -- and lots of other places in math.  The continued fraction
representation sometimes converges much more quickly than other ways
of computing a function.  A generalized continued fraction looks like
<div>
\begin{align}
\label{eq:general}
f(x) = b_0(x) + \frac{a_1(x)}{b_1(x) + }\frac{a_2(x)}{b_2(x) + }
\frac{a_3(x)}{b_3(x) + } \ldots \,.
\end{align}
</div>
So, now we have two sequences, $$a_i$$ and $$b_i$$, and they both
depend on some parameter $$x$$ (or multiple parameters!).  One example
is
<div>
\begin{align}
\label{eq:arctan}
\text{arctan} x = 0 + \frac{x}{1+} \frac{x^2}{3+} \frac{(2x)^2}{5+}
\frac{(3x)^2}{7+}\ldots
\,,
\end{align}
</div>
that is, it's given by the two sequences
<div>
\begin{align}
\label{eq:arctan_a_b}
a_1(x) = x, \ a_i(x) &= (i-1)^2 x^2 \\
b_0(x) = 0, \ b_i(x) &= 2i-1
\,.
\end{align}
</div>
If we throw away all the terms with $$i>n$$ for some $$n$$, then we
get a sequence of "approximants" or "convergents".  For example let's
say we use this above continued fraction to try to evaluate $$\pi = 4
\text{arctan}(1)$$, by evaluating at $$x=1$$ and multiplying the final
result by 4.  Then we would get the sequence
<div>
\begin{align}
\label{eq:pi_conv}
\pi \approx 0, 4, 3, \frac{19}{6}, \frac{160}{51}, \frac{1744}{555},
\frac{644}{205}, \ldots
\end{align}
</div>
The last of these is good to about 0.004% (note that this is not as
good as the *best* continued fraction for $$\pi$$ with the same number
of terms, but that is a different question).

# How to take a derivative of a generalized continued fraction

Suppose we're given a function $$f(x)$$ that we *only* know in terms
of its continued fraction representation, and we want to compute its
derivative $$f'(x)$$.  The first thing you might try (well, that I
tried) is to apply the quotient rule and chain rule on the expression
in Eq. \eqref{eq:general}.  This leads to an explosion of algebra but
not an answer.

Instead of working with the notation of an infinite nested fraction,
we will instead think about the value of a continued fraction in terms
of its convergents.  That is, when the CF converges, its value is the
limit of the convergents,
<div>
\begin{align}
\label{eq:f_from_conv}
f = \lim_{n\to \infty} \frac{A_n}{B_n}
\,.
\end{align}
</div>
Here you truncate the terms with $$i>n$$, then do the algebra to clear
out denominators and make an ordinary fraction $$A_n/B_n$$, with no
nested fractions.  This sequence of ratios starts off
<div>
\begin{align}
\label{eq:convergents}
f \approx b_0, \frac{b_1 b_0 + a_1}{b_1}, \frac{b_2 (a_1+b_1 b_0) +
a_2 b_0}{b_2 b_1 + a_2},
\ldots
\end{align}
</div>
All the way back in 1655/6 in his text [_Arithmetica
Infinitorum_](https://archive.org/details/ArithmeticaInfinitorum),
John Wallis showed that the $$A_n$$ and $$B_n$$ satisfy a recurrence
(which you can prove by induction),
<div>
\begin{align}
\label{eq:A_recurrence}
A_{n+1} &= b_{n+1} A_n + a_{n+1} A_{n-1} \,, \\
\label{eq:B_recurrence}
B_{n+1} &= b_{n+1} B_n + a_{n+1} B_{n-1} \,,
\end{align}
</div>
which starts off with a fake "-1" term and the zeroth term,
<div>
\begin{align}
\label{eq:AB_init}
A_{-1} = 1, \ B_{-1} = 0, \ A_0 = b_0, \ B_0 = 1 \,.
\end{align}
</div>
As an aside, the $$A$$'s and $$B$$'s may grow exponentially[^4] and
lead to a loss of precision on the computer.  To avoid this, there are
various improvements to Wallis's original algorithm, one of which we
will [discuss below](#modified-lentz-method).

So what does this have to do with evaluating the derivative?  Well,
starting from the limit definition of the CF, and assuming the CF
converges absolutely in a neighborhood so we can bring the derivative
inside the limit, we will find the derivative from
<div>
\begin{align}
\label{eq:df_limit}
\frac{df}{dx} = \lim_{n\to\infty} \frac{d}{dx} \frac{A_n}{B_n}
= \lim_{n\to\infty} \frac{A_n'(x) \ B_n - A_n \ B_n'(x)}{B_n^2}
\,.
\end{align}
</div>
So, if we know how to compute the derivatives $$A_n'(x)$$ and
$$B_n'(x)$$, we'll be in business.  All we have to do is differentiate
Eqs. \eqref{eq:A_recurrence} and \eqref{eq:B_recurrence} to get the
recurrence relations,
<div>
\begin{align}
\label{eq:dA_recur}
A_{n+1}' &= b_{n+1}' A_n + b_{n+1} A_n' + a_{n+1}' A_{n-1} + a_{n+1} A_{n-1}' \, \\
\label{eq:dB_recur}
B_{n+1}' &= b_{n+1}' B_n + b_{n+1} B_n' + a_{n+1}' B_{n-1} + a_{n+1} B_{n-1}' \,.
\end{align}
</div>
Here think of the $$a_i'(x)$$ and $$b_i'(x)$$ as derivatives that you
calculate by hand, since you know the original functions; but the
terms $$A'_i$$ and $$B'_i$$ as values in a recurrence that we compute
from the bottom up.  Of course we need initial values, which we get by
differentiating Eq. \eqref{eq:AB_init},
<div>
\begin{align}
\label{eq:dAB_init}
A'_{-1} = 0, \ B'_{-1} = 0, \ A'_0 = b_0', \ B'_0 = 0 \,.
\end{align}
</div>

Hopefully it is clear how to generalize this to continued fractions
that depend on *k* variables: each of the derivatives above is just
replaced by a *k*-dimensional gradient (co)vector, and the result of
all the recurrences is the (*k*-dimensional) gradient *df*.

Similarly, if you want the Hessian matrix, or any higher derivative
tensor, just apply more partial derivatives, and keep track of more
auxiliary variables.

## Automatic differentiation point of view

As a note here, I should thank [Rob
Corless](https://rcorless.github.io/) who helped me ensure I
understood how to do the above, and emphasized another point of view.
This point of view is as follows: we should not distinguish between
(a) some abstract mathematical function and (b) a computer algorithm
that can be used to produce arbitrarily precise numerical values from
that function.  Just like power series or integrals or continued
fractions or other representations, a computer algorithm *is* a
representation of a function.  Now for different representations of
$$f(x)$$, we may find various representations of $$f'(x)$$ -- maybe a
series or integral or the algorithm up above.

How, in general, do you find the derivative of a numerical algorithm?
Your first temptation might be to use finite difference.  But we can
do much better.  In fact, every algorithm (for a differentiable
function) contains basically *all* the information on how to compute
its derivative (or gradient, with more arguments).  Usually this is
expressed in terms of "[automatic
differentiation](https://en.wikipedia.org/wiki/Automatic_differentiation)"
and/or "[dual numbers](https://en.wikipedia.org/wiki/Dual_number)".
Replace every number *x* with a pair $$(x, x')$$.  Now define
algebraic operations on these dual numbers, for example,
<div>
\begin{align}
\label{eq:dual_algebra}
(x, x') + c (y, y') &= (x+ c y, x' + c y') \,, \\
(x, x') (y, y') &= (x \, y, x y' + x' y) \,, \\
\frac{(x, x')}{(y, y')} &= \left( \frac{x}{y}, \frac{x' y - x y'}{y^2}
\right) \,,
\end{align}
</div>
and so on.  Here we see that second argument is just expressing
linearity of the derivative, the product rule, and the quotient rule.
Now as your algorithm is doing some calculation, it is also keeping
track of the derivative -- as long as it knows a few basic rules like
these.

If you are working with a language that allows polymorphism or
generics, then you can promote any numerical algorithm to one that can
automatically compute its own derivative (in "forward mode"
auto-diff).  Just build an algebraic type for dual numbers and
overload all of its arithmetic operations.  You can also make
specializations for special functions when you can compute the
derivative by hand, for example
<div>
\begin{align}
\label{eq:dual_sin}
\sin((x, x')) = (\sin(x), \cos(x) x')
\,.
\end{align}
</div>

So, if you have an implementation of an algorithm for computing a
continued fraction, then you can automatically get an algorithm for
computing the derivative of a continued fraction.  Or, you can
implement the derivative of Wallis's algorithm above, or for the
modified Lentz method below.

# Modified Lentz method

To avoid the possibly exponential growth of the $$A_n$$ and $$B_n$$
coefficients, the modified Lentz method[^4] instead constructs a
recurrence for their successive ratios,
<div>
\begin{align}
\label{eq:CD_def}
C_n\equiv \frac{A_n}{A_{n-1}}, \ D_n \equiv \frac{B_{n-1}}{B_n}
\,,
\end{align}
</div>
(but we never actually need the $$A$$'s or $$B$$'s). From the
recurrence relations for $$A_n$$ and $$B_n$$, we get the new
recurrence relations
<div>
\begin{align}
\label{eq:CD_recur}
C_n = b_n + a_n / C_{n-1} \,, \ 
D_n = 1/(b_n + a_n D_{n-1})
\,.
\end{align}
</div>
And finally to compute the CF, we multiply these successive ratios
together,
<div>
\begin{align}
\label{eq:f_Lentz}
f_n = f_{n-1} C_n D_n
\,.
\end{align}
</div>
As before we need to start the recurrence with initial conditions,
<div>
\begin{align}
\label{eq:lentz_IC}
f_0 = C_0 = b_0 \,, \ D_0 = 0 \,.
\end{align}
</div>

But, there is a danger in the Lentz method, because of the division
steps involved in Eq. \eqref{eq:CD_recur}.  To avoid this potential
pitfall, $$C_n$$ is set to a tiny but non-zero value if it ever
exactly cancels (this includes in the initial condition
\eqref{eq:lentz_IC}). Similarly, if the denominator of $$D_n$$ ever
exactly cancels, then $$D_n$$ is replaced with the reciprocal of that
tiny number.

Finally, this algorithm needs a stopping condition.  This is usually
determined by testing if the absolute change $$|1-C_n D_n|$$ is
smaller than your desired tolerance.

# Derivatives in modified Lentz method

To compute the derivative of a CF using the modified Lentz method, we
again assume we're handed methods to compute $$a'_n(x)$$ and
$$b'_n(x)$$ (or *k*-dimensional gradients).  Then we differentiate all
the recurrence relations above, to find a recurrence for the
derivatives,
<div>
\begin{align}
\label{eq:lentz_der}
C'_n &= b'_n + (a'_n C_{n-1} - a_n C'_{n-1}) / C_{n-1}^2 \,, \\
D'_n &= - D_n^2 (b'_n + a'_n D_{n-1} + a_n D'_{n-1}) \,, \\
f'_n &= f'_{n-1} C_n D_n + f_{n-1} C'_n D_n + f_{n-1} C_n D'_n \,.
\end{align}
</div>
Here the only dangerous division is by $$C_{n-1}$$, which is replaced
with a tiny number if it exactly vanishes.

# Code example

Pseudocode for the modified Lentz method is listed in[^5] or in the
freely-available article[^4].  I implemented this in python in my
package [`qnm`](https://github.com/duetosymmetry/qnm), since computing
the quasinormal mode frequencies of black holes requires finding roots
of continued fraction equations.  Here let me list a version that
would also compute a derivative of the continued fraction at the same
time.  The user should specify functions `a, b, da, db` that will
return the values of $$a_n, b_n, a'_n, b'_n$$.  I have also modified
the stopping condition so that it can be made to perform a minimum or
maximum number of iterations (steps of the recursion).
~~~~ python
import numpy as np

def lentz_with_grad(a, b, da, db,
                    args=(),
                    tol=1.e-10,
                    N_min=0, N_max=np.Inf,
                    tiny=1.e-30):
    """Compute a continued fraction (and its derivative) via modified
    Lentz's method.

    This implementation is by the book [1]_.  The value to compute is:
      b_0 + a_1/( b_1 + a_2/( b_2 + a_3/( b_3 + ...)))
    where a_n = a(n, *args) and b_n = b(n, *args).

    Parameters
    ----------
    a: callable returning numeric.
    b: callable returning numeric.
    da: callable returning array-like.
    db: callable returning array-like.

    args: tuple [default: ()]
      Additional arguments to pass to the user-defined functions a, b,
      da, and db.  If given, the additional arguments are passed to
      all user-defined functions, e.g. `a(n, *args)`.  So if, for
      example, `a` has the signature `a(n, x, y)`, then `b` must have
      the same  signature, and `args` must be a tuple of length 2,
      `args=(x,y)`.

    tol: float [default: 1.e-10]
      Tolerance for termination of evaluation.

    N_min: int [default: 0]
      Minimum number of iterations to evaluate.

    N_max: int or comparable [default: np.Inf]
      Maximum number of iterations to evaluate.

    tiny: float [default: 1.e-30]
      Very small number to control convergence of Lentz's method when
      there is cancellation in a denominator.

    Returns
    -------
    (float, array-like, float, int)
      The first element of the tuple is the value of the continued
      fraction.
      The second element is the gradient.
      The third element is the estimated error.
      The fourth element is the number of iterations.

    References
    ----------
    .. [1] WH Press, SA Teukolsky, WT Vetterling, BP Flannery,
       "Numerical Recipes," 3rd Ed., Cambridge University Press 2007,
       ISBN 0521880688, 9780521880688 .

    """

    if not isinstance(args, tuple):
        args = (args,)

    f_old = b(0, *args)

    if (f_old == 0):
        f_old = tiny

    C_old = f_old
    D_old = 0.

    # f_0 = b_0, so df_0 = db_0
    df_old = db(0, *args)
    dC_old = df_old
    dD_old = 0.

    conv = False

    j = 1

    while ((not conv) and (j < N_max)):

        aj, bj = a(j, *args), b(j, *args)
        daj, dbj = da(j, *args), db(j, *args)

        # First: modified Lentz
        D_new = bj + aj * D_old

        if (D_new == 0):
            D_new = tiny
        D_new = 1./D_new

        C_new = bj + aj / C_old

        if (C_new == 0):
            C_new = tiny

        Delta = C_new * D_new
        f_new = f_old * Delta

        # Second: the derivative calculations
        # The only possibly dangerous denominator is C_old,
        # but it can't be 0 (at worst it's "tiny")
        dC_new = dbj + (daj*C_old - aj*dC_old)/(C_old*C_old)
        dD_new = -D_new*D_new*(dbj + daj*D_old + aj*dD_old)
        df_new = df_old*Delta + f_old*dC_new*D_new + f_old*C_new*dD_new

        # Did we converge?
        if ((j > N_min) and (np.abs(Delta - 1.) < tol)):
            conv = True

        # Set up for next iter
        j      = j + 1
        C_old  = C_new
        D_old  = D_new
        f_old  = f_new
        dC_old = dC_new
        dD_old = dD_new
        df_old = df_new

    # Success or failure can be assessed by the user
    return f_new, df_new, np.abs(Delta - 1.), j-1
~~~~

Now let's demonstrate this with a calculation of the continued
fraction for $$\tan(x)$$.  Of course the tangent function is already
included in almost any numerical library… and from first year
calculus, we know that its derivative is $$\tan'(x) = \sec^2(x)$$,
which we can also compute from a numerical library.  But sometimes we
don't have these luxuries!  Anyway, the continued fraction is
<div>
\begin{align}
\label{eq:tan_CF}
\tan(x) = 0 + \frac{x}{1-}\frac{x^2}{3-}\frac{x^2}{5-}\ldots,
\end{align}
</div>
which is given by the two sequences
<div>
\begin{align}
\label{eq:tan_ab}
a_1(x) &= x \,, & a_i(x) &= -x^2 \,, \\
b_0(x) &= 0 \,, & b_i(x) &= 2i-1 \,.
\end{align}
</div>
Taking derivatives we immediately get
<div>
\begin{align}
\label{eq:tan_dab}
a'_1(x) &= 1 \,, & a'_i(x) &= -2x \,, \\
&& b'_i(x) &= 0 \,.
\end{align}
</div>
We can code these up in a few lines:
~~~~ python
def tanx_a(n, x):
    return x if n==1 else -x*x

def tanx_b(n, x):
    return 0. if n==0 else 2*n-1

def tanx_da(n, x):
    return 1. if n==1 else -2*x

def tanx_db(n, x):
    return 0.
~~~~
And finally, let's call the routine to evaluate the continued fraction
$$\tan(1)$$, which will also compute the derivative,
$$\sec^2(1)$$.  We specify $$x=1$$ with the parameter `args=1.` (which
should be a tuple for functions that take more than one parameter).
Let's ask for 15 digits of accuracy:
~~~~ python
>>> lentz_with_grad(tanx_a, tanx_b,
...                 tanx_da, tanx_db,
...                 args=1., tol=1.e-15)

(1.5574077246549018, 3.4255188208147596, 2.220446049250313e-16, 10)
~~~~
The return value tells us that $$\tan(1)\approx 1.5574077246549018$$,
$$\sec^2(1) \approx 3.4255188208147596$$, the estimated error on the
function value is $$\approx 2.2\times 10^{-16}$$, and it only took 10
iterations to compute these two numbers!  Just for peace of mind,
let's check these values with the library routines in `numpy` (which
are really from `libm`)
~~~~ python
>>> (np.tan(1.), 1/np.cos(1.)**2)

(1.557407724654902, 3.425518820814759)
~~~~
They agree! And indeed, the difference between the CF approach and the
result from the standard library is about $$\approx 2\times
10^{-16}$$, in agreement with the estimated error.

# References

[^1]: Hall, *Analytic theory of continued fractions*, (1948), Chelsea
    publishing company.

[^2]: Cuyt *et al.*, *Handbook for continued fractions for special
    functions*, (2008), Springer.

[^3]: Blanch, *Numerical Evaluation of Continued Fractions*, [SIAM
    Review, 6(4), 383-421 (1964)](https://doi.org/10.1137/1006092).

[^4]: Press and Teukolsky, *Evaluating continued fractions and
    computing exponential integrals*, [Computers in Physics, 2(5),
    88-89 (1988)](https://doi.org/10.1063/1.4822777).

[^5]: Press *et al.*, [Numerical Recipes](http://numerical.recipes/),
    3rd ed. (2007), Cambridge University Press.
