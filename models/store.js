const mongoose = require('mongoose');
const slug = require('slugs');

// use es6 built-in promise
mongoose.Promise = global.Promise;

// define the schema
const storeSchema = new mongoose.Schema({
	name: 			{
			type: String,
			trim: true,
			required: 'Please enter a store name',
			unique: true
    },
	slug: 			{
			type: String,
    },
	description: 	String,
	location: {
			address : {
					type: String,
			},
			longitude: 	{
					type: Number,
			},
			latitude: 	{
					type: Number,
			}
	},
	featuredImg:	String,
	coverImgLink: 	String,
	catagories: 	{
			type: [String],
	},
	hasDelivery: 	{
			type: Boolean,
			default: false
	},
	deliveryCities: {
			type: [String],
	},

	items:[
			{
				id:				Number,
				name: 			String,
				price : 		Number,
				featuredImg :	String,					
			}
	]
});



// every time this function runs before a store is saved to the DB  
storeSchema.pre('save', function(next) {

    if (this.isModified('name') ) {
        // transform the store name into a slug using "slugs" library        // and save it in the store's slug property
        this.slug = slug(this.name);            
    }

    next()
});



module.exports = mongoose.model('Store', storeSchema);