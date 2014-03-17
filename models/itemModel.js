var mongoose = require('mongoose');
var itemSchema = new mongoose.Schema({
	itemName: String,
	description: String,
	quantity: {type: Number, default: 1},
	unitOfMeasure: String,
	category: [Number],
	expiration: Number,
	url: String
});

var ItemModel = module.exports = mongoose.model('item', itemSchema);