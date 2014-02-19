'use strict';

Polymer('woot-details', {
  vrbo: false,
  trail: false,
  home: true,
  updateAttributes: function (attributes) {
    if (attributes) {
      for (var p in attributes) {
        if (attributes.hasOwnProperty(p)) {
          this[p] = attributes[p];
        }
      }
    }
    this.home = false;
    this.trail = false;
    this.vrbo = false;
    this.vrbos = false;
  },
  updateVrbo: function (attributes) {    
    this.updateAttributes(attributes);
    this.vrbo = true;
  },
  updateTrail: function (attributes, vrbos) {
    this.updateAttributes(attributes);
    this.trail = true;
    if (vrbos) {
      this.vrbos = vrbos.sort(function(a,b){return a.distance - b.distance});
    }
  },
  onMouseOver: function (e, detail, sender) {
    var id = e.target.getAttribute('data-id');
    if (id) {
      console.log('select:vrbo:' + id);
      this.fire('select:vrbo', +id);
    }else{
      console.log('no id');
    }
  },
  onMouseOut: function (e, detail, sender) {
    //console.log('deselect:vrbo');
    this.fire('deselect:vrbo');
  }
});