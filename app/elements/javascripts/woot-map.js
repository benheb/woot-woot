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
          me.map.on('extent-change', function (e) { me.fire('extent-change', e); });
        });
      } else {
        me.map = new Map(me.$.map, mapOptions);
        me.vrboLayer = new FeatureLayer( "http://koop.dc.esri.com:8080/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0", {
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
        var trailStyle = new SimpleRenderer(lineJson);


        // Add Trail layer #1
        me.trailsLayer = new FeatureLayer( "http://services1.arcgis.com/ohIVh2op2jYT7sku/arcgis/rest/services/SouthShoreTrails/FeatureServer/0", {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });
        me.trailsLayer.setRenderer( trailStyle );
        me.trailsLayer.on('click', function (e) { me._lineClick(e); });
        me.map.addLayer( me.trailsLayer );


        // Trail Layer #2
        me.trailsLayer2 = new FeatureLayer( "http://services1.arcgis.com/ohIVh2op2jYT7sku/arcgis/rest/services/ValleyFloor_Trails/FeatureServer/0", {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });
        me.trailsLayer2.setRenderer( trailStyle );
        me.trailsLayer2.on('click', function (e) { me._lineClick(e); });
        me.map.addLayer( me.trailsLayer2 );

        
        // Add VRBO Layer 
        var rend = new SimpleRenderer(simpleJson);
        me.vrboLayer.setRenderer( rend );
        me.vrboLayer.on('click', function (e) { me._pointClick(e); });
        me.map.addLayer(me.vrboLayer);

        //raise event to outside world
        me.map.on('extent-change', function (e) { me.fire('extent-change', e); });
        Woot = window.Woot || {};
        Woot.map = me.map;
      }
    });
  },
  showMessage: function (msg) {
    //public method!
    alert(msg);
  },
  changeFill: function(color) {
    this.vrboLayer.renderer.symbol.color = new dojo.Color( color );
    this.vrboLayer.redraw();
  },
  changeSize: function(size) {
    this.vrboLayer.renderer.symbol.size = size;
    this.vrboLayer.redraw();
  },
  _lineClick: function(e){
    this.fire('trail:click', e);
  },
  _pointClick: function(e){
    this.fire('vrbo:click', e);
  }
});
