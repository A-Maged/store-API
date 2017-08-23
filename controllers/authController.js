
const session = require('express-session')
const utils = require('./utils');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');



exports.signIn =  function(req, res) {
	// find user by email
	userModel.findOne({	email: req.body.email }, async function(err, user) {
		if (err) throw err;
		
		
		if (!user) { // email doesnt match    
			res.status(401).json({ message: 'Authentication failed. User not found.' }); 
		} 

		else if (user) { // email matches
			var authinticated = await utils.comparePassword( user.password , req.body.password);

			
			if ( !authinticated ) { // password doesnt match 
				res.status(401).json({ message: 'Authentication failed. Wrong password.' });  
			} 
			
			
			else { // authinticated user 
				
				// add user object to the session
				// important for loginRequired function
				req.session.user = user;

				// empty the password from the session
				req.session.user.password = ''; 

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
	if (req.session && req.session.user) { // user is authinticated
		next();
	} 
	else { // user need to login
		return res.status(401).json({ message: 'Unauthorized user!' });
	}
};
