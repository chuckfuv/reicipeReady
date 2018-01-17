/*
saves a docomuent and handles any error with rejection
*/
module.exports = function save (kitchen){
	return new Promise (function (fulfill, reject){
		var save = kitchen.save()
		save.then (function (newKitchen){
			console.log ('saving kitchen')
		  fulfill (newKitchen)
		})
		.catch (function (error){
		  reject (error)
		})
	})
}