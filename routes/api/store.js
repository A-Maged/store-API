var express = require('express');
var router = express.Router();

var storeController = require('../../controllers/storeController')

// test what you want using this route
router.get('/test', storeController.test );


// stores listing
router.get('/', storeController.homePage );


// single store  
router.get('/show/:storeSlug', storeController.showSingleStore);


// add a store
router.post('/add',  storeController.addStore);

// add an item to a store
router.post('/:storeSlug/add',  storeController.addItem);

// show single item
router.get('/show/:storeSlug/:itemId', storeController.showItem);


// update store 
router.post('/update/:storeSlug',  storeController.updateStore);






module.exports = router;


