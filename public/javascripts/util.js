var fs = require('fs');
var insertCss = require('insert-css');

var path = require('path')

var css = fs.readFileSync(path.resolve('')+"/node_modules/codemirror/lib/codemirror.css");
css += fs.readFileSync(path.resolve('')+"/node_modules/codemirror/addon/fold/foldgutter.css");
css += fs.readFileSync(path.resolve('')+"/node_modules/bootstrap/dist/css/bootstrap.min.css");
css += fs.readFileSync(path.resolve('')+"/node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css");
insertCss(css);


window.jQuery = window.$ = global.jQuery = require('jquery');
global.CodeMirror = require('codemirror');

require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/htmlmixed/htmlmixed');
require('../../node_modules/codemirror/addon/display/placeholder');
require('../../node_modules/codemirror/addon/fold/foldcode');
require('../../node_modules/codemirror/addon/fold/foldgutter');
require('../../node_modules/codemirror/addon/fold/brace-fold');
require('../../node_modules/codemirror/addon/fold/xml-fold');
require('../../node_modules/codemirror/addon/fold/markdown-fold');
require('../../node_modules/codemirror/addon/fold/comment-fold');
require('./util/formatting');


require('angular');
require('angular-route');
require('angular-translate');
require('angular-sanitize');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-dragdrop');