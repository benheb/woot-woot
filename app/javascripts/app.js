'use strict';


//Constructor
var WootController = function () {
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
  //var thing = onBufferPoints.bind;
  mapEl.addEventListener('buffer:points', onBufferPoints);

  styleListEl.addEventListener('color-changed', onStyleListColorChanged);
  styleListEl.addEventListener('size-changed', onStyleListSizeChanged);
  styleListEl.addEventListener('graduate-symbols', onStyleListGraduateSymbol);

  detailsEl.addEventListener('select:vrbo', onSelectVrbo);
  detailsEl.addEventListener('deselect:vrbo', onDeselectVrbo);

  scatterEl.addEventListener('scatter-selected', onScatterSelect);
  scatterEl.addEventListener('scatter-exit', onScatterExit);
  
  mapEl.addEventListener('layer-added', onLayerAdded);

  function onScatterSelect(e){ 
    detailsEl.updateVrbo(e.detail.msg);
    mapEl.highlightVrbo(e.detail.msg.id);
  }

  function onScatterExit(e){ 
    var data = Woot.rawBufferData;
    detailsEl.updateTrail(null, data);
    mapEl.highlightVrbo();
  }

  //Private Methods
  function onVrboLayerClicked (e) {
    detailsEl.updateVrbo(e.detail.graphic.attributes);
  }

  function onTrailLayerClicked (e) {
    detailsEl.updateTrail(e.detail.graphic.attributes);
  }

  function onBufferPoints ( e ) {
    //this is the woot-map
    Woot.rawBufferData = e.detail;
    _updateCharts();

  }

  function _updateCharts( attr ){
    var data = Woot.rawBufferData;
    detailsEl.updateTrail(null, data);

    var olddata = DataMuncher.aggregateProperties(data);

    bathroomsChartEl.values = [ olddata.Bathrooms.values ];
    bathroomsChartEl.labels = olddata.Bathrooms.keys;
    bathroomsChartEl._update();

    scatterEl.update(data, attr);
  }

  function onStyleListColorChanged (e) {
    mapEl.changeFill( e.detail.msg );
  }

  function onStyleListSizeChanged (e) {
    mapEl.changeSize( e.detail.msg );
  }

  function onStyleListGraduateSymbol (e) {
    mapEl.graduateSymbols( e.detail.msg );
    _updateCharts( e.detail.msg );
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
