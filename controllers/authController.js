module.exports = {
	login: function(req, res) {
	if (req.isAuthenticated()){
		res.render('success');
	}
	else {
		res.render('success');
	}
	},
	loginSuccess: function(req,res) {
		res.render('success');
	},
	logout: function(req,res) {
		req.logout();
		res.redirect('/');
	},
	ensureAuthenticated: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.render('success');
	},
	ensureAuthenticatedAjax: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.send(401);
	}
};