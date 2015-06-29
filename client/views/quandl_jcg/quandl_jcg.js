Template.quandlJcg.created = function () {
  //
};

Template.quandlJcg.helpers({
  
  myHelper: function () {
    //
  }

});

Template.quandlJcg.rendered = function () {
  var Engine = famous.core.Engine;
  var Surface = famous.core.Surface;
  var View = famous.core.View;
  var Entity = famous.core.Entity;
  var Modifier = famous.core.Modifier;
  var Transform = famous.core.Transform;
  var Transitionable = famous.transitions.Transitionable;
  var TransitionableTransform = famous.transitions.TransitionableTransform;
  var Easing = famous.transitions.Easing;
  var Scrollview = famous.views.Scrollview;

  var NUM_SURFACES = 24;
  var MARGIN_TOP = 50;
  var MIN_MARGIN_SIDE = 50;
  var COLUMN_GUTTER = 40;
  var ROW_GUTTER = 20;
  var ITEM_SIZE = [150, 100];
  var TRANSITION = {
    duration: 500,
    curve: Easing.inOutElastic
  };

  var mainContext = Engine.createContext();

  function FlexGrid() {
    View.apply(this, arguments);

    this._modifiers = [];
    this._states = [];
    this._height = 0;

    this.id = Entity.register(this);
  }

  FlexGrid.prototype = Object.create(View.prototype);
  FlexGrid.prototype.constructor = FlexGrid;

  FlexGrid.DEFAULT_OPTIONS = {
    marginTop: undefined,
    marginSide: undefined,
    gutterCol: undefined,
    gutterRow: undefined,
    itemSize: undefined,
    transition: { curve: Easing.inOutElastic, duration: 500 }
  };

  function _calcSpacing(width) {
    var itemWidth = this.options.itemSize[0];
    var gutterCol = this.options.gutterCol;
    var ySpacing = itemWidth + gutterCol;
    var margin = this.options.marginSide;
    var numCols = Math.floor((width - 2 * margin + gutterCol) / ySpacing);
    margin = (width - numCols * ySpacing + gutterCol)/2;
    return {
      numCols: numCols,
      marginSide: margin,
      ySpacing: ySpacing
    }
  }

  function _calcPositions(spacing) {
    var positions = [];

    var col = 0;
    var row = 0;
    var xPos;
    var yPos;

    for (var i = 0; i < this._items.length; i++) {
      xPos = spacing.marginSide + col * spacing.ySpacing;
      yPos = this.options.marginTop + row * (this.options.itemSize[1] + this.options.gutterRow);
      positions.push([xPos, yPos, 0]);

      col++
      if (col === spacing.numCols) {
        row++;
        col = 0;
      }
    }

    this._height = yPos + this.options.itemSize[1] + this.options.marginTop;

    return positions;
  }

  function _createModifier(index, position, size) {
    var transitionItem = {
      transform: new TransitionableTransform(Transform.translate.apply(null, position)),
      size: new Transitionable((size || this.options.itemSize))
    }

    var modifier = new Modifier(transitionItem);

    this._states[index] = transitionItem;
    this._modifiers[index] = modifier;
  }

  function _animateModifier(index, position, size) {
    var transformTransitionable = this._states[index].transform;
    var sizeTransitionable = this._states[index].size;
    transformTransitionable.halt();
    sizeTransitionable.halt();
    transformTransitionable.setTranslate(position, this.options.transition);
    sizeTransitionable.set(size, this.options.transition);
  }

  FlexGrid.prototype.sequenceFrom = function(items) {
    this._items = items;
  };

  FlexGrid.prototype.render = function() {
    return this.id;
  };

  FlexGrid.prototype.getSize = function() {
    if (!this._height) return;
    return [this._cachedWidth, this._height];
  };

  FlexGrid.prototype.commit = function(context) {
    var width = context.size[0];

    var specs = [];

    if (this._cachedWidth !== width) {
      var spacing = _calcSpacing.call(this, width);
      var size = this.options.itemSize;
      if (spacing.numCols < 2) {
        spacing.numCols = 1;
        spacing.marginSide = 0;
        size = [width, size[1]];
      }
      var positions = _calcPositions.call(this, spacing);

      for (var i = 0; i < this._items.length; i++) {
        if (this._modifiers[i] === undefined) {
          _createModifier.call(this, i, positions[i], size);
        }
        else {
          _animateModifier.call(this, i, positions[i], size);
        }
      }

      this._cachedWidth = width;
    }

    for (var i = 0; i < this._modifiers.length; i++) {
      var spec = this._modifiers[i].modify({
        target: this._items[i].render()
      });

      specs.push(spec);
    }

    return specs;
  };

  var flexGrid = new FlexGrid({
    marginTop: MARGIN_TOP,
    marginSide: MIN_MARGIN_SIDE,
    gutterCol: COLUMN_GUTTER,
    gutterRow: ROW_GUTTER,
    itemSize: ITEM_SIZE,
    transition: TRANSITION
  });

  var scrollview = new Scrollview();
  Engine.pipe(scrollview);

  mainContext.add(scrollview);
  scrollview.sequenceFrom([flexGrid]);

  var surfaces = [];
  var algoCards = this.data.algorithms.fetch()
  for (var i = 0; i < algoCards.length; i++) {
    var surface = new Surface({
      content: '<h2>' + algoCards[i].title + '</h2>' + 
        '<div style="overflow:scroll">' + algoCards[i].body + '</div>',
      properties: {
        backgroundColor: 'hsl(' + (i * 360 / NUM_SURFACES) + ', 100%, 50%)'
      }
    });
    surface.on('dragenter', function(evt) {
      console.log('dragenter', evt);
      evt.preventDefault();
      return false;
    });

    surface.on('dragleave', function(evt) {
      console.log('dragleave', evt);
      surface.setProperties({
        border: 'none'
      });
      evt.preventDefault();
      return false;
    });

    surface.on('dragover', function(evt) {
      console.log('dragover', evt);
      surface.setProperties({
        border: '4px dashed black'
      });
      evt.preventDefault();
      return false;
    });

    surface.on('drop', function(evt) {
      console.log('drop', evt);

      evt.preventDefault();
      evt.stopPropagation();

      surface.setProperties({
        border: '4px solid red'
      });
      // files = evt.dataTransfer.files;
      // console.log(files);
    });
    surfaces.push(surface);
  }

  flexGrid.sequenceFrom(surfaces);
};

Template.quandlJcg.events({

  'click': function(e, instance){

  }

});




