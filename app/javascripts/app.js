'use strict';


//Constructor
var WootController = function ($) {
  //Private Variables
  var self = this;
  var mapEl = document.querySelector('woot-map');
  var styleListEl = document.querySelector('stylist-element');
  var detailsEl = document.querySelector('woot-details');
  var bathroomsChartEl = document.querySelector('#bathrooms');
  var bedroomsChartEl = document.querySelector('#bedrooms');
  var sleepsChartEl = document.querySelector('#sleeps');
  var scatterEl = document.querySelector('woot-scatter-chart');


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
    var olddata = DataMuncher.aggregateProperties(e.detail);
    
    // //pass bedrooms to pie chart
    // //pieChartEl.values = data.Bedrooms.values;
    // bedroomsChartEl.values = [ data.Bedrooms.values ];
    // bedroomsChartEl.labels = data.Bedrooms.keys;
    // bedroomsChartEl._update();

    bathroomsChartEl.values = [ olddata.Bathrooms.values ];
    bathroomsChartEl.labels = olddata.Bathrooms.keys;
    bathroomsChartEl._update();

    // sleepsChartEl.values = [ data.Sleeps.values ];
    // sleepsChartEl.labels = data.Sleeps.keys;
    // sleepsChartEl._update();
    // 
    //var data = DataMuncher.scatterData(e.detail);
    scatterEl.update(e.detail);

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
    mapEl.highlightVrbo(e.detail);
  }

  function onDeselectVrbo () {
    mapEl.highlightVrbo();
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
