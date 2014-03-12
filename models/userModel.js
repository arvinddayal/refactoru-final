var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userid: String,
	username: String,
	profile: Object,
	kits: Object
});

var UserModel = module.exports = mongoose.model('user', userSchema);