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