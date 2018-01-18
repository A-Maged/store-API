'use strict';
const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const router = express.Router();

// get current logged-in user
router.get('/whoami', function(req, res) {
	if (req.session && req.session.user) {
		res.send(req.session.user.username);		
	}
	else{
		res.send('no one');
	}
});



// create new user  
router.post('/create', userController.createNewUser);

// show all user (PROTECTED)
router.get('/', authController.loginRequired , userController.home);

// show one user (PROTECTED)
router.get('/:username',  authController.loginRequired , userController.showUser);

// update a user  (PROTECTED)
router.post('/update/:username', authController.loginRequired, userController.updateUser);

// delete a user  (PROTECTED)
router.post('/delete/:username', authController.loginRequired, userController.deleteUser);



module.exports = router;
