var express = require('express');
var router = express.Router();
var BingoCard = require('../models/card');
var utils = require('./utils');

router.get('/', isLoggedIn, function(req, res) {
	BingoCard.findOne({'owner': req.user.twitch.username, 'enabled' : true}, function(err, card) {
		if(err) {

		}

		if(card) {
			res.render('bingo/play', {
				user : req.user,
				card : card
			});
		} 
		else {
			res.redirect('/bingo/create')
		}
	});
});

router.get('/create', isLoggedIn, function(req, res) {
	var newCard = utils.random_card();	
	res.render('bingo/create', {
		user : req.user,
		card : newCard
	});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

module.exports = router;