var DataMuncher = {
  
  /**
   * Aggregate an array of Graphics into chartable data
   * - parse price
   */
  aggregateProperties: function(graphics){
    var graphable = {};

    graphics.forEach(function(g){

    });

    return graphable;
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