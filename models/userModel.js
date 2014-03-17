var mongoose = require('mongoose');
var ItemModel = require('../models/itemModel');

var userSchema = new mongoose.Schema({
	userid: String,
	profileSource: String,
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	kits:[{
		kitName:String,
		timeCreated: Date,
		kitItems: [{
			itemName: String,
			description: String,
			quantity: {type: Number, default: 1},
			unitOfMeasure: String,
			category: [Number],
			expiration: Number,
			url: String,
			addedDate: String,
			expDate: String
		}],
	}]
});

var UserModel = module.exports = mongoose.model('user', userSchema);