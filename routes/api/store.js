var express = require('express');
var router = express.Router();

var storeController = require('../../controllers/storeController')


// stores listing
router.get('/', storeController.homePage );


// single store  
router.get('/show/:storeSlug', storeController.showSingleStore);


// add a store
router.post('/add', storeController.addStore);



module.exports = router;

