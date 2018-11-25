(function(root) {

  "use strict";

  function bMax(energy) {
    return Math.acos(-2.-energy);
  };

  function lbMax(energy) {
    return Math.sqrt(6.+2.*energy);
  };

  function lbSeparatrix(energy, b) {
    return Math.sqrt(2.*(2. + energy + Math.cos(b)));
  };

  function discrim(energy, b, lb) {
    return (4. + 2.*energy - lb*lb + 2.*Math.cos(b))*(3. - Math.cos(2.*b)) / 2.;
  };

  function insideSep(energy, b, lb) {
    return (discrim(energy, b, lb) >= 0);
  };

  function initConds(energy, b, lb) {
    // make sure we can get physical init conds
    var d = discrim(energy, b, lb);
    if (!(d >= 0.))
      throw 'initConds: b and lb are out of bounds for this energy';
    return [0., // a
            lb + lb*Math.cos(b) + Math.sqrt( d ), // la
            b, lb];
  };

  function ODERHS(t, xs) {
    var a = xs[0], la = xs[1], b = xs[2], lb = xs[3];

    var denom = 3. - Math.cos(2.* b);
    var cosb = Math.cos(b);
    var onePlusCosb = 1. + cosb;
    var threePlusTwoCosb = 3. + 2.* cosb;

    var adot = 2.*(la - lb*onePlusCosb) / denom;
    var bdot = 2.*(-la*onePlusCosb + lb*threePlusTwoCosb)/denom;
    var ladot = -2. * Math.sin(a) - Math.sin(a+b);
    var lbdot = -Math.sin(a+b) - 2. * lb * Math.sin(b) * (la - lb) / denom
        + 2. * (la*la - 2.*la*lb*onePlusCosb + lb*lb*threePlusTwoCosb) * Math.sin(2.*b) / denom / denom;

    return [adot, ladot, bdot, lbdot];
  };

  // Returns the x value where y crosses zero, using linear interpolation.
  function zeroCrossing(x0, y0, x1, y1) {
    var m = (y1-y0)/(x1-x0);
    var b = y1-m*x1;
    return -b/m;
  }

  /* Assume that y(x) is a linear function with values
   * y0 = y(x0), y1 = y(x1)
   * Then interpolate y(xprime)
  */
  function linearInterp(xprime, x0, y0, x1, y1) {
    var m = (y1-y0)/(x1-x0);
    var b = y1-m*x1;
    return m*xprime + b;
  }

  /* This is the heart of the toy.
   * Tries to yield npt _new_ points in the (b,lb) plane.
   * Returns an Array, hopefully of length npt+1, where the 0th
   * element is the initial point that was passed, and the rest are new.
   * Stops if maxSteps is reached, so it may yield fewer points.
   */
  function reapPoincarePoints(energy, npt, initB, initLB, deltaT, maxSteps) {
    var poincPoints = new Array();
    var foundPoints = 0, iter = 0;
    var curPoint = initConds(energy, initB, initLB), newPoint;
    var tCross, newB, newLB;

    // We will return the initial point as element 0
    poincPoints.push([initB, initLB]);

    // Fence-post issue with JXG.Math.Numerics.rungeKutta .
    // To get it to take one step, we need to tell it we want a total
    // of two steps on the interval, because it counts the 0th step.
    deltaT = 2.*deltaT;

    do {
      // Take an RK step
      newPoint = JXG.Math.Numerics.rungeKutta(
        'rk4',        // Butcher table
        curPoint,     // Initial conditions
        [0., deltaT], // time interval
        2,            // how many points
        ODERHS        // the RHS of the system
      );

      // Just get the new point
      newPoint = newPoint[1];

      // Check if there has been a zero-crossing for a, in the
      // positive direction
      if ((curPoint[0] < 0) && (newPoint[0] >= 0) ) {
        // We found a new point on the section!
        foundPoints++;

        // Find the approximate time of crossing
        tCross = zeroCrossing(0., curPoint[0], deltaT, newPoint[0]);

        // Interpolate the values of b, lb
        newB  = linearInterp(tCross, 0., curPoint[2], deltaT, newPoint[2]);
        newLB = linearInterp(tCross, 0., curPoint[3], deltaT, newPoint[3]);

        // store it
        poincPoints.push([newB, newLB]);
      };

      // Next
      iter++;
      curPoint = newPoint;

    } while ( (iter <= maxSteps) && (foundPoints < npt) );

    return poincPoints;
  };

  ////////////////////////////////////////////////////////////
  // UI related

  /* Emits the slider-drag-handler */
  function makeESliderDrag(controller) {
    return function() {
      controller.setenergy(controller.eslider.Value());
    };
  };

  /* Emits the slider-drag-handler */
  function makeNPtSliderDrag(controller) {
    return function() {
      controller.setnpt(controller.nptslider.Value());
    };
  };

  /* This emits a click handler for the Poincare section.
   * This is the UI-specific code.  It dispatches to
   * controller.handleTouch after translating to logical (b, lb) coordinates.
   * handleTouch needs to know if there is already a point there, and
   * if so, which one
   */
  function makePoincTouch(controller) {
    // See https://jsxgraph.uni-bayreuth.de/wiki/index.php/Browser_event_and_coordinates

    var board = controller.poincbox;
    var getMouseCoords = function(e, i) {
      var cPos = board.getCoordsTopLeftCorner(e, i),
          absPos = JXG.getPosition(e, i),
          dx = absPos[0]-cPos[0],
          dy = absPos[1]-cPos[1];

      return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
    };

    return function(e) {
      var ptExists = false, i, coords, thePoint;

      if (e[JXG.touchProperty]) {
        // Is this right?
        if (e.touches.length > 1) // multi-touch, pass through
          return true;
        // index of the finger that is used to extract the coordinates
        i = 0;
      }
      coords = getMouseCoords(e, i);
      var b = coords.usrCoords[1];
      var lb = coords.usrCoords[2];

      for (var el in board.objects) {
        if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
          ptExists = true;
          thePoint = board.objects[el];
          break;
        }
      }

      controller.handleTouch(b, lb, ptExists, thePoint);

    };
  };

  // Add the separatrix curves to the plot
  function createSeparatrixCurves(controller) {
    /* q will run from 0 to 1, map it to the correct range of b */
    var bOfq = function(q){ return bMax(controller.energy)*(-1. + 2. * q); };
    var sepA = controller.poincbox.create('curve',
                 [bOfq,
                  function(q){ return lbSeparatrix(controller.energy, bOfq(q));},
                  0., 1.]);
    var sepB = controller.poincbox.create('curve',
                 [bOfq,
                  function(q){ return -lbSeparatrix(controller.energy, bOfq(q));},
                  0., 1.]);

    // Make them unclickable
    sepA.hasPoint = function(){return false; };
    sepB.hasPoint = function(){return false; };
  };

  function makeZoomHandler(controller) {
    return function(){
      var box = controller.poincbox.stopSelectionMode();
      // bbox has the coordinates of the selection rectangle.
      // Attention: box[i].usrCoords have the form [1, x, y], i.e.
      // are homogeneous coordinates.
      // Make sure to order min, max x,y so that orientation is preserved
      var xMin = Math.min(box[0].usrCoords[1],box[1].usrCoords[1]),
          xMax = Math.max(box[0].usrCoords[1],box[1].usrCoords[1]),
          yMin = Math.min(box[0].usrCoords[2],box[1].usrCoords[2]),
          yMax = Math.max(box[0].usrCoords[2],box[1].usrCoords[2]);
      // Set a new bounding box
      controller.poincbox.setBoundingBox([xMin, yMax, xMax, yMin], false);
      controller.isZoom100 = false;
      controller.updateButtonAbility();
    };
  };

  function makeClearClickHandler(controller) {
    return function(){
      controller.clearPoints();
    };
  };

  function makeMoreClickHandler(controller) {
    return function(){
      controller.morePointsFromLast();
    };
  };

  function makeUndoClickHandler(controller) {
    return function(){
      controller.popLastOrbit();
    };
  };

  function makeRedoClickHandler(controller) {
    return function(){
      controller.restoreOrbit();
    };
  };

  function makeZoom100ClickHandler(controller) {
    return function(){
      controller.initialZoom();
    };
  };

  function makePointOverHandler(controller, groupCSSClass) {
    var selectorText = "." + groupCSSClass;
    return function(){
      var rules = controller.styleSheet.cssRules;
      for(var i=0; i<rules.length; i++) {
        // Find the correct rule in the stylesheet
        if(rules[i].selectorText == selectorText) {
          rules[i].style['fill'] = controller.extraStyles.hiliteColor;
          rules[i].style['rx'] = controller.extraStyles.hiliteSize;
          rules[i].style['ry'] = controller.extraStyles.hiliteSize;
        };
      };
    };
  };

  function makePointOutHandler(controller, groupCSSClass) {
    var selectorText = "." + groupCSSClass;
    return function(){
      var rules = controller.styleSheet.cssRules;
      for(var i=0; i<rules.length; i++) {
        // Find the correct rule in the stylesheet
        if(rules[i].selectorText == selectorText) {
          rules[i].style['fill'] = controller.extraStyles.normalColor;
          rules[i].style['rx'] = controller.extraStyles.normalSize;
          rules[i].style['ry'] = controller.extraStyles.normalSize;
        };
      };
    };
  };

  function makeKeyHandler(controller) {
    return function(event) {
      return controller.handleKey(event);
    };
  }

  ////////////////////////////////////////////////////////////
  // Controller class

  // Constructor
  function PoincareClickerController(ctrlsboxName,buttonboxName,poincboxName) {

    if (!(this instanceof PoincareClickerController)) {
      return new PoincareClickerController(ctrlsboxName,buttonboxName,poincboxName);
    }

    this.setupBoxes(ctrlsboxName,buttonboxName,poincboxName);

  };

  // Controller prototype
  PoincareClickerController.prototype = {
    /* UI objects for the controls */
    ctrlsbox: {},
    eslider: {},
    nptslider: {},
    buttonbox: {},
    clearButton: {},
    moreButton: {},
    undoButton: {},
    redoButton: {},
    zoomButton: {},

    /* UI objects for the Poincare section box */
    poincbox: {},
    basePoincOpts: {
      boundingbox: [-2, 2, 2, -2],
      keepaspectratio: true,
      axis: false,
      grid: true,
      // renderer: 'canvas', // SVG seems to work better than canvas
      // pan: {enabled: true},
      showNavigation: true,
      showCopyright:  false},
    stylesheet: {},

    /* Control variables for making Poincare sections */
    energy: -1.9,
    npt: 250,
    deltaT: 0.03,
    maxSteps: 100000,

    isZoom100: true,

    /* styles */
    basePointStyle: {size: 0.5, sizeUnit: 'screen',
                       strokeWidth: 0,
                       color: '#000000',
                       fixed: true,
                       showInfobox: false,
                       name: '', withLabel: false},
    extraStyles: {normalColor: "#000000", normalSize: "1px",
                    hiliteColor: "#00bb00", hiliteSize: "1.5px",
                    defaultRuleString: ""},

    /* Storage of points on Poincare section */
    groupCounter: 0,
    pointGroupList: new Array(),
    undonePointGroupList: new Array(),

    /* Public member functions */
    setupBoxes: {},

    setenergy: {},
    setnpt: {},

    handleTouch: {},
    handleKey: {},

    clearPoints: {},
    morePointsFromLast: {},
    popLastOrbit: {},
    restoreOrbit: {},
    initialZoom: {},

    updateButtonAbility: {},
  };

  // TODO Maybe setupBoxes should not be public
  PoincareClickerController.prototype.setupBoxes = function(ctrlsboxName,buttonboxName,poincboxName) {
    this.ctrlsbox = JXG.JSXGraph.initBoard(ctrlsboxName,
                                 {boundingbox:[0.,1.,1.,0.],
                                  axis:false,
                                  pan: {enabled: false},
                                  showNavigation: false,
                                  showCopyright:  false});
    this.ctrlsbox.suspendUpdate();

    this.eslider = this.ctrlsbox.create(
      'slider',
      [[0.05,.66],[0.7,.66],
       [-2.999,-1.909,-1.001]],
      {name: 'E', precision:3});

    this.nptslider = this.ctrlsbox.create(
      'slider',
      [[0.05,.33],[0.7,.33],
       [100,250,500]],
      {name: '# of points', snapWidth:1, precision:0});

    this.eslider.on('drag', makeESliderDrag(this));
    this.nptslider.on('drag', makeNPtSliderDrag(this));

    this.buttonbox = document.getElementById(buttonboxName);

    this.clearButton = this.buttonbox.querySelector('#clear');
    this.moreButton = this.buttonbox.querySelector('#more');
    this.undoButton = this.buttonbox.querySelector('#undo');
    this.redoButton = this.buttonbox.querySelector('#redo');
    this.zoomButton = this.buttonbox.querySelector('#zoom100');

    this.clearButton
      .addEventListener('click',
                        makeClearClickHandler(this));

    this.moreButton
      .addEventListener('click',
                        makeMoreClickHandler(this));

    this.undoButton
      .addEventListener('click',
                        makeUndoClickHandler(this));

    this.redoButton
      .addEventListener('click',
                        makeRedoClickHandler(this));

    this.zoomButton
      .addEventListener('click',
                        makeZoom100ClickHandler(this));

    this.poincbox = JXG.JSXGraph.initBoard(poincboxName, this.basePoincOpts);

    this.poincbox.suspendUpdate();

    var baxis = this.poincbox.create('axis', [[-4, 0], [4,0]],
        { name:'b',
          withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
          label: { position: 'rt',
                   offset: [-25, 20], }
        });
    var lbaxis = this.poincbox.create('axis', [[0, -4], [0,4]],
        { name:'l_b',
          withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
          label: { position: 'rt',
                   offset: [-20, -25], }
        });

    // Is this the right way?  Make them non-clickable
    baxis.hasPoint = function(){return false; };
    lbaxis.hasPoint = function(){return false; };

    // For some reason JSXGraph creates a point at the origin, which
    // will capture our clicks there... this finds the point and
    // unsets its knowledge of owning (0,0)
    for (var el in this.poincbox.objects) {
      if(JXG.isPoint(this.poincbox.objects[el])
         && this.poincbox.objects[el].coords.usrCoords[1] == 0
         && this.poincbox.objects[el].coords.usrCoords[2] == 0)
      {
        this.poincbox.objects[el].hasPoint = function(){return false; };
      };
    };

    // For selection-zooming, see example at
    // https://jsxgraph.org/docs/symbols/JXG.Board.html#startSelectionMode
    this.poincbox.on('stopselecting', makeZoomHandler(this));

    createSeparatrixCurves(this);

    this.poincbox.on('down', makePoincTouch(this));

    this.ctrlsbox.addChild(this.poincbox);

    // Add <style> element to the div containing the Poincare section
    // That is where we'll put the styles that control our point
    // groups for easy highlighting
    // See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
    var styleEl = document.createElement('style');
    var poincDiv = document.getElementById(poincboxName);
    poincDiv.appendChild(styleEl);
    this.styleSheet = styleEl.sheet;
    this.basePointStyle.color = this.extraStyles.normalColor;
    this.extraStyles.defaultRuleString =
      " { fill: " + this.extraStyles.normalColor
      + "; rx: " + this.extraStyles.normalSize
      + "; ry: " + this.extraStyles.normalSize
      + "; }";

    // Begin drawing
    this.poincbox.unsuspendUpdate();
    this.ctrlsbox.unsuspendUpdate();

    // Use triggers to synchronize internal state
    makeNPtSliderDrag(this)();
    makeESliderDrag(this)();

    // Add keyboard handler
    document.body.addEventListener("keydown", makeKeyHandler(this));
  };

  PoincareClickerController.prototype.handleTouch = function(b, lb, ptExists, thePoint) {
    if (!ptExists || !(thePoint.visProp.visible)) {
      if (insideSep(this.energy, b, lb)) {
        // console.log("("+b+","+lb+")=>");
        // console.log(initConds(this.energy, b, lb));
        var newPoincPoints = reapPoincarePoints(this.energy, this.npt, b, lb, this.deltaT, this.maxSteps);
        // console.log(newPoincPoints);

        var groupId = this.groupCounter;
        this.groupCounter++;
        var groupCSSClass = "pointGroup"+groupId;
        // TODO Put defaults somewhere
        this.styleSheet.insertRule("."+groupCSSClass+ this.extraStyles.defaultRuleString);
        var overHandler = makePointOverHandler(this, groupCSSClass);
        var outHandler = makePointOutHandler(this, groupCSSClass);

        var newPointGroup = new Array(newPoincPoints.length);

        this.poincbox.suspendUpdate();
        for (var i = 0; i < newPoincPoints.length; i++) {
          newPointGroup[i] = this.poincbox.create('point', newPoincPoints[i],
                                                  this.basePointStyle);
          // newPointGroup[i].hasPoint = function(){return false; };
          // newPointGroup[i].rendNode.addEventListener('mouseenter', overHandler);
          // newPointGroup[i].rendNode.addEventListener('touchstart', overHandler);
          // newPointGroup[i].rendNode.addEventListener('mouseleave', outHandler);
          // newPointGroup[i].rendNode.addEventListener('touchend', outHandler);
          newPointGroup[i].on('over', overHandler);
          newPointGroup[i].on('out', outHandler);
          newPointGroup[i].groupId = groupId;
          newPointGroup[i].rendNode.classList.add(groupCSSClass);
        };
        this.poincbox.unsuspendUpdate();

        this.pointGroupList.push(newPointGroup);
      }
    } else {
      console.log("point exists and is visible");

      // TODO: Add points to this orbit?

    };

    // QUESTION: Should we clear the 'Redo' stack?

    this.updateButtonAbility();

  };

  PoincareClickerController.prototype.handleKey = function(event) {
    if (event.repeat) // Ignore repeated keys
      return;
    switch (event.key.toLowerCase()) {
    case "z":
      this.popLastOrbit();
      break;
    case "x":
      this.restoreOrbit();
      break;
    case "a":
    case "m":
      this.morePointsFromLast();
      break;
    case "c":
      this.clearPoints();
      break;
    case "0":
      this.initialZoom();
      break;
    };
  };

  PoincareClickerController.prototype.clearPoints = function() {

    this.poincbox.suspendUpdate();

    for (var i = 0; i < this.pointGroupList.length; i++) {
      var thisGroup = this.pointGroupList[i];
      for (var j = 0; j < thisGroup.length; j++) {
        this.poincbox.removeObject(thisGroup[j]);
      };
    };
    for (var i = 0; i < this.undonePointGroupList.length; i++) {
      var thisGroup = this.undonePointGroupList[i];
      for (var j = 0; j < thisGroup.length; j++) {
        this.poincbox.removeObject(thisGroup[j]);
      };
    };

    this.poincbox.unsuspendUpdate();

    this.pointGroupList = new Array();
    this.undonePointGroupList = new Array();

    this.updateButtonAbility();
  };

  PoincareClickerController.prototype.morePointsFromLast = function() {
    if (this.pointGroupList.length > 0) {
      var lastGroup = this.pointGroupList[this.pointGroupList.length - 1];
      if (lastGroup.length > 0) {
        var lastPoint = lastGroup[lastGroup.length - 1];
        var b = lastPoint.coords.usrCoords[1],
            lb = lastPoint.coords.usrCoords[2];

        var groupId = lastPoint.groupId;
        var groupCSSClass = "pointGroup"+groupId;
        var overHandler = makePointOverHandler(this, groupCSSClass);
        var outHandler = makePointOutHandler(this, groupCSSClass);

        var newPoincPoints = reapPoincarePoints(this.energy, this.npt, b, lb, this.deltaT, this.maxSteps);

        this.poincbox.suspendUpdate();
        for (var i = 0; i < newPoincPoints.length; i++) {
          var p = this.poincbox.create('point', newPoincPoints[i],
                                       this.basePointStyle);
          // p.hasPoint = function(){return false; };
          // p.rendNode.addEventListener('mouseenter', overHandler);
          // p.rendNode.addEventListener('touchstart', overHandler);
          // p.rendNode.addEventListener('mouseleave', outHandler);
          // p.rendNode.addEventListener('touchend', outHandler);
          p.on('over', overHandler);
          p.on('out', outHandler);
          p.groupId = groupId;
          p.rendNode.classList.add(groupCSSClass);
          // QUESTION: Is it better to resize the array instead of
          // constantly pushing?
          lastGroup.push(p);
        };
        this.poincbox.unsuspendUpdate();

      }
    }
  };

  PoincareClickerController.prototype.popLastOrbit = function() {
    if (this.pointGroupList.length == 0) return;

    var lastGroup = this.pointGroupList.pop();

    this.poincbox.suspendUpdate();
    for (var i = 0; i < lastGroup.length; i++) {
      lastGroup[i].hideElement();
    };

    this.undonePointGroupList.push(lastGroup);

    this.poincbox.unsuspendUpdate();

    this.updateButtonAbility();

  };

  PoincareClickerController.prototype.restoreOrbit = function() {
    if (this.undonePointGroupList.length == 0) return;

    var savedPoints = this.undonePointGroupList.pop();

    this.poincbox.suspendUpdate();
    for (var i = 0; i < savedPoints.length; i++) {
      savedPoints[i].showElement();
    };

    this.pointGroupList.push(savedPoints);

    this.poincbox.unsuspendUpdate();

    this.updateButtonAbility();
  };

  PoincareClickerController.prototype.initialZoom = function() {
    this.poincbox.suspendUpdate();
    this.poincbox.setBoundingBox([ -1.05*bMax(this.energy), 1.05*lbMax(this.energy),
                                   1.05*bMax(this.energy), -1.05*lbMax(this.energy) ], false);
    this.poincbox.unsuspendUpdate();
    // This seems to be necessary to update what's shown on the axes
    this.poincbox.fullUpdate();

    this.isZoom100 = true;
    this.updateButtonAbility();
  }

  PoincareClickerController.prototype.updateButtonAbility = function() {
    this.undoButton.disabled = !(this.pointGroupList.length > 0);
    this.redoButton.disabled = !(this.undonePointGroupList.length > 0);
    this.zoomButton.disabled = this.isZoom100;
  };

  PoincareClickerController.prototype.setenergy = function(energy) {
    this.energy = energy;

    this.clearPoints();

    this.initialZoom();
  };

  PoincareClickerController.prototype.setnpt = function(npt) {
    this.npt = npt;
  };

  /* Add to global namespace */
  root['PoincareClickerController'] = PoincareClickerController;

  ////////////////////////////////////////////////////////////

  /* For tour using intro.js */
  root['startIntro'] = function(){
    var intro = introJs();

    intro.setOptions({
      steps: [
        {
          element: '#poincbox',
          intro: "This is where the Poincaré section lives.  Clicking inside the box will add points from a phase space orbit."
        },
        {
          element: '#ctrlsbox',
          intro: "Here is where you set the energy of the system, and how many points are added on each click.  Changing the energy will clear all points (which can take a while).",
        },
        {
          element: '#buttonbox',
          intro: "Use 'Extend last orbit' to add n more points to the most recent orbit.",
        },
        {
          element: '#poincbox',
          intro: "When you hover over a point, all points from that orbit will be highlighted.  You can Shift-drag to pan, and Ctrl-drag a region to zoom in for more detail.",
        },
      ]
    });

    intro.start();
  };


})(this);
