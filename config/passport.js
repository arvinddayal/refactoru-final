var passport = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var UserModel = require('../models/userModel');
var googleClientID = "317957063311-47ulg5coqcotqg7d0tdjncr543ji2oma.apps.googleusercontent.com";
var googleClientSecret = "JwQ6qEdqkJUCAeYxgqvJM_Is";
var facebookClientID = '235586613295565';
var facebookClientSecret = '5685b05fe219709f59102ffdff9ec180';

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(userid, done){
	UserModel.findOne({_id: userid}, function(err, user){
		done(err, user);
	});
});

//Facebook
var facebookStrategy = new FacebookStrategy({
	clientID: facebookClientID,
	clientSecret: facebookClientSecret,
	callbackURL: 'http://getmeprepped.herokuapp.com/facebook/callback'
	// callbackURL: 'http://localhost:3000/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
	// console.log(accessToken, refreshToken, profile);
	
	UserModel.findOne({userid: profile.id}, function(err, user){
		if(user){
			return done(err, user);
		}
		var newUser = new UserModel({
			userid: profile.id,
			profileSource: profile.provider,
			username: profile.displayName,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile._json.email
		});
		newUser.save(function(err, doc){
			return done(err, doc);
		});
	});
});

//Google
var googleStrategy = new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "http://getmeprepped.herokuapp.com/google/callback"
    // callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(accessToken, refreshToken, profile);
	
	UserModel.findOne({userid: profile.id}, function(err, user){
		if(user){
			return done(err, user);
		}
		var newUser = new UserModel({
			profileSource: profile.provider,
			userid: profile.id,
			username: profile.displayName,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile._json.email
		});
		newUser.save(function(err, doc){
			return done(err, doc);
    });
  });
});


passport.use(facebookStrategy);
passport.use(googleStrategy);