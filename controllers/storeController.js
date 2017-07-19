const slug = require('slugs');
const mongoose = require('mongoose');
const Store = mongoose.model('Store');



exports.test = (req, res)=>{
	// find and pass all stores to UI 
	Store.find({}, 'name', (err, allStores)=>{
		res.json(allStores);
	});

},



exports.homePage = (req, res)=>{
	// find and pass all stores to UI 
	Store.find({}, 'name slug location featuredImg', (err, allStores)=>{
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
		else{
			res.json(store)			
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



exports.addItem = (req, res)=>{
	var item = req.body;
	item.storeSlug = req.params.storeSlug;


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


function addSlug(collection){
	return new Promise(function(resolve, reject) {
		collection.slug = slug(collection.name);            		
		resolve();
	});
}
