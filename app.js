
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var indexController = require('./controllers/indexController.js');
var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
var app = express();
var passport = require('passport');
var passportconfig = require('./config/passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.jpeg'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'secret string'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/final');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
//Index Page
app.get('/', indexController.index);
//Submits Questionnaire on main page
app.post('/submit', indexController.submit);
//New Item Input Page(no visible links to this page)
app.get('/items', indexController.items);
//Adds new items to DB
app.post('/newItem', indexController.newItem);
//Test Route for checking auth
app.get('/success',
	authController.ensureAuthenticated,
	indexController.success);
//User Page after auth
app.get('/userpage',
	authController.ensureAuthenticated,
	userController.makeKit);
//User Auth
app.get('/login/facebook', passport.authenticate('facebook'));
app.get(
	'/facebook/callback',
	passport.authenticate('facebook', {failureRedirect: '/'}),
	authController.loginSuccess
);
app.get('/login/google', passport.authenticate('google',
		{ scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}),
		function(req, res){
		}
);
app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.loginSuccess
);

app.get('/logout', authController.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
