
const session = require('express-session')
const utils = require('./utils');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');






exports.signIn =  function(req, res) {
	userModel.findOne({	email: req.body.email }, async function(err, user) {
		if (err) throw err;
		
		if (!user) { res.status(401).json({ message: 'Authentication failed. User not found.' }); } 

		else if (user) {
			var authinticated = await utils.comparePassword( user.password , req.body.password);
			
			if ( !authinticated ) { res.status(401).json({ message: 'Authentication failed. Wrong password.' });  } 
			
			else { // valid authinticated user
				
				req.session.user = user;
				req.session.user.password = ''; // delete the password from the session
				res.redirect('/api/v1/users');				
			}
		
		
		}
	});

};


exports.signOut = function(req, res) { 
	req.session.destroy(function (err) {
		if (err) return next(err)
			res.send('signed out'); 	
		})
}

exports.loginRequired = function(req, res, next) {
	if (req.session && req.session.user) {
		console.log(req.session.user.username)
		next();
	} else {
		return res.status(401).json({ message: 'Unauthorized user!' });
	}
};
