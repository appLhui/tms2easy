/**
 *
 * 将数据转化为table可以编辑的列表
 *
 * Created by lihui on 15-6-20.
 */


var fs = require('fs');




module.exports = function(url){

    var options = JSON.parse(fs.readFileSync('/Users/lihui/GitHub/grunt-mock2easy-demo/database/demo/tmsdemo.json','utf-8')).responseParameters;


    var obj = {};

    options.forEach(function(o){
      obj[o.id] = o;
    })


   var s = require('./response2json')(obj,null,false);

    return {s:JSON.stringify(s),b:JSON.stringify(options)};

};