'use strict';

Polymer('woot-map', {
  basemap: 'streets',
  webMapId: '',
  extent: '-117.03089904784932, 34.109989664938375, -116.7256851196271, 34.32518284370753',
  //center: [-99.076, 39.132],
  //zoom: 4,
  map: null,
  ready: function() {
    var me = this;
    require(['esri/map', 'esri/arcgis/utils', 'esri/geometry/Extent', "esri/renderers/SimpleRenderer", "esri/layers/FeatureLayer", 'dojo/domReady!'], 
      function(Map, arcgisUtils, Extent, SimpleRenderer, FeatureLayer) {
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
        var vrboLayer = new FeatureLayer( "http://koop.dc.esri.com:8080/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0", {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });

        var simpleJson = {
            "type": "simple",
            "symbol": {
                "size": 6,
                "type": "esriSMS",
                "style": "esriSMSCircle",
                "color": [
                    37,
                    52,
                    148,
                    255
                ],
                "outline": {
                    "color": [
                        255,
                        255,
                        255,
                        255
                    ],
                    "style": "esriSLSSolid",
                    "type": "esriSLS",
                    "width": 0
                }
            }
        }

        var rend = new SimpleRenderer(simpleJson);
        vrboLayer.setRenderer( rend );
        me.map.addLayer(vrboLayer);

        var lineJson = {
          "type": "simple",
          "symbol": {
            "color": [
              247,
              150,
              70,
              204
            ],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          }
        }

        var trailsLayer = new FeatureLayer( "http://services1.arcgis.com/ohIVh2op2jYT7sku/arcgis/rest/services/SouthShoreTrails/FeatureServer/0", {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });

        var trailStyle = new SimpleRenderer(lineJson);
        trailsLayer.setRenderer( trailStyle );
        me.map.addLayer( trailsLayer );

        var trailsLayer2 = new FeatureLayer( "http://services1.arcgis.com/ohIVh2op2jYT7sku/arcgis/rest/services/ValleyFloor_Trails/FeatureServer/0", {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });

        trailsLayer2.setRenderer( trailStyle );
        me.map.addLayer( trailsLayer2 );

        //raise event to outside world
        me.map.on('extent-change', function () { me.fire('extent-change'); });
        window.map = me.map;
      }
    });
  },
  showMessage: function (msg) {
    //public method!
    alert(msg);
  },
  changeFill: function(color) {
    console.log('color', color);
  },
  changeSize: function(size) {
    console.log('size', size)
  }
});
