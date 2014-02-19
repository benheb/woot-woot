'use strict';


//Constructor
var WootController = function ($) {
  //Private Variables
  var self = this;
  var mapEl = document.querySelector('woot-map');
  var styleListEl = document.querySelector('stylist-element');
  var detailsEl = document.querySelector('woot-details');
  var lineChartEl = document.querySelector('chart-line');
  var pieChartEl = document.querySelector('chart-pie');


  mapEl.addEventListener('vrbo:click', onVrboLayerClicked);
  mapEl.addEventListener('trail:click', onTrailLayerClicked);
  mapEl.addEventListener('buffer:points', onBufferPoints);

  styleListEl.addEventListener('color-changed', onStyleListColorChanged);
  styleListEl.addEventListener('size-changed', onStyleListSizeChanged);
  styleListEl.addEventListener('graduate-symbols', onStyleListGraduateSymbol);

  detailsEl.addEventListener('select:vrbo', onSelectVrbo);
  detailsEl.addEventListener('deselect:vrbo', onDeselectVrbo);
  
  mapEl.addEventListener('layer-added', onLayerAdded);

  //Private Methods
  function onVrboLayerClicked (e) {
    detailsEl.updateVrbo(e.detail.graphic.attributes);
  }

  function onTrailLayerClicked (e) {
    detailsEl.updateTrail(e.detail.graphic.attributes);
  }

  function onBufferPoints ( e ) {
    detailsEl.updateTrail(null, e.detail);

    //self.debug('inside points')
    //self.debug(e.detail);
    //console.log(JSON.stringify(e.detail));
    var data = DataMuncher.aggregateProperties(e.detail);
    
    //pass bedrooms to pie chart
    //pieChartEl.values = data.Bedrooms.values;
    lineChartEl.values = [ data.Bedrooms.values ];
    lineChartEl.labels = data.Bedrooms.keys;
    lineChartEl._update();

  }

  function onStyleListColorChanged (e) {
    mapEl.changeFill( e.detail.msg );
  }

  function onStyleListSizeChanged (e) {
    mapEl.changeSize( e.detail.msg );
  }

  function onStyleListGraduateSymbol (e) {
    mapEl.graduateSymbols( e.detail.msg );
  }

  function onSelectVrbo (e) {
    mapEl.selectVrbo(e.detail);
  }

  function onDeselectVrbo () {
    mapEl.deselectVrbo();
  }

  function onLayerAdded (layer) {
    if ( layer.impl.detail.layer.id === 'graphicsLayer3' ) {
      styleListEl.addLayer(layer);
    }
  }
};


//Public Methods
WootController.prototype.debug = function (msg) {
  console.debug(msg);
};
