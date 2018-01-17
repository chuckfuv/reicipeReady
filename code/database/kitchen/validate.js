var model				= require ('../models')
/*
validates the access token that the user has provided from the website
Our access token will be valid until they remove our access to allow
guest to continue adding songs. This means we can check validity of
the access token internally instead of making a request to spotify
before knowing.
*/
module.exports = function validate (kitchenID){
	return new Promise (function (fulfill, reject){
	  var promise = model.Kitchen.findOne({ 'kitchenID' : kitchenID }).exec()
	  promise.then (function (kitchen){
	  	if (kitchen){
  			fulfill (kitchen)
	  	}else{
	  		fulfill (null)
	  	}
	  })
	  .catch (function(error) {
    	reject (error)
	  })
	})
}