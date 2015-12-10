var mongoose = require('mongoose');


var spaceSchema = mongoose.Schema({
	value		: {type: String, default: 'MEMES HAPPEN'},
	key			: {type: String, default: '0'},
	activated	: {type: Boolean, default: false}
});

var rowSchema = mongoose.Schema({
	spaces 		: {type: [spaceSchema]}
});

var cardSchema = mongoose.Schema({
	owner 		: String,
	enabled		: Boolean,
	wager		: Number,
	rows		: {type: [rowSchema]}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('BingoCard', cardSchema);