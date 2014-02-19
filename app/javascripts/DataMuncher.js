var DataMuncher = {
  
  scatterData: function(graphics){
    var data = [];
    var self = this;
    graphics.forEach(function(g){
      var price = self._parsePrice(g.PriceRange);
      data.push({id: g.id, 
        sleeps: parseInt(g.Sleeps), 
        bedrooms: parseInt(g.Bedrooms), 
        minPrice: price.min, 
        maxPrice: price.max });
    });
    return data;
  },

  /**
   * Aggregate an array of Graphics into chartable data
   * - parse price
   */
  aggregateProperties: function(graphics){
    var graphable = {};

    var label,
        fieldList = ['Bathrooms','AverageReview', 'Bedrooms', 'Sleeps'];

    //iterate the graphics
    graphics.forEach(function(g){

      //iterate the fields
      fieldList.forEach(function(fieldName){
        //if the field exists on the graphic
        if(!graphable[fieldName]){
          graphable[fieldName] = {};
        }
        if(g[fieldName]){
          //get the lable (aka the value)
          label = parseFloat(g[fieldName]);
          //console.log('Field: ' + fieldName + ' label: ' + label);
          if( graphable[fieldName] && graphable[fieldName][label] ){
            graphable[fieldName][label] = graphable[fieldName][label] + 1;
          }else{
            //set the count for the label to 0
            graphable[fieldName][label] = 1;
          }
        }
      });

      //other fields that require additional work
      //



    });

      var data = {};
      for (var fld in graphable) {
        data[fld] = {keys:[], values:[]};
        for(var key in graphable[fld]){
          data[fld].keys.push(key);
          data[fld].values.push(graphable[fld][key]);
        }
      }

    return data;
  },

  /**
   * parse the price values from 
   * @param  {[type]} priceString [description]
   * @return {[type]}             [description]
   */
  _parsePrice: function(priceString){


    var noDollars = priceString.replace(/\$/g,'');
    var parts = noDollars.split(' ');
    var price ={min:0, max:0};
    parts.forEach(function(part){

      if(parseInt(part)){
        var num = parseInt(part);
        if(price.min === 0){
          price.min = num;
        }else{
          price.max = num;
        }
      }
    });

    return price;


  },

  /**
   * Normalize an array of data values to 
   * @param  {[type]} inArray [description]
   * @return {[type]}         [description]
   */
  percentify: function(inArray){
    var ratio = Math.max.apply(this, inArray) / 100;

    var numbers = inArray.map(function (v) {
      return Math.round( v / ratio );
    });
    return numbers;
  }

};