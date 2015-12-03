var TwitchStrategy = require('passport-twitchtv').Strategy;
var User = require('../models/user');
var props = require('../properties.js');

module.exports = function(passport) {
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	
	passport.use(new TwitchStrategy({
    		clientID: props.twitch.twitch_client_id,
    		clientSecret: props.twitch.twitch_client_secret,
    		callbackURL: props.twitch.twitch_callback_url
  		},
  		function(accessToken, refreshToken, profile, done) {
    		process.nextTick(function() {
    			User.findOne({ 'twitch.id': profile.id }, function(err, user) {
    				if(err) {
    					return done(err);
    				}

    				if(user) {
    					return done(null, user);
    				} else {
    					var newUser = new User();
                        console.log(profile);
    					newUser.twitch.id = profile.id;
    					newUser.twitch.token = accessToken;
    					newUser.twitch.username = profile.username;
                        newUser.twitch.email = profile.email;
                        newUser.twitch.displayname = profile.displayName;

    					newUser.save(function(err) {
    						if(err) {
    							throw err;
    						}

    						return done(null, newUser);
    					});
    				}
    			});
    		});
  		}
  	));
};