'use strict';


//Constructor
var WootController = function ($) {
  //Private Variables
  var self = this;
  var mapEl = document.querySelector('woot-map');
  var styleListEl = document.querySelector('stylist-element');
  var detailsEl = document.querySelector('woot-details');


  mapEl.addEventListener('vrbo:click', onVrboLayerClicked);
  mapEl.addEventListener('trail:click', onTrailLayerClicked);
  mapEl.addEventListener('buffer:points', onBufferPoints);

  styleListEl.addEventListener('color-changed', onStyleListColorChanged);
  styleListEl.addEventListener('size-changed', onStyleListSizeChanged);
  styleListEl.addEventListener('graduate-symbols', onStyleListGraduateSymbol);
  
  mapEl.addEventListener('layer-added', onLayerAdded);


  //Private Methods
  function onVrboLayerClicked (e) {
    detailsEl.update('vrbo', e.detail.graphic.attributes);
  }

  function onTrailLayerClicked (e) {
    detailsEl.update('trail', e.detail.graphic.attributes);
  }

  function onBufferPoints ( e ) {
    self.debug('inside points')
    self.debug(e.detail);
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

  function onLayerAdded (layer) {
    if ( layer.impl.detail.layer.id === 'graphicsLayer3' ) {
      var fields = layer.impl.detail.layer.fields;
      for(var i = 0; i<fields.length;i++) {
        if ( fields[ i ].type === "esriFieldTypeInteger" ) {
          var option = document.createElement('option');
          option.innerHTML = fields[i].alias;
          document.getElementById('graduate-symbol-list').appendChild(option);
        }
      }
    }
    //mapEl.changeSize( e.detail.msg );
  }
};


//Public Methods
WootController.prototype.debug = function (msg) {
  console.debug(msg);
};