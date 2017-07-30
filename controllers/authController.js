const passport = require('passport');

exports.login = function(req, res){
	res.send('success');
}


exports.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		next();
		return;
	}
	else{
		res.send('not authinticated');		
	}
}