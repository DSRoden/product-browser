(function(){
  'use strict';

  angular.module('product-browser')
  .factory('Product', ['$http', function($http){

    function getProducts(cb){
      console.log('trying to get products');
      return $http.get('https://s3-us-west-2.amazonaws.com/famous-hiring/famousEbayData.json').then(function(res){
        console.log(res.data);
        cb(res.data);
      }, function(res){
        console.log(res.data);
      });
    }

    return {getProducts : getProducts};
  }]);
})();
