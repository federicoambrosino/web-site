---
title: Complex polynomial roots toy
categories: [tool]
excerpt: Interactive toy for visualizing relationship between polynomial roots and coefficients
tags: [interactive, algebra, polynomial, roots]
date: 2017-12-13
jsxgraph: true
published: true
pinned: false
---

<!--
{% include toc %}
-->

<!------------------------------------------------------------>

<style>
.mybox {
width: 300px;
height: 300px;
margin-bottom: 1em;
display: inline-block;
}
</style>

<div id="rootbox" class="jxgbox mybox" style="">
</div>
<div id="coeffbox" class="jxgbox mybox" style="">
</div>

<!------------------------------------------------------------>
<!-- CODE -->

<script type="text/javascript" src="{{ site.url }}/assets/js/fraction.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/complex.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/quaternion.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/polynomial.min.js"></script>

<script type="text/javascript">
// Only care about complex numbers
Polynomial.setField("C");

// Global app state object
var appState = {
  "degree": 0,
  "roots" : [],
  "coeffs": [],
  "p": {},
  "rootbox": {},
  "rootPoints": [],
  "coeffbox": {},
  "coeffPoints": [],
  };

//----------------------------------------------------------

function updatePolyCoeffsFromRoots() {
  appState.degree = appState.roots.length;
  appState.p = Polynomial.fromRoots(appState.roots);
  appState.coeffs = appState.p.coeffArray();
};

function updateRootsFromPoly() {
  var result = appState.p.complexRoots(appState.roots);
  // TODO Do some error checking here?!

  appState.roots = result.root;
};

function updateRootView() {
  appState.rootbox.suspendUpdate();
  for (var i=0; i<appState.degree; i++) {
    appState.rootPoints[i].setPosition( JXG.COORDS_BY_USER,
      [appState.roots[i].re, appState.roots[i].im]);
  }
  appState.rootbox.unsuspendUpdate();
}

function updateCoeffView() {
  appState.coeffbox.suspendUpdate();
  for (var i=0; i<appState.degree; i++) {
    appState.coeffPoints[i].setPosition( JXG.COORDS_BY_USER,
      [appState.coeffs[i].re, appState.coeffs[i].im]);
  }
  appState.coeffbox.unsuspendUpdate();
}

//----------------------------------------------------------

var myBaseOpts = {
  boundingbox: [-2, 2, 2, -2],
  keepaspectratio: true,
  axis: {ticks: {minorTicks:1, majorHeight:10, minorHeight:4}},
  grid: true,
  pan: {enabled: false},
  showNavigation: false,
  showCopyright:  false};

appState.rootbox  = JXG.JSXGraph.initBoard('rootbox', myBaseOpts);
appState.coeffbox = JXG.JSXGraph.initBoard('coeffbox', myBaseOpts);

appState.roots = [Complex(1.), Complex(0, 1.),
                  Complex(-1.1, 0.2), Complex(-0.1, -0.9)];

updatePolyCoeffsFromRoots();

for (var i=0; i<appState.degree; i++) {
  appState.rootPoints[i] =
    appState.rootbox.create('point', [0,0], {name: ""});

  appState.coeffPoints[i] =
    appState.coeffbox.create('point', [0,0], {name: "a<sub>"+i+"</sub>"});

  appState.rootPoints[i].on('drag',
    (function(j) {
      return function() {
        appState.roots[j] =
          new Complex(appState.rootPoints[j].X(),
                      appState.rootPoints[j].Y());
        updatePolyCoeffsFromRoots();
        updateCoeffView();
     };
    })(i));
  appState.coeffPoints[i].on('drag',
    (function(j) {
      return function() {
        appState.coeffs[j] =
          new Complex(appState.coeffPoints[j].X(),
                      appState.coeffPoints[j].Y());
        appState.p = new Polynomial(appState.coeffs);
        updateRootsFromPoly();
        updateRootView();
     };
    })(i));
}

updateRootView();
updateCoeffView();

</script>
