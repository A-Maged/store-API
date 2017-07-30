var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController.js')
const passport = require('passport');


router.get('/', userController.findAllUsers);

router.post('/register', userController.addUser);


// router.post('/login', passport.authenticate('local', { successRedirect: '/',
// failureRedirect: '/api/v1/stores/show/omar-store' }));

// router.post('/login', 
// passport.authenticate('local', {  successRedirect: '/', failureRedirect: '/loginFailed' }),
// function(req, res) {
//   res.redirect('/api/v1/stores/show/omar-store');
// });


module.exports = router;
