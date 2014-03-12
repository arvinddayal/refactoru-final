var UserModel = require('../models/kitModel');
var UserController = module.exports = {

	index: function(req,res){
		date = new Date();
		res.render('index', date);
	},
	submit: function(req, res){
		var x = req.body;
		var newKit = new UserModel(x);
		newKit.save();
		res.send("submitted");
	}
};