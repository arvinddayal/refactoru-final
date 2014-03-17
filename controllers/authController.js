module.exports = {
	login: function(req, res) {
	if (req.isAuthenticated()){
		res.redirect('/showprofile');
	}
	else {
		res.render('index');
	}
	},
	loginSuccess: function(req,res) {
		res.redirect('/showprofile');
	},
	logout: function(req,res) {
		req.logout();
		res.redirect('/');
	},
	ensureAuthenticated: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.render('index');
	},
	ensureAuthenticatedAjax: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.send(401);
	},
};