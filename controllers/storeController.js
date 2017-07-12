const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.homePage = (req, res)=>{
	// find and pass all stores to UI 
		Store.find((err, allStores)=>{

			res.json(allStores);
		});
		// res.json([
		// 	{name: 'cmmmmmmm'},
		// 	{name: 'ooooooo'}
		// ])
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

exports.updateStoreForm = (req, res)=>{
	Store.findOne({ slug: req.params.storeSlug},function(err, store){
		res.json(store);
	});
	
}


exports.updateStore = (req, res)=>{
	
	const store = Store.findByIdAndUpdate( );
	
}
