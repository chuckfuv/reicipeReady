var model       = require ('../models')
var querystring         = require('querystring')

/*
creates a new host document and fills it with the
information from spotify when the host first
logs in from the website
*/
module.exports = function createKitchen (kitchenID) {
  return new Promise (function (fulfill, reject){
    var kitchen = new model.Kitchen()
    kitchen.kitchenID	= kitchenID
    kitchen.homepage  = '/loggedIn.html#'+querystring.stringify({'kitchenID':kitchenID, 'i1':'egg', 'i2':'beef', 'i3':'cheese', 'i4':'tortilla' })
    fulfill  (kitchen)
  })
}
