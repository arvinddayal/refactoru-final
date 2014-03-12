var QuestionnaireModel = require('../models/questionnaireModel');
var UserController = module.exports = {

	index: function(req,res){
		res.render('index');
	},
	submit: function(req, res){
		var x = req.body;
		var newQuestionnaire = new QuestionnaireModel(x);
		newQuestionnaire.save();
		res.render('newkit', {data:req.body});
	}
};