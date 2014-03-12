var mongoose = require('mongoose');
var kitSchema = mongoose.Schema({
	kitName: String,
	location: String,
	groupSize: String,
	pets: String,
	earthquakeZone: {type: String, default: "false"},
	floodZone: {type: String, default: "false"},
	tornadoZone: {type: String, default: "false"},
	hurricaneZone: {type: String, default: "false"},
	limitedStorage: {type: String, default: "false"},
	backCountry: {type: String, default: "false"}
});


var KitModel = module.exports = mongoose.model('kit', kitSchema);