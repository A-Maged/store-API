'use strict';
const express = require('express');
const authController = require('../../controllers/authController');
const router = express.Router();


// signIn
router.post('/signin', authController.signIn);

// signout
router.get('/signout', authController.signOut);


module.exports = router;
