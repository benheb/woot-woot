
//Constructor
var WootController = function ($) {
  //Private Variables
  var mapEl = document.querySelector('woot-map');
  var styleListEl = document.querySelector('stylist-element');


  //document.querySelector('woot-map').addEventListener('', function () {});

  styleListEl.addEventListener('color-changed', onStyleListColorChanged);
  styleListEl.addEventListener('size-changed', onStyleListSizeChanged);


  //Private Methods
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