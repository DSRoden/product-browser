(function(){
  'use strict';

  angular.module('product-browser')
  .controller('ProductsCtrl', ['$scope', '$timeout', '$location', '$state', 'Product', '$filter', function($scope, $timeout, $location, $state, Product, $filter){
    var scope = this;
    scope.title = 'products';
    scope.products = [];
    scope.bookmarks = [];

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

    //SAVING ITEMS WITHOUT DUPLICATES
    scope.bookmarkItem = function(product){
      var exists = _.find(scope.bookmarks, function(bookmark){
        return bookmark.itemId[0] === product.itemId[0];
      });
      if(exists){ return;
      } else {
        product.bookmarked = true;
        scope.bookmarks.push(product);
      }
    };

    //RESET TO SHOW ALL PRODUCTS BUT KEEPING BOOKMARKED STATES
    scope.resetFilters = function(){
      scope.getProductInfo();
      scope.bookmarkedProducts = false;
      scope.tempArray = _.map(scope.products, function(product){
        for(var i = 0; i < scope.bookmarks.length; i++){
          if(product.itemId[0] === scope.bookmarks[i].itemId[0]){
            product.bookmarked = true;
            return product;
          } else {
            return product;
          }
        }
      });
      // recreate the array in a timeout due to http request
      $timeout(function(){
        if(scope.bookmarks.length > 0){
          scope.products = scope.tempArray;
        }
      }, 1000);
    };

    //SORT BY PRICE
    scope.sortByPriceDesc = function(){
      scope.priceDesc = _.sortBy(scope.products, function(product){
        return parseInt(product.sellingStatus[0].convertedCurrentPrice[0].__value__);
      });
      scope.products = scope.priceDesc.reverse();
    };

    //FILTER TOP SELLERS
    scope.highestUserRating = function(){
      scope.topSellers = _.filter(scope.products, function(product){
        return product.sellerInfo[0].topRatedSeller[0] === 'true';
      });
      scope.products = scope.topSellers;
    };

    //HIGHEST NUMBER OF BIDS
    scope.highestNumBids = function(){
      scope.itemsWithBids = _.filter(scope.products, function(product){
        return product.sellingStatus[0].bidCount;
      });
      // sort new array
      scope.sortedByBids = _.sortBy(scope.itemsWithBids, function(product){
        return parseInt(product.sellingStatus[0].bidCount[0]);
      });
      scope.products = scope.sortedByBids.reverse();
    };
  }]);
})();
