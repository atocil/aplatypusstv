var express = require('express');
var router = express.Router();

module.exports = function(passport) {

	router.get('/', passport.authenticate('twitchtv', { scope : [ 'user_read', 'user_subscriptions' ]}));

	router.get('/callback', 
		passport.authenticate('twitchtv', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}