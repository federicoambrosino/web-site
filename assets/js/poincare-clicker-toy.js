(function(root) {

  "use strict";

  function PoincareClickerController(poincboxName) {

    if (!(this instanceof PoincareClickerController)) {
      return new PoincareClickerController(poincboxName);
    }

    this.setupBoxes(poincboxName);

  };

  PoincareClickerController.prototype = {
    'poincbox': {},
    'setupBoxes': function(poincboxName) {
      var baseOpts = {
        boundingbox: [-2, 2, 2, -2],
        keepaspectratio: true,
        axis: false,
        grid: true,
        pan: {enabled: false},
        showNavigation: true,
        showCopyright:  false};

      this.poincbox  = JXG.JSXGraph.initBoard(poincboxName, baseOpts);

      this.poincbox.create('axis', [[0, 0], [1,0]],
        { name:'Re[z]',
			    withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
			    label: { position: 'rt',
					         offset: [-25, 20], }
			  });
      this.poincbox.create('axis', [[0, 0], [0,1]],
        { name:'Im[z]',
			    withLabel: true,
          ticks: {minorTicks:1, majorHeight:10, minorHeight:4},
			    label: { position: 'rt',
					         offset: [20, 0], }
			  });

      // This is a dumb hack to fix the label relative to the screen instead of axes.
      // Did I mention how much I hate JS's scoping?
      this.poincbox.create(
        'text',
        [(function (box) { return function(){ return box.getBoundingBox()[0];}; })(this.poincbox),
         (function (box) { return function(){ return box.getBoundingBox()[1];}; })(this.poincbox),
         'Roots'],
        {anchorX: 'left', anchorY: 'top',
         cssClass: 'myBoxTitle', highlightCssClass: 'myBoxTitle',
         fontSize: 14});
    },
  };

  root['PoincareClickerController'] = PoincareClickerController;

})(this);
