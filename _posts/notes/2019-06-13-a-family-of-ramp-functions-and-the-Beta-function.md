---
title: "Notes: A family of ramp functions and the Beta function"
modified:
categories: [notes]
excerpt: "Sometimes in a numerical method, you need to be able to continuously turn a calculation on or off in space or time."
tags: [algebra, special functions]
date: 2019-06-13T00:00:00-06:00
jsxgraph: true
---

<div id="box" class="jxgbox" style="width:500px; height:500px; margin-bottom:1em;"></div>
<div id="out"></div>


Sometimes in a numerical method, you need to be able to continuously
turn a calculation on or off in space or time (here I will pretend
it's in time).  This can be easily accomplished if you have a function
that starts at a value of 0 before some first time $$t_0$$, and rises
up to a value of 1 by time $$t_1$$.  Through an affine transformation
you can always map $$[t_0, t_1] \to [0, 1]$$.  An example "ramp"
function is plotted above.

Now if this function appears in a differential equation, and you are
integrating it with an $$n^{\textrm{th}}$$ order method, then it's not
enough for the function to be continuous: you probably want the first
*n* derivatives to match (and thus vanish) at each endpoint.

Let's go for a piecewise ramp function,
<div>
\begin{align}
R_n(t) = \begin{cases}
0 & t < 0 \\
p_n(t) & 0 \le t \le 1 \\
1 & 1 < t
\end{cases}
\end{align}
</div>
where $$p_n(t)$$ is some polynomial in *t*.
Some counting tells you that these 2 endpoint values and *2n*
derivative conditions can be satisfied with a polynomial of degree
*2n+1*.  Try changing the value of *n* above and see how the
smoothness changes.

Now for any value of *n*, it's a straightforward algebra problem to
set up the polynomial and solve for the coefficients.  You probably
want to know the answer for the general case, and a simple approach is
to do a few examples and look for the pattern.  Here are the first
few:
<div>
\begin{align}
p_0(t) &= t \\
p_1(t) &= t^2 (3-2t) \\
p_2(t) &= t^3 (10 - 15 t + 6 t^2) \\
p_3(t) &= t^4 (35 - 84 t + 70 t^2 - 20 t^3) \\
p_4(t) &= t^5 (126 - 420 t + 540 t^2 - 315 t^3 + 70 t^4)
\end{align}
</div>
Can you spot the pattern?  Don't feel bad if you can't, that's why we
have the [OEIS](https://oeis.org/).  If you search for the above
integers as a sequence, you'll find
[A091811](https://oeis.org/A091811).

With this newfound knowledge, we can now write down the closed form
for the polynomial,
<div>
\begin{align}
\label{eq:def}
p_n(t) = t^{n+1} \sum_{k=0}^n (-1)^k \binom{n+k}{k} \binom{2n+1}{n-k} t^k
\,.
\end{align}
</div>

But was there a better way to find this than relying on the OEIS to
already have the result?  But of course!

Rather than thinking about $$p_n(t)$$ itself, let's think about
$$p_n^\prime(t)$$.  Since $$p_n$$ is strictly increasing,
$$p_n^\prime$$ is positive, while going to zero at the endpoints.  In
fact it goes to zero like $$t^n$$ at one endpoint, and $$(1-t)^n$$ at
the other endpoint, because we wanted *n* derivatives to vanish at
each endpoint.  Therefore we know the proportionality
<div>
\begin{align}
p_n^\prime(t) \propto t^n (1-t)^n \,.
\end{align}
</div>
The only thing to get right is the normalization, which we enforce by
asking that the integral of $$p_n^\prime$$ is 1 at $$t=1$$.  If you've
spent enough time on probability and statistics, then you'll recognize
$$p_n(t)$$ as a special case of the [Beta
distribution](https://en.wikipedia.org/wiki/Beta_distribution), with
shape parameters $$\alpha = \beta = n+1$$.  So we know the
normalization,
<div>
\begin{align}
p_n^\prime(t) = \frac{1}{B(n+1, n+1)} t^n (1-t)^n \,,
\end{align}
</div>
where $$B(a,b)$$ is the [beta
function](https://en.wikipedia.org/wiki/Beta_function), and we can
now call $$p_n(t)$$ the [regularized incomplete beta
function](https://dlmf.nist.gov/8.17#i),
$$p_n(t) = I_t(n+1,n+1)$$.

The incomplete beta function has a [representation in terms of the
Gauss hypergeometric function](https://dlmf.nist.gov/8.17#ii),
<div>
\begin{align}
B_x(a,b) = \frac{x^a}{a} F(a, 1-b; a+1; x) \,.
\end{align}
</div>
The important fact for us is that we're interested in $$a=b=n+1$$, in
which case one of the first two arguments is a non-positive integer,
and therefore [the series will
terminate](https://dlmf.nist.gov/15.2#E4) as a finite-degree
polynomial.  This way, you can prove Eq. \eqref{eq:def}!

<script type="text/javascript" src="{{ site.url }}/assets/js/elliptic.js">
</script>
<script type="text/javascript" src="{{ site.url }}/assets/js/binomcoef.js">
</script>
<script type="text/javascript" src="{{ site.url }}/assets/js/ramps.js">
</script>

<script type="text/javascript">

////////////////////////////////////////////////////////////
// Make some plots

var brd = JXG.JSXGraph.initBoard('box',
                                 {boundingbox:[-0.2,1.4,1.4,-0.2],
                                  showNavigation: false,
                                  showCopyright: false,
                                  grid:false,
                                  axis:true});

brd.suspendUpdate();
n = brd.create('slider',
               [[0.2,1.2],[1.0,1.2],[0,4,10]],
               {name:'n', snapWidth: 1, precision: 0});

theFunc = makeRamp(n.Value());
fg = brd.create('functiongraph',
                // Because of JS scoping
                [ function (x) { return theFunc(x); } , -1.5, 1.5],
                {strokeColor: "#0000ff"});

n.on('drag', function () {
  theFunc = makeRamp(n.Value());
});

brd.unsuspendUpdate();

</script>
