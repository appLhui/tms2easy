/**
 * Created by lihui on 15-7-29.
 */

var fs = require('fs');

module.exports =  function () {
  return {
    restrict: 'A',
    template: fs.readFileSync(__dirname + '/template/value.html', 'utf8'),
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
};
