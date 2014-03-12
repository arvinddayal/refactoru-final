var mongoose = require('mongoose');
var questionnaireSchema = mongoose.Schema({
	kitName: String,
	timeCreated: String,
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


var questionnaireModel = module.exports = mongoose.model('questionnaire', questionnaireSchema);