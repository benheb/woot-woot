/* global describe, it */

(function () {
  'use strict';

  describe('DataMuncher', function () {
    describe('parse price', function () {

      var val;
      it('should return a range', function () {
        val = DataMuncher._parsePrice('$123 - $340/nt US Dollars');
        expect(val).toEqual({min:123, max:340});
      });
      
    });
  });
})();