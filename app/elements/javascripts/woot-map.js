'use strict';

Polymer('woot-map', {
  basemap: 'streets',
  webMapId: '',
  extent: '-117.03089904784932, 34.109989664938375, -116.7256851196271, 34.32518284370753',
  map: null,
  ready: function() {
    var me = this;
    require(['esri/map', 'esri/arcgis/utils', 'esri/geometry/Extent', "esri/renderers/SimpleRenderer", "esri/layers/FeatureLayer", "esri/tasks/GeometryService", "esri/tasks/BufferParameters", "esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol", "dojo/_base/Color", "esri/graphic", 'dojo/domReady!'], 
      function(Map, arcgisUtils, Extent, SimpleRenderer, FeatureLayer, GeometryService, BufferParameters, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic) {
      me.BufferParameters = BufferParameters;
      me.GeometryService = GeometryService;
      me.SimpleLineSymbol = SimpleLineSymbol;
      me.SimpleFillSymbol = SimpleFillSymbol;
      me.Color = Color;
      me.Graphic = Graphic;
      
      var mapOptions= {
        basemap: me.basemap
      };

      if (me.extent) {
        var ext = me.extent.split(',');
        mapOptions.extent = new Extent(+ext[0], +ext[1], +ext[2], +ext[3]);
      }

      // create a geometry service for buffer things
      me.gsvc = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

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
            "color": [39, 174, 96, 150],
            "width": 2,
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
        me.map.on('layer-add', function (e) { me.fire('layer-added', e); });
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
    var me = this;
    this.map.graphics.clear();
    var geometry = e.graphic.geometry;
    var symbol = new this.SimpleLineSymbol(this.SimpleLineSymbol.STYLE_SOLID, new this.Color([41, 128, 185]), 3);

    var graphic = new this.Graphic(geometry, symbol);
    this.map.graphics.add(graphic);

    //setup the buffer parameters
    var params = new this.BufferParameters();
    params.distances = [ 1000 ];
    params.bufferSpatialReference = new esri.SpatialReference({wkid: 102100});
    params.outSpatialReference = map.spatialReference;
    params.unit = this.GeometryService['UNIT_METER'];
    params.geometries = [geometry];
    this.gsvc.buffer(params, function(geoms) { 
      me._showBuffer(geoms);
    });

    this.fire('trail:click', e);
  },
  _pointClick: function(e){
    this.fire('vrbo:click', e);
  },

  _showBuffer: function( bufferedGeometries ) {
      var me = this;
      var symbol = new this.SimpleFillSymbol(
        this.SimpleFillSymbol.STYLE_SOLID,
        new this.SimpleLineSymbol(
          this.SimpleLineSymbol.STYLE_SOLID,
          new this.Color([241, 196, 15, 0.65 ]), 2
        ),
        new this.Color([241, 196, 15, 0.35])
      );

      var inside = [], pntGraphic, graphic;
      bufferedGeometries.forEach(function(geometry) {
        graphic = new me.Graphic(geometry, symbol);
        me.map.graphics.add( graphic );

        me.vrboLayer.graphics.forEach(function(point){
          if (geometry.contains(point.geometry)){
            console.log(true);
            me.map.graphics.add(new me.Graphic(point.geometry, symbol));      
          }
        });
      });
  }, 

  graduateSymbols: function(attr) {
    console.log('attr', attr);
    var renderer = this.vrboLayer.renderer;
    renderer.setProportionalSymbolInfo({
      field: attr,
      minSize: 2,
      maxSize: 20,
      minDataValue: 0,
      maxDataValue: 5,
      valueUnit: "unknown",
      legendOptions: {
        customValues: [0, 1, 2, 3, 4]
      }
    });
    this.vrboLayer.redraw();
  }

});
