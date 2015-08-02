require('./filter/filter');
require('./directive/directive');
require('./service/service');



angular.element(document).ready(function () {

  var app = angular.module('app', ['ui.bootstrap', 'ui.router','ngSanitize','ngDragDrop','filter','directive']);

  app.config(require('./routes'));

  angular.bootstrap(document, ['app']);

});


