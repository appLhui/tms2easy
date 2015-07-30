var fs = require('fs');

module.exports =  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider.state('index', {
    url:'/',
    template: fs.readFileSync(__dirname + '/template/index.html', 'utf8'),
    controller: require('./controller/index')
  });


  $stateProvider.state('child', {
    url: "/:key/:page",
    template: fs.readFileSync(__dirname + '/template/pd.html', 'utf8'),
    controller: require('./controller/child')
  });

}];



