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
      this.vrbos = vrbos;
    }
  }
});