
//Constructor
var WootController = function ($) {
  //Private Variables
  var self = this;
  var mapEl = document.querySelector('woot-map');
  var styleListEl = document.querySelector('stylist-element');


  mapEl.addEventListener('vrbo:click', onVrboLayerClicked);
  mapEl.addEventListener('trail:click', onTrailLayerClicked);

  styleListEl.addEventListener('color-changed', onStyleListColorChanged);
  styleListEl.addEventListener('size-changed', onStyleListSizeChanged);


  //Private Methods
  function onVrboLayerClicked (e) {
    self.debug('onVrboLayerClicked is not implemented!');
  }

  function onTrailLayerClicked (e) {
    self.debug('onTrailLayerClicked is not implemented!');
  }

  function onStyleListColorChanged (e) {
    mapEl.changeFill( e.detail.msg );
  }

  function onStyleListSizeChanged (e) {
    mapEl.changeSize( e.detail.msg );
  }
};


//Public Methods
WootController.prototype.debug = function (msg) {
  console.debug(msg);
}
