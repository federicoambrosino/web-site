---
title: Poincaré section clicker for the double pendulum
categories: [tool]
excerpt: Interactive toy for understanding Poincaré sections and chaos
tags: [interactive, dynamics, chaos]
date: 2020-03-01
jsxgraph: true
introjs: true
published: true
pinned: false
---

<!------------------------------------------------------------>

Poincaré sections are a tool for understanding chaos in dynamical
systems.  Here is an interactive one for the double
pendulum<span class="mobileShow"> (best enjoyed on desktop)</span>.  Click in the main pane below to add an orbit.
<a id="tourLink" href="javascript:void(0);">Click here for a tour</a>.
<a href="#explanation">Details about what it all means are below</a>.

<!------------------------------------------------------------>
<style>
.mybox {
width: 400px;
// height: 360px;
margin-bottom: 0.4em;
display: block;
}

input[type=button] {
font-size: 12pt;
-webkit-appearance: push-button;
}

input[type=button][disabled] {
  color: #DCDAD1;
  cursor: not-allowed;
}

body.waiting * {
    cursor: progress;
}

.mobileShow {display: none;}

@media only screen
  and (max-device-width : 768px) {
    .mobileShow {display: inline;}
  }
</style>

<div id="ctrlsbox" class="jxgbox mybox" style="height:75px;">
</div>
<div id="buttonbox" class="mybox" style="height: initial;">
<input id="clear" type="button" value="Clear"/>
<input id="zoom100" type="button" disabled value="Zoom 100%"/>
<input id="keyHelp" type="button" value="Keys"/>
<br>
<input id="more" type="button" value="Extend last orbit"/>
<input id="undo" type="button" disabled value="Undo add"/>
<input id="redo" type="button" disabled value="Redo"/>
</div>
<div id="poincbox" class="jxgbox mybox" style="height: 400px;">
</div>

<!------------------------------------------------------------>

{% include toc %}

# What is a Poincaré section?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

<div id="torusbox" style="width:500px; height:500px;"></div>

# Limitations

Some of these limitations are identical to what's on the [Kerr
spherical photon orbit page]({{ site.url }}{% post_url 2016-02-23-kerr-circular-photon-orbits %}#limitations).

* The major limitation is that this is in javascript, which is not
  ideal for numerical work.  There are very few numerical libraries.
* JSXGraph is really not designed for putting tens/hundreds of
  thousands of points onto plots -- their points have many features I
  don't need.  It is also extremely slow to clear all these points off
  of the board, and this blocks the UI thread.
* JSXGraph only has fixed-step-size integrators, no adaptive ones.  I
  picked what seemed like a reasonable step size in most of parameter space.
* The numerical integrator from JSXGraph that I use is a fixed
  step-size
  [RK4](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods)
  integrator.  RK4 has no energy-error guarantee, so it is poorly
  suited to generate Poincaré sections.  Energy drift and other
  integration errors will smear out fine details, and worse yet will
  even connect quasiperiodic orbits to chaotic ones.

# Acknowledgments

This toy makes use of [JSXGraph](http://jsxgraph.uni-bayreuth.de/wp/).
The 'tour' uses [intro.js](https://introjs.com/).
The torus demo uses [three.js](http://threejs.org/) and
[threestrap](https://github.com/unconed/threestrap).  It was
originally inspired by some of the coursework in Jack Wisdom's
dynamics class at MIT.

Suggestions welcome!


<!-- CODE -->

<script type="text/javascript" src="{{ site.url }}/assets/js/vendor/three.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/vendor/threestrap.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/vendor/OrbitControls.js"></script>

<script type="text/javascript" src="{{ site.url }}/assets/js/my_utils.js"></script>

<script type="text/javascript" src="{{ site.url }}/assets/js/poincare-clicker-toy.js"></script>

<script type="text/javascript">
  // Should I use DOMContentLoaded?
  var controller = new PoincareClickerController('ctrlsbox','buttonbox','poincbox');
  controller.handleTouch(.1,.1, false, null);

  // tour stuff
  document.getElementById('tourLink').addEventListener('click', startIntro);

  // 3D stuff
  var torusController = new TorusDemoController('torusbox');

</script>
