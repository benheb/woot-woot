'use strict';

Polymer('woot-map', {
  basemap: 'streets',
  webMapId: '',
  extent: '-125,25,-65,50',
  map: null,
  ready: function() {
    var me = this;
    require(['esri/map', 'esri/arcgis/utils', 'esri/geometry/Extent', 'dojo/domReady!'], function(Map, arcgisUtils, Extent, SpatialReference) {
      var mapOptions= {
        basemap: me.basemap
      };

      if (me.extent) {
        var ext = me.extent.split(',');
        mapOptions.extent = new Extent(+ext[0], +ext[1], +ext[2], +ext[3]);
      }

      if (me.webMapId) {
        arcgisUtils.createMap(me.webMapId, me.$.map, {mapOptions: mapOptions}).then(function(response){
          me.map = response.map;
          me.map.on('extent-change', function () { me.fire('extent-change'); });
        });
      } else {
        me.map = new Map(me.$.map, mapOptions);
        //raise event to outside world
        me.map.on('extent-change', function () { me.fire('extent-change'); });
      }
    });
  },
  showMessage: function (msg) {
    //public method!
    alert(msg);
  }
});