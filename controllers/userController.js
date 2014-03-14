var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserModel = require('../models/userModel');

module.exports = {
	makeKit: function(req,res){
		QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
			var query = {"userid": req.user.userid};
			var newKitName = doc.kitName;
			UserModel.findOne(query, function(err,user){
				ItemModel.find({}, function(err, items){
					var allItems = {kitName:newKitName, timeCreated: new Date(),kitItems:[]};
					for (var i = 0; i < items.length; i++) {
						if (items[i].category.indexOf(1) > -1){
							allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,category:items[i].category,expiration:items[i].expiration});
						}
					}
					user.kits.push(allItems);
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


};