const slug = require('slugs');
const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.homePage = (req, res)=>{
	// find all stores , return only specified feilds 
	Store.find({}, 'name slug location featuredImg', (err, allStores)=>{
		res.json(allStores);
	});

},


exports.showSingleStore = (req, res)=>{
	// find store by slug 
	Store.find({slug: req.params.storeSlug}, (err, store)=>{
		res.json(store[0]);        
	})
},


exports.addStore = (req, res)=>{
	// make a new store object using body data from Http request 
	const store = new Store(req.body);
	
	// add store to DB
	store.save(function(error, store) {
        if (error){ res.json({error: error}) }
		else{ res.json(store) }
	});	
}


exports.updateStore = (req, res)=>{
	// find store by slug  
	// then  update it with body data from Http request 
	Store.findOneAndUpdate({slug: req.params.storeSlug}, req.body, {
		new: true,
		runValidators: true
	}, function(error, store){
			if(error){
				console.log('error:      ', error);
			}
			res.json({store: store});
	});

}



exports.addItem = (req, res)=>{
	var item = req.body;
	item.storeSlug = req.params.storeSlug;

	// find store by slug
	// then  add a new item to it using body data from Http request 	
	Store.findOneAndUpdate({slug: req.params.storeSlug}, {$push: {items: item}}, {
		new: true,
		runValidators: true
	}, function(error, store){
			if(error){
				console.log('error:      ', error);
				res.json({error: error});
			}
			else{
				res.json({store: store});				
			}
	});
		
}






exports.showItem = (req, res)=>{
	
		Store.aggregate(
				// get the right store
				{$match: {'slug': req.params.storeSlug}}				
				// only show items array
				,{$project : { items : 1, _id: 0 } }
				// seperate the array into individual documents
				,{$unwind: '$items'}
				// get the right item
				,{$match: {'items._id': mongoose.Types.ObjectId(req.params.itemId)}}

			,function(err, item){
				res.json(item[0].items)
			}
		)
}





/*
exports.AllItemsInStore = (req, res)=>{
	Store.aggregate(
		[
			{$match: {'slug': req.params.storeSlug}}				
			,{$project : { items : 1 } }

		],function(err, item){
			res.json(item)
		}
	)
			
}
*/


// function addSlug(collection){
// 	return new Promise(function(resolve, reject) {
// 		collection.slug = slug(collection.name);            		
// 		resolve();
// 	});
// }
