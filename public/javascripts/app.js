angular.element(document).ready(function () {

  var app = angular.module('app', ['ui.bootstrap', 'ui.router','ngSanitize']);

  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

//    $urlRouterProvider.otherwise("/");

    $stateProvider.state('child', {
      url: "/:key/:page",
      templateUrl: '../template/index.html',
      controller: ['$scope','$stateParams', function ($scope,$stateParams) {
        var parentsObj = [];

        var _js = '';

        for(var _i = 0 ; _i < $stateParams.key.length/2;_i++){
          angular.forEach(window.arrayConfig,function(o){
             if(o.id == $stateParams.key.substr(0,(_i+1)*2)){
               parentsObj.push(o);
               _js+= '["'+ o.name+'//'+ o.remark+'//'+ o.id+'"]';
               if(angular.isArray(eval('window.config'+_js))){
                 $scope.listLength = eval('window.config'+_js);
                 _js+= '[0]';
               };
             }
          });
        }

        $scope.list = eval('window.config'+_js);
        $scope.breadcrumb = parentsObj;
        $scope.stateParams = $stateParams;


        $scope.add = function(){
          $scope.listLength.push($scope.listLength[$scope.listLength.length-2]);
        };



        $('.list').drop({
          handle: '.item',
          drag: '.item',
          containment: $('.list'),
          ondragover: function() {
            $(this).addClass('over');
          },
          ondragout: function() {
            $(this).removeClass('over');
          },
          ondragenter: function() {
            $(this).addClass('enter');
          },
          ondragleave: function() {
            $(this).removeClass('enter');
          },
          ondrop:function(){

          }
        });



      }]
    });

  }]);


  app.filter('analysis',function(){
    return function(key,name){
       var _array = key.split('//');
       if(name == 'label'){
         return _array[0];
       }else if(name == 'info'){
         return _array[1];
       }else if(name == 'key'){
         return _array[2];
       }else{
         return key;
       }
    }
  });

  app.directive('distinguish', function () {
    return {
      restrict: 'A',
      templateUrl:'../template/value.html',
      scope:{
        distinguish:'=',
        key:'=',
        page:'='
      },
      link: function($scope){
          if(angular.isObject($scope.distinguish)){
            if(angular.isArray($scope.distinguish)){
              $scope.kind = 'array';
              $scope.value =  $scope.distinguish.length;
              $scope._page = $scope.page?$scope.page+ '_0':0;
            }else{
              $scope.kind = 'object';
              $scope._page = $scope.page?$scope.page+ '_0':0;
            }
          }else if(angular.isString($scope.distinguish)){
            $scope.kind = 'string';
            $scope.value = $scope.distinguish;
          }else if($scope.distinguish === true || $scope.distinguish === false){
            $scope.kind = 'boolean';
            $scope.value = $scope.distinguish;
          }
      },
      controller:['$scope','$filter',function($scope,$filter){
        if(angular.isObject($scope.distinguish)) $scope._key = $filter('analysis')($scope.key,'key');
      }]
    };
  });


  angular.bootstrap(document, ['app']);

});


