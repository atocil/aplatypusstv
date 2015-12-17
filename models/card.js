var mongoose = require('mongoose');


var spaceSchema = mongoose.Schema({
	value		: {type: String, default: 'MEMES HAPPEN'},
	key			: {type: String, default: '0'},
	activated	: {type: Boolean, default: false}
});

var cardSchema = mongoose.Schema({
	owner 		: String,
	enabled		: Boolean,
	wager		: Number,
	spaces		: {type: [spaceSchema]}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('BingoCard', cardSchema);