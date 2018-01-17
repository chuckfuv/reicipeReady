var mongoose = require("mongoose");

var kitchen = mongoose.Schema({
	kitchenID					: { type: String, default: '' },
  sensorIngredients	: [{ 
    avaliable: Boolean, 
    name: String 
  }],
  otherIngedients		: [],
  homepage					: { type: String, default: '' },
  HTML							: {
  	ingredients			: { type: String, default: '' },
  	canMake					: { type: String, default: '' },
  	couldMake				: { type: String, default: '' }
  },
  recipe            : {}
})

var Kitchen = mongoose.model('Kitchen', kitchen);

module.exports = {
  Kitchen : Kitchen
}