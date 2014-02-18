
//Constructor
var WootController = function ($) {
  document.querySelector('stylist-element').addEventListener('color-changed', function(e) {
    document.querySelector('woot-map').changeFill( e.detail.msg );
  });

  document.querySelector('stylist-element').addEventListener('size-changed', function(e) {
    document.querySelector('woot-map').changeSize( e.detail.msg );
  });
};

//Public methods
WootController.prototype.debug = function (msg) {
  console.debug(msg);
}