var passport = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var UserModel = require('../models/UserModel');
var GOOGLE_CLIENT_ID = "317957063311-47ulg5coqcotqg7d0tdjncr543ji2oma.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "JwQ6qEdqkJUCAeYxgqvJM_Is";

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
	clientID: '235586613295565',
	clientSecret: '5685b05fe219709f59102ffdff9ec180',
	callbackURL: 'http://localhost:3000/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
	console.log(accessToken, refreshToken, profile);
	
	UserModel.findOne({userid: profile.id}, function(err, user){
		if(user){
			return done(err, user);
		}
		var newUser = new UserModel({
			userid: profile.id,
			username: profile.username,
			profile: profile
		});
		newUser.save(function(err, doc){
			return done(err, doc);
		});
	});
});

//Google
var googleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
	
	UserModel.findOne({userid: profile.id}, function(err, user){
		if(user){
			return done(err, user);
		}
		var newUser = new UserModel({
			userid: profile.id,
			username: profile.username,
			profile: profile
		});
		newUser.save(function(err, doc){
			return done(err, doc);
    });
  });
});


passport.use(facebookStrategy);
passport.use(googleStrategy);