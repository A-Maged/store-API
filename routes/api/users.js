var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController')
var authController = require('../../controllers/authController')
const passport = require('passport');


router.get('/', userController.findAllUsers);

router.post('/register', userController.addUser);

router.post('/login', 
	passport.authenticate('local', {failureRedirect: '/loginFailed'} ), 
	authController.login
);



module.exports = router;
