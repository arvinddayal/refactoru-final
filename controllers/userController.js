var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserModel = require('../models/UserModel');

module.exports = {
	display: function(req,res){

		QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
				var kitArr = [];
				if (doc.earthquakeZone===true){
					ItemModel.find({category: 1}, function(err,doc){
						var newArr = kitArr.concat(doc);
						console.log(newArr);
					});
				}
				// if (doc.floodZone===true){
				// 	ItemModel.find({category: 2}, function(err,doc){
				// 		kitArr.push(doc);
				// 	});
				// }
			});


		QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
			res.render('userpage', {
				profile: req.user,
				questions: doc
			});
		});
	},


};