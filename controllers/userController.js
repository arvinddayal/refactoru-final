var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserModel = require('../models/UserModel');

module.exports = {
	display: function(req,res){
		QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
			var query = {"userid": req.user.userid};
			var newKitName = doc.kitName;
			// UserModel.update(query, { $pushAll:{"kits":[{"kitName":newKitName, "kitItems": {"itemName":"testname"}}]}}).exec();
			UserModel.findOne(query, function(err,user){
				ItemModel.find({}, function(err, items){
					var allItems = {kitName:"testName", kitItems:[]};
					for (var i = 0; i < items.length; i++) {
						allItems.kitItems.push({itemName:items[i].itemName});
					}
					user.kits.push(allItems);
					user.save(function(err, newUser){
						res.render('userpage', {
							profile: req.user,
							questions: doc
						});
					});
				});
			});

	
		});
		// QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
				// var kitArr = [];
				// console.log(doc.kitName);
				// UserModel.find({}, function(err, doc){
				// 	console.log(doc);
				// });
				// if (doc.earthquakeZone===true){
				// 	ItemModel.find({category: 1}, function(err,doc){
				// 		var newArr = kitArr.concat(doc);
				// 		console.log(newArr);
				// 	});
				// }
			// });
	},


};