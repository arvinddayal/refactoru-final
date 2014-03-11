// var UserModel = require('../models/countries');
var UserController = module.exports = {

	index: function(req,res){
		date = new Date();
		res.render('index', date);
	},
	submit: function(req, res){
		res.send(req.body);
	}
};