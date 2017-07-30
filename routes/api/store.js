var express = require('express');
var router = express.Router();

var storeController = require('../../controllers/storeController')
var authController = require('../../controllers/authController')

// test what you want using this route
router.get('/test', storeController.test );


// stores listing
router.get('/', storeController.homePage );


// single store  
router.get('/show/:storeSlug', storeController.showSingleStore);


// add a store
router.post('/add', authController.isLoggedIn, storeController.addStore);

// add an item to a store
router.post('/:storeSlug/add', authController.isLoggedIn, storeController.addItem);

// show single item
router.get('/show/:storeSlug/:itemId', storeController.showItem);


// update store 
router.post('/update/:storeSlug', authController.isLoggedIn, storeController.updateStore);






module.exports = router;


