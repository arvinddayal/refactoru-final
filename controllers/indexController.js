var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserController = module.exports = {

	index: function(req,res){
		res.render('index');
	},
	submit: function(req, res){
		var x = req.body;
		var newQuestionnaire = new QuestionnaireModel(x);
		newQuestionnaire.save();
		res.render('newkit', {data:req.body});
	},
	items: function(req, res){
		res.render('items');
	},
	newItem: function(req, res){
		//Formats category into array of numbers
		var x = req.body.category.split(" ");
		var newArr = function(){
			var y = [];
			for (var i = 0; i < x.length; i++) {
				y.push(parseInt(x[i]));
			}
			return y;
		};
		var a = (req.body.itemName);
		var b = (req.body.description);
		var c = (req.body.quantity);
		var d = (req.body.unitOfMeasure);
		var e = newArr();
		var f = (req.body.expiration);
		var formattedItem = ({itemName:a,description:b,quantity:c,unitOfMeasure:d,category:e,expiration:f});
		var newItem = new ItemModel(formattedItem);
		newItem.save();
		res.render('items');
	}
};