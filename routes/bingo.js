var express = require('express');
var router = express.Router();
var BingoCard = require('../models/card');
var utils = require('../utils/bingo');

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
			res.redirect('/bingo/create');
		}
	});
});

router.get('/create', isLoggedIn, function(req, res) {
	BingoCard.findOne({'owner': req.user.twitch.username, 'enabled' : true}, function(err, card) {
		if(err) {

		}

		if(card) {
			res.redirect('/bingo');
		} 
		else {
			var newCard = utils.random_card();	
			res.render('bingo/create', {
				user : req.user,
				card : newCard
			});
		}
	});
});

router.post('/create', isLoggedIn, function(req, res) {
	var card = new BingoCard();
	card.owner = req.user.twitch.username;
	card.enabled = true;
	card.wager = req.body.wager;
	card.spaces = utils.get_spaces(req.body);
	card.save(function(err) {
    if(err) {
    	throw err;
    }
    res.send({redirect: req.get('host') + '/bingo/play'});
	});
});

router.get('/delete', isLoggedIn, function(req, res) {
	BingoCard.find({'owner': req.user.twitch.username, 'enabled' : true}).remove().exec();
	res.redirect('/bingo');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

module.exports = router;