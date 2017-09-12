---
title: "Simple slow-rotation neutron star structure solver"
modified:
categories: code
excerpt:
link: https://github.com/duetosymmetry/simple-slow-rot-NS-solver
tags: [code, compact objects, scientific computing]
date: 2017-09-08T14:24:09-07:00
---

I'm releasing into the wild [a simple code for computing neutron star
structure in the slow-rotation
expansion](https://github.com/duetosymmetry/simple-slow-rot-NS-solver)
to first and second order.  This code was originally from Nico Yunes,
with a bunch of development by Kent Yagi.  I rewrote huge chunks of it
to give it a command line/config file interface, turned some magic
numbers into configurable parameters, C++ified some important bits,
etc.  Kent gave me his blessing to release it into the wild.  For IP
reasons, I first had to remove the dependence on code from Numerical
Recipes, which is why it looks like the commit history starts in
Sept. 2017.

Of course there are already codes like
[RNS](http://www.gravity.phys.uwm.edu/rns/) and
[LORENE](http://www.lorene.obspm.fr/), so who needs another NS code?
This code is useful for two reasons:

1. There is a modular implementation of the piecewise-polytropic model
from Read, Lackey, Owen, and Friedman (2009)
[[arXiv:0812.2163](https://arxiv.org/abs/0812.2163)] along with their
fits for named EOSs; and
2. The slow-rotation expansion allows to
accurately extract the moment of inertia and quadrupole moment.

Feel free to improve the code in any way you see fit and send me a
pull request, or open a new issue, anything you want under the MIT
license.
