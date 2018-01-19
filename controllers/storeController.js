const mongoose = require('mongoose');
var StoreModel = require('../models/store')



class Store{

    homePage(req, res){
        // find all stores , return only specified feilds 
        StoreModel.find({}, 'name slug location featuredImg', (err, allStores)=>{
            res.json(allStores);
        });
    }
    
    
    showSingleStore(req, res){
        // find store by slug 
        StoreModel.find({slug: req.params.storeSlug}, (err, store)=>{
            res.json(store[0]);        
        })
    }
    

    addStore(req, res){
        const store = new StoreModel(req.body);
        
        return store.save( (error, store) => {
            if (error) { console.log(error); } 
            else{ res.json(store); } 
        });	    
    }


    updateStore(req, res){
        // find store by slug  
        // then  update it with body data from Http request 
        StoreModel.findOneAndUpdate(
            {slug: req.params.storeSlug}, 
            req.body, 
            {
                new: true,
                runValidators: true
            }, 
            function(error, store){
                if(error){
                    console.log('error:      ', error);
                }
                res.json({store: store});
        });
    
    }
    
    
    addItem(req, res){
        var item = req.body;
        item.storeSlug = req.params.storeSlug;
    
        // find store by slug
        // then  add a new item to it using body data from Http request 	
        StoreModel.findOneAndUpdate(
            {slug: req.params.storeSlug}, 
            {$push: {items: item}}, 
            {
                new: true,
                runValidators: true
            }, 
            function(error, store){
                if(error){
                    console.log('error:      ', error);
                    res.json({error: error});
                }
                else{
                    res.json({store: store});				
                }
        });
            
    }
    

    showItem(req, res){

		StoreModel.aggregate(
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

}


module.exports = new Store();

