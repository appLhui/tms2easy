angular.element(document).ready(function () {

  var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('index', {
      url: "/",
      templateUrl: '../template/index.html',
      controller: ['$scope',function($scope){
        $scope.config = window.config;
      }]
    });

  }]);


  angular.bootstrap(document, ['app']);

});


