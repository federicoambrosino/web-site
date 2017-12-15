(function(root) {

  "use strict";

  function makeRootPointOnDrag(controller, j) {
    return function() {
      controller.roots[j].re = controller.rootPoints[j].X();
      controller.roots[j].im = controller.rootPoints[j].Y();

      controller.updatePolyCoeffsFromRoots();
      controller.updateCoeffView();
    };
  };

  function makeCoeffPointOnDrag(controller, j) {
    return function() {
      controller.coeffs[j].re = controller.coeffPoints[j].X();
      controller.coeffs[j].im = controller.coeffPoints[j].Y();

      controller.p = new Polynomial(controller.coeffs);

      controller.updateRootsFromPoly();
      controller.updateRootView();
    };
  };

  function PolyRootController(rootboxName, coeffboxName, degreeInputName) {

    if (!(this instanceof PolyRootController)) {
      return new PolyRootController(rootboxName, coeffboxName, degreeInputName);
    }

    // Only care about complex numbers
    Polynomial.setField("C");

    this.setupBoxes(rootboxName, coeffboxName);

    this.setupDegreeInput(degreeInputName);

    // Fire the input handler to set up
    this.degreeInput.oninput();
  };

  PolyRootController.prototype = {
    'degree': 0,
    'degreeInput': {},
    'roots' : [],
    'coeffs': [],
    'p': {},
    'rootbox': {},
    'rootPoints': [],
    'coeffbox': {},
    'coeffPoints': [],

    'updatePolyCoeffsFromRoots': function() {
      this.degree = this.roots.length;
      this.p = Polynomial.fromRoots(this.roots);
      this.coeffs = this.p.coeffArray();
    },

    'updateRootsFromPoly': function() {
      var result = this.p.complexRoots(this.roots);
      // TODO Do some error checking here?!

      this.roots = result.root;
    },

    'updateRootView': function() {
      this.rootbox.suspendUpdate();
      for (var i=0; i<this.degree; i++) {
        this.rootPoints[i].setPosition(
          JXG.COORDS_BY_USER, [this.roots[i].re, this.roots[i].im]);
      }
      this.rootbox.unsuspendUpdate();
    },

    'updateCoeffView': function() {
      this.coeffbox.suspendUpdate();
      for (var i=0; i<this.degree; i++) {
        this.coeffPoints[i].setPosition(
          JXG.COORDS_BY_USER, [this.coeffs[i].re, this.coeffs[i].im]);
      }
      this.coeffbox.unsuspendUpdate();
    },

    'setupBoxes': function(rootboxName, coeffboxName) {
      var baseOpts = {
        boundingbox: [-2, 2, 2, -2],
        keepaspectratio: true,
        axis: {ticks: {minorTicks:1, majorHeight:10, minorHeight:4}},
        grid: true,
        pan: {enabled: false},
        showNavigation: false,
        showCopyright:  false};

      this.rootbox  = JXG.JSXGraph.initBoard(rootboxName, baseOpts);
      this.coeffbox = JXG.JSXGraph.initBoard(coeffboxName, baseOpts);
    },

    'setDegreeFromView': function() {
      this.degree = parseInt( this.degreeInput.value, 10);
      if (isNaN(this.degree))
        this.degree = 4;
    },

    'setupDegreeInput': function(degreeInputName) {
      this.degreeInput = document.getElementById(degreeInputName);
      this.degreeInput.oninput =
        (function(controller) {
          return function() {
            controller.teardownPoints();

            controller.setDegreeFromView();

            controller.setupRandomRoots();
            controller.updatePolyCoeffsFromRoots();

            controller.setupPoints();

            controller.updateRootView();
            controller.updateCoeffView();
          };
        })(this);
    },

    'setupRandomRoots': function() {
      var eps = 0.1;
      var n = this.degree;

      this.roots = new Array(n);
      for (var j=0; j<n; j++) {
        this.roots[j] = Complex.I.mul(2.*Math.PI*j/n).exp();
        this.roots[j] = this.roots[j].add(Complex(Math.random(), Math.random()).mul(eps));
      }
    },

    'setupPoints': function() {
      for (var i=0; i<this.degree; i++) {
        this.rootPoints[i] =
          this.rootbox.create('point', [0,0], {name: ""});

        this.coeffPoints[i] =
          this.coeffbox.create('point', [0,0], {name: "a<sub>"+i+"</sub>"});

        this.rootPoints[i].on('drag', makeRootPointOnDrag(this, i));
        this.coeffPoints[i].on('drag', makeCoeffPointOnDrag(this, i));
      }
    },

    'teardownPoints': function() {
      for (var i=0; i<this.degree; i++) {
        this.rootbox.removeObject(this.rootPoints[i]);
        this.coeffbox.removeObject(this.coeffPoints[i]);
      };
      this.rootPoints = [];
      this.coeffPoints = [];
    },
  };

  root['PolyRootController'] = PolyRootController;

})(this);
