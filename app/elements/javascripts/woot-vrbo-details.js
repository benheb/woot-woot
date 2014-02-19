Polymer('woot-vrbo-details', {
  update: function (attributes) {
    for (var p in attributes) {
      if (attributes.hasOwnProperty(p)) {
        this[p] = attributes[p];
      }
    }
  }
});