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

  function initConds(energy, b, lb) {
    // make sure we can get physical init conds
    var d = discrim(energy, b, lb);
    if (d < 0.)
      throw 'initConds: b and lb are out of bounds for this energy';
    return [0., // a
            lb + lb*Math.cos(b) + Math.sqrt( d ), // la
            b, lb];
  };

  function ODERHS(t, xs) {
    var a = xs[0], la = xs[1], b = xs[2], lb = xs[3];

    TODO;

    return [adot, ladot, bdot, lbdot];
  };

  function makeESliderDrag(controller) {
    return function() {
      controller.setenergy(controller.eslider.Value());
    };
  };

  function makeNPtSliderDrag(controller) {
    return function() {
      controller.setnpt(controller.nptslider.Value());
    };
  };

  function PoincareClickerController(ctrlsboxName,poincboxName) {

    if (!(this instanceof PoincareClickerController)) {
      return new PoincareClickerController(ctrlsboxName,poincboxName);
    }

    this.setupBoxes(ctrlsboxName,poincboxName);

  };

  PoincareClickerController.prototype = {
    'poincbox': {},
    'baxis': {},
    'lbaxis': {},

    'ctrlsbox': {},
    'eslider': {},
    'nptslider': {},

    'energy': -1.9,
    'npt': 100,

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
         [-2.999,-1.9,-1.001]],
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

      this.poincbox.create('curve',
                           /* q runs from 0 to 1, we map it to the correct range of b */
                           [(function(controller){
                             return function(q){
                               return bMax(controller.energy)*(-1. + 2. * q); }})(this),
                            (function(controller){
                              return function(q){
                                var b = bMax(controller.energy)*(-1. + 2. * q);
                                var lb = lbSeparatrix(controller.energy, b);
                                return lb;}})(this), 0., 1.]);
      this.poincbox.create('curve',
                           /* q runs from 0 to 1, we map it to the correct range of b */
                           [(function(controller){
                             return function(q){
                               return bMax(controller.energy)*(-1. + 2. * q); }})(this),
                            (function(controller){
                              return function(q){
                                var b = bMax(controller.energy)*(-1. + 2. * q);
                                var lb = lbSeparatrix(controller.energy, b);
                                return -lb;}})(this), 0., 1.]);

      this.ctrlsbox.addChild(this.poincbox);

      this.poincbox.unsuspendUpdate();
      this.ctrlsbox.unsuspendUpdate();

    },

    'setenergy': function(energy) {
      this.energy = energy;
      this.poincbox.suspendUpdate();
      this.poincbox.setBoundingBox([ -1.05*bMax(energy), 1.05*lbMax(energy),
                                     1.05*bMax(energy), -1.05*lbMax(energy) ], false);
      this.poincbox.unsuspendUpdate();
      // This seems to be necessary to update what's shown on the axes
      this.poincbox.zoom100();
    },

    'setnpt': function(npt) {
      this.npt = npt;
    },
  };

  root['PoincareClickerController'] = PoincareClickerController;

})(this);
