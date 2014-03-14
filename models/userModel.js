var mongoose = require('mongoose');
var ItemModel = require('../models/itemModel');

var userSchema = new mongoose.Schema({
	userid: String,
	profileSource: String,
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	kits: [{type: mongoose.Schema.ObjectId, ref: 'ItemModel.itemSchema'}]
});

var UserModel = module.exports = mongoose.model('user', userSchema);