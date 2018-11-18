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

  /* This emits the click handler for the Poincare section.
   * Integration is triggered from this click handler.
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
      var ptExists = false, i, coords;

      if (e[JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        i = 0;
      }
      coords = getMouseCoords(e, i);
      var b = coords.usrCoords[1];
      var lb = coords.usrCoords[2];

      for (var el in board.objects) {
        if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
          ptExists = true;
          break;
        }
      }

      if (!ptExists) {
        if (insideSep(controller.energy, b, lb)) {
          console.log("("+b+","+lb+")=>");
          console.log(initConds(controller.energy, b, lb));
        }
      };
    };
  };

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
    // Is this the right way?
    sepA.hasPoint = function(){return false; };
    sepB.hasPoint = function(){return false; };
  };
  
  function PoincareClickerController(ctrlsboxName,poincboxName) {

    if (!(this instanceof PoincareClickerController)) {
      return new PoincareClickerController(ctrlsboxName,poincboxName);
    }

    this.setupBoxes(ctrlsboxName,poincboxName);

  };

  PoincareClickerController.prototype = {
    /* UI objects for the controls box */
    'ctrlsbox': {},
    'eslider': {},
    'nptslider': {},

    /* UI objects for the Poincare section box */
    'poincbox': {},
    'baxis': {},
    'lbaxis': {},

    /* State variables for making Poincare sections */
    'energy': -1.9,
    'npt': 100,

    /* Member functions */
    'setupBoxes': function(ctrlsboxName,poincboxName) {
      this.ctrlsbox = JXG.JSXGraph.initBoard(ctrlsboxName,
                                 {boundingbox:[0.,1.,1.,0.],
                                  axis:false,
                                  pan: {enabled: false},
                                  showNavigation: false,
                                  showCopyright:  false});
      this.ctrlsbox.suspendUpdate();

      this.eslider = this.ctrlsbox.create(
        'slider',
        [[0.05,.75],[0.7,.75],
         [-2.999,-1.909,-1.001]],
        {name: 'E', precision:3});

      this.nptslider = this.ctrlsbox.create(
        'slider',
        [[0.05,.5],[0.7,.5],
         [100,100,500]],
        {name: '# of points', snapWidth:1, precision:0});

      this.eslider.on('drag', makeESliderDrag(this));
      this.nptslider.on('drag', makeNPtSliderDrag(this));

      var baseOpts = {
        boundingbox: [-2, 2, 2, -2],
        keepaspectratio: true,
        axis: false,
        grid: true,
        pan: {enabled: false},
        showNavigation: true,
        showCopyright:  false};

      this.poincbox = JXG.JSXGraph.initBoard(poincboxName, baseOpts);

      this.poincbox.suspendUpdate();

      this.baxis = this.poincbox.create('axis', [[-2, 0], [2,0]],
        { name:'b',
          withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
          label: { position: 'rt',
                   offset: [-25, 20], }
        });
      this.lbaxis = this.poincbox.create('axis', [[0, 0], [0,1]],
        { name:'l_b',
          withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
          label: { position: 'rt',
                   offset: [20, 0], }
        });
      // Is this the right way?
      this.baxis.hasPoint = function(){return false; };
      this.lbaxis.hasPoint = function(){return false; };

      // For selection-zooming, see example at
      // https://jsxgraph.org/docs/symbols/JXG.Board.html#startSelectionMode
      this.poincbox.on('stopselecting', (function(controller) {
        return function(){
          var box = controller.poincbox.stopSelectionMode();
          // bbox has the coordinates of the selectionr rectangle.
          // Attention: box[i].usrCoords have the form [1, x, y], i.e.
          // are homogeneous coordinates.
          var bbox = box[0].usrCoords.slice(1).concat(box[1].usrCoords.slice(1));
          // Set a new bounding box
          controller.poincbox.setBoundingBox(bbox, false);
        }
      })(this));

      createSeparatrixCurves(this);
      
      this.poincbox.on('down',
                       makePoincTouch(this));
      
      this.ctrlsbox.addChild(this.poincbox);

      this.poincbox.unsuspendUpdate();
      this.ctrlsbox.unsuspendUpdate();

      // Use triggers to synchronize internal state
      makeNPtSliderDrag(this)();
      makeESliderDrag(this)();

    },

    'setenergy': function(energy) {
      this.energy = energy;
      this.poincbox.suspendUpdate();
      this.poincbox.setBoundingBox([ -1.05*bMax(energy), 1.05*lbMax(energy),
                                     1.05*bMax(energy), -1.05*lbMax(energy) ], false);
      this.poincbox.unsuspendUpdate();
      // This seems to be necessary to update what's shown on the axes
      this.poincbox.fullUpdate();
    },

    'setnpt': function(npt) {
      this.npt = npt;
    },
  };

  root['PoincareClickerController'] = PoincareClickerController;

})(this);
