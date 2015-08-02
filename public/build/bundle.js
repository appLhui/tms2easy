(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./filter/filter');
require('./directive/directive');
require('./service/service');



angular.element(document).ready(function () {

  var app = angular.module('app', ['ui.bootstrap', 'ui.router','ngSanitize','ngDragDrop','filter','directive']);

  app.config(require('./routes'));

  angular.bootstrap(document, ['app']);

});



},{"./directive/directive":4,"./filter/filter":7,"./routes":8,"./service/service":9}],2:[function(require,module,exports){

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
},{}],3:[function(require,module,exports){
module.exports = ['$scope','$timeout',function($scope,$timeout){

  var jsonInput,htmlInput,codeMirror = {
    getSelectedRange:function(editor) {
      return { from: editor.getCursor(true), to: editor.getCursor(false) };
    },
    autoFormatSelection:function(editor){
      var range = this.getSelectedRange(editor);
      editor.autoFormatRange(range.from, range.to);
    },
    commentSelection:function(isComment,editor){
      var range = getSelectedRange(editor);
      editor.commentRange(isComment, range.from, range.to);
    }
  };

  angular.extend($scope,{
    formatRange:function(){
      codeMirror.autoFormatSelection(jsonInput);
    },
    importCode:function(){
    }
  });

  $timeout(function(){
    jsonInput = CodeMirror.fromTextArea(document.getElementById("json"), {
      lineNumbers: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      mode: "text/javascript"
    });
    htmlInput = CodeMirror.fromTextArea(document.getElementById("html"), {
      lineNumbers: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      mode: "text/html"
    });
  });

}];
},{}],4:[function(require,module,exports){
/**
 * Created by lihui on 15-7-22.
 */

module.exports = angular.module('directive', [])
  .directive('distinguish', require('./distinguish'));
},{"./distinguish":5}],5:[function(require,module,exports){
/**
 * Created by lihui on 15-7-29.
 */



module.exports =  function () {
  return {
    restrict: 'A',
    template: "<div>\n  <a ng-if=\"kind == 'object'\" ui-sref=\"child({key:_key,page:_page})\">\n    <i class=\"glyphicon glyphicon-plus\"></i>\n    <span> object...</span>\n  </a>\n  <input ng-if=\"kind == 'string'\" ng-model=\"value\">\n  <input ng-if=\"kind == 'boolean'\" type=\"checkbox\" ng-model=\"value\">\n  <a ng-if=\"kind == 'array'\" ui-sref=\"child({key:_key,page:_page})\">\n    <i class=\"glyphicon glyphicon-plus\"></i>\n    [object,object]...\n    <span class=\"badge\" ng-bind=\"value\"></span>\n  </a>\n</div>",
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

},{}],6:[function(require,module,exports){
module.exports = function(){
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
};
},{}],7:[function(require,module,exports){
/**
 * Created by lihui on 14-7-30.
 */

module.exports = angular.module('filter', [])
  .filter('analysis', require('./analysis'));


},{"./analysis":6}],8:[function(require,module,exports){


module.exports =  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider.state('index', {
    url:'/',
    template: "\n\n<tabset justified=\"true\">\n  <tab heading=\"前端工程狮\">\n    <p class=\"text-muted\">请将数据填入左边得模版（JSON格式），请将页面模版填入右边模版</p>\n\n\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"well well-lg \" style=\"padding-left: 0 !important;\">\n          <textarea id=\"json\" name=\"json\" placeholder=\"JSON格式数据\" class=\"form-control\" ></textarea>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"well well-lg \" style=\"padding-left: 0 !important;\">\n          <textarea id=\"html\" name=\"html\" placeholder=\"页面模版\" class=\"form-control\" ></textarea>\n        </div>\n      </div>\n    </div>\n    <div>\n      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"formatRange()\">格式化选中代码</button>\n      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"importCode()\">导入</button>\n    </div>\n  </tab>\n  <tab heading=\"运营专猿\">Short Labeled Justified content</tab>\n</tabset>",
    controller: require('./controller/index')
  });


  $stateProvider.state('child', {
    url: "/:key/:page",
    template: "<div class=\"panel panel-default\">\n  <ul class=\"breadcrumb\">\n    <li ng-class=\"{active:$last}\" ng-repeat=\"i in breadcrumb\" >\n      <a ng-if=\"!$last\" ng-bind=\"i.remark\" ui-sref=\"child({key:i.id})\"></a>\n      <span ng-if=\"$last\" ng-bind=\"i.remark\"></span>\n    </li>\n  </ul>\n\n  <div class=\"panel-body\" ng-show=\"listLength\">\n    <div id=\"page\" class=\"row\">\n      <div class=\"col-md-12\">\n        <h6>\n          <a class=\"btn btn-default btn-xs\" ng-click=\"add()\"><i class=\"glyphicon glyphicon-plus\"></i>添加</a>\n        </h6>\n        <div class=\"list clearfix\">\n          <div class=\"item item1\" ng-repeat=\"(k,v) in listLength track by $index\">\n            <a ui-sref=\"child({key:stateParams.key,page:$index})\">{{$index}}</a>\n          </div>\n        </div>\n        <div class=\"alert alert-info\" role=\"alert\">\n          <p>请拖拽改变顺序</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <table class=\"table table-bordered\">\n    <tr>\n      <th>备注</th>\n      <th>默认值</th>\n    </tr>\n    <tr ng-repeat=\"(key,v) in list track by $index\">\n      <td>{{key|analysis:'info'}}</td>\n      <td distinguish=\"v\" key=\"key\"></td>\n    </tr>\n  </table>\n  <div class=\"panel-footer\">\n\n    <button type=\"button\" class=\"btn btn-primary\">Primary</button>\n\n  </div>\n</div>\n\n",
    controller: require('./controller/child')
  });

}];




},{"./controller/child":2,"./controller/index":3}],9:[function(require,module,exports){
/**
 * Created by lihui on 15-7-22.
 */

},{}]},{},[1]);
