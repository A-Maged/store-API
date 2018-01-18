var express = require('express');
var router = express.Router();
const authController = require('../../controllers/authController');
var storeController = require('../../controllers/storeController')

// stores listing (PROTECTED)
router.get('/', authController.loginRequired , storeController.homePage );

// show single store  
router.get('/show/:storeSlug', storeController.showSingleStore);

// show single item
router.get('/show/:storeSlug/:itemId', storeController.showItem);



// add a store (PROTECTED)
router.post('/add',  authController.loginRequired , storeController.addStore);

// add an item to a store (PROTECTED)
router.post('/:storeSlug/add',  authController.loginRequired , storeController.addItem);

// update store (PROTECTED)
router.post('/update/:storeSlug',  authController.loginRequired , storeController.updateStore);






module.exports = router;


