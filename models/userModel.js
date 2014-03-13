var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	userid: String,
	profileSource: String,
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	kits: Object
});

var UserModel = module.exports = mongoose.model('user', userSchema);