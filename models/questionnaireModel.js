var mongoose = require('mongoose');
var questionnaireSchema = mongoose.Schema({
	kitName: String,
	timeCreated: Date,
	location: String,
	groupSize: Number,
	pets: Number,
	earthquakeZone: {type: Boolean, default: false},
	floodZone: {type: Boolean, default: false},
	tornadoZone: {type: Boolean, default: false},
	hurricaneZone: {type: Boolean, default: false},
	limitedStorage: {type: Boolean, default: false},
	backCountry: {type: Boolean, default: false}
});


var questionnaireModel = module.exports = mongoose.model('questionnaire', questionnaireSchema);