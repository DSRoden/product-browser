(function(){
  'use strict';

  angular.module('product-browser', ['ui.router', 'ngAnimate'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $state){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('apps',     {url:'/',         templateUrl:'/products.html', controller:'ProductsCtrl', controllerAs: 'products'});
  }])
  .controller('IndexCtrl', ['$scope', function($scope){
  }]);
})();
