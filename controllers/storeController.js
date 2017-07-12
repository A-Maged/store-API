const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.homePage = (req, res)=>{
	// find and pass all stores to UI 
	Store.find((err, allStores)=>{
		res.json(allStores);
	});

},


exports.showSingleStore = (req, res)=>{
	// find store by slug and pass it
	Store.find({slug: req.params.storeSlug}, (err, store)=>{
		res.json(store[0]);        
	})
},


exports.addStore = (req, res)=>{

	const store = new Store(req.body);

	store.save(function(error, store) {
        if (error){
			res.json({error: error})
		}
	});	
}


exports.updateStore = (req, res)=>{

	Store.findOneAndUpdate({slug: req.params.storeSlug}, req.body, {
		new: true,
		runValidators: true
	}, function(error, store){
			if(error){
				console.log('error:      ', error);
			}
			res.json({store: store});
	});
	

	// TODO: update slug when the name is modified
}
