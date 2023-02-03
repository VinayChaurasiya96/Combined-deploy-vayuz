// @desc Error handling functionyy
function handleError(err, res){
    if(Object.keys(err.errors).length > 1){
      var errors = {};
        for(let key in err.errors){
          errors[key] = err.errors[key].properties.message;
        }
        res.status(500).json(errors);
    }else{
      res.status(500).json({'error': err._message});
    }
  }

  module.exports = handleError