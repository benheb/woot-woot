Polymer('stylist-element', {
  ready: function() {

    //Esri Format Defaults
    if ( this.format === "esri" && this.type === "point" ) {
      this.outputStyle = {};
      this.outputStyle.type = "simple";
      this.outputStyle.symbol = {};
      this.outputStyle.symbol.size = 6;
      this.outputStyle.symbol.type = "esriSMS";
      this.outputStyle.symbol.style = "esriSMSCircle";
      this.outputStyle.symbol.color = [ 210, 105, 30, 191 ];
      this.outputStyle.symbol.outline = {};
      this.outputStyle.symbol.outline.color = [ 255, 255, 255, 255 ];
      this.outputStyle.symbol.outline.style = "esriSLSSolid";
      this.outputStyle.symbol.outline.type = "esriSLS";
      this.outputStyle.symbol.outline.width = 0;
    } else if (this.format === "leaflet" && this.type === "point") {
      this.outputStyle = {};
      this.outputStyle.radius = 6;
      this.outputStyle.fillColor = "#ce803d";
      this.outputStyle.color = "#FFF";
      this.outputStyle.weight = 0;
      this.outputStyle.opacity = 1;
      this.outputStyle.fillOpacity = 1;
    }

  },
  
  addLayer: function(layer) {
    var self = this;
    var fields = layer.impl.detail.layer.fields,
        selected = false;
    for(var i = 0; i<fields.length;i++) {
      if ( fields[ i ].type === "esriFieldTypeInteger" ) {
        var option = document.createElement('option');
        option.text = fields[i].alias;
        
        // if(!selected) { // make the first layer default styled
        //   this.fire('graduate-symbols', {msg: fields[i].alias});
        //   option.selected = true;        
        //   selected = true;
        // }
        //self.graduateSymbols('Bedrooms');
        document.getElementById('graduate-symbol-list').appendChild(option);
      }
    }
    var element = document.getElementById('graduate-symbol-list');
    element.value = "Bedrooms";
  },

  changeColor: function(e) {
    var id = e.impl.target.id;
    this.fire('color-changed', {msg: '#'+id}); //send event to update map
    
    //set fill color property based on current format
    if ( this.format === "esri" ) {
      var R = hexToR("#"+id);
      var G = hexToG("#"+id);
      var B = hexToB("#"+id);

      function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
      function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
      function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
      function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

      this.outputStyle.symbol.color = [R, G, B, 255];
    } else if ( this.format === "leaflet") {
      this.outputStyle.fillColor = '#'+id;
    } //etc

    //update the style object
    this.updateStyle();
  },
  
  changeSize: function(e) {
    var val = e.impl.target.value;
    this.fire('size-changed', {msg: val}); //send event to update map

    //set size property based on current format
    if ( this.format === "esri" ) {
      this.outputStyle.symbol.size = val;
    } else if ( this.format === "leaflet") {
      this.outputStyle.radius = val;
    } //etc

    this.updateStyle();
  },

  //update the main style object and alert UI
  updateStyle: function() {
    this.fire('style-changed', {msg: this.outputStyle});
  },

  //graduate symbols
  graduateSymbols: function(attr) {
    if ( attr.impl ) {
      this.fire('graduate-symbols', {msg: attr.impl.target.value});
    } else {
      this.fire('graduate-symbols', {msg: attr});
    }
    
  }

});