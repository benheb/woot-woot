document.addEventListener('WebComponentsReady', function() {
  document.querySelector('stylist-element').addEventListener('color-changed', function(e) {
    $('woot-map').changeFill( e.detail.msg );
    //map.getLayer(map.graphicsLayerIds[0]).renderer.symbol.color = new dojo.Color(  );
    //map.getLayer(map.graphicsLayerIds[0]).redraw();
  });

  document.querySelector('stylist-element').addEventListener('size-changed', function(e) {
    $('woot-map').changeSize( e.detail.msg );
    //map.getLayer(map.graphicsLayerIds[0]).renderer.symbol.size = e.detail.msg;
    //map.getLayer(map.graphicsLayerIds[0]).redraw();
  });

  document.querySelector('stylist-element').addEventListener('style-changed', function(e) {
    //var style = e.detail.msg;
    //document.getElementById("style-output").innerHTML = JSON.stringify(style, null, 4);
  });
});