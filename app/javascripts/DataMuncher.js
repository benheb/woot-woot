var DataMuncher = {
  
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
          label = g[fieldName];
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


  }

};