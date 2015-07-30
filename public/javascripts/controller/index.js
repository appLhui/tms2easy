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