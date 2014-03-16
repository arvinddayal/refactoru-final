var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserModel = require('../models/userModel');
var _ = require("underscore");

module.exports = {
	makeKit: function(req,res){
		QuestionnaireModel.findOne({}).exec( function(err,doc){
			var query = {"userid": req.user.userid};
			var newKitName = doc.kitName;
			var pets = doc.pets;
			var earthquake = doc.earthquakeZone;
			var flood = doc.floodZone;
			var tornado = doc.tornadoZone;
			var hurricane = doc.hurricaneZone;
			var limited = doc.limitedStorage;
			var backcountry = doc.backCountry;


			UserModel.findOne(query, function(err,user){
				ItemModel.find({}, function(err, items){
					var allItems = {kitName:newKitName, timeCreated: new Date(),kitItems:[]};
					//Pushes all general items (category 0)
					for (var i = 0; i < items.length; i++) {
						if (items[i].category.indexOf(0) > -1){
							allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
						}
					}
					//Pushes all pet items (category 6)
					if(pets > 0){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(6) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					//Pushes all earthquake items (category 1)
					if(earthquake===true){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(1) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					//Pushes all flood items (category 2)
					if(flood===true){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(2) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					//Pushes all tornado items (category 3)
					if(tornado===true){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(3) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					//Pushes all limited items (category 4)
					if(limited===true){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(4) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					//Pushes all backcountry items (category 5)
					if(backcountry===true){
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(5) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
							}
						}
					}
					
					//Removes duplicate kit items
					var itemsArr = allItems.kitItems;
					for (var i = 0; i < itemsArr.length; i++) {
						for (var j = i+1; j < itemsArr.length; j++) {
							if(itemsArr[j].itemName == itemsArr[i].itemName) {
								itemsArr.splice(j,1);
								--j;
							}
						}
					}
					user.kits.push(allItems);
					QuestionnaireModel.remove().exec();
					user.save(function(err, newUser){
						res.render('userpage', {
							profile: req.user,
							questions: newUser.kits
						});
					});
				});
			});
		});
	},
	remove: function(req,res){
		var x = req.params.id;
		console.log("method");
		UserModel.remove({_id: x}, function(err, doc){
			res.render('userpage');
		});
	}

};