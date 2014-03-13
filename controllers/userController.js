var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');

module.exports = {
	display: function(req,res){
		console.log(req.body);
		QuestionnaireModel.findOne({}).sort("-timeCreated").exec( function(err,doc){
			res.render('userpage', {
				profile: req.user,
				questions: doc
			});
		});


	}


};