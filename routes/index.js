var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  var config =  require('../util/makeTableInfo')();



  res.render('index', {
    config: config.s,
    b:config.b
  });

});

module.exports = router;
