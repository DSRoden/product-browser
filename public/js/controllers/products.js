(function(){
  'use strict';

  angular.module('product-browser')
  .controller('ProductsCtrl', ['$scope', '$timeout', '$location', '$state', 'Product', function($scope, $timeout, $location, $state, Product){
    var scope = this;
    scope.title = 'products';
    scope.products = [];

    // INITIALIZE GET PRODUCTS FUNCTION
    scope.getProductInfo = function(){
      Product.getProducts(function(products){
        scope.products = products;
      });
    };
    // GET PRODUCTS ON PAGE LOAD
    scope.getProductInfo();
    // OPEN URL TO PRODUCT
    scope.openItemUrl = function(url){
      window.open(url, '_blank', 'location=yes');
    };



  }]);
})();
