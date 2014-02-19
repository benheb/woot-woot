'use strict';

Polymer('woot-details', {
  vrbo: false,
  trail: false,
  home: true,
  update: function (which, attributes) {
    this.home = false;
    this.trail = which === 'trail';
    this.vrbo = which === 'vrbo';
    for (var p in attributes) {
      if (attributes.hasOwnProperty(p)) {
        this[p] = attributes[p];
      }
    }
  }
});