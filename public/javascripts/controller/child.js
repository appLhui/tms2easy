
module.exports = ['$scope','$stateParams', function ($scope,$stateParams) {
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

}]