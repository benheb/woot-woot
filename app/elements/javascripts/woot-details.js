'use strict';

Polymer('woot-details', {
  update: function (which, attributes) {
    this.trail = which === 'trail';
    this.vrbo = which === 'vrbo';
    debugger;
    for (var p in attributes) {
      if (attributes.hasOwnProperty(p)) {
        this[p] = attributes[p];
      }
    }
  }
});