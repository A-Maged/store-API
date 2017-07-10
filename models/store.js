const mongoose = require('mongoose');
const slug = require('slugs');

// use es6 built-in promise
mongoose.Promise = global.Promise;

// define the schema
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },

    slug: String,

    description: {
        type: String,
        trim: true
    },

    tags: [String]
});



// every time this function runs before a store is saved to the DB  
storeSchema.pre('save', function(next) {

    if (this.isModified('name') ) {
        // transform the store name into a slug using "slugs" library
        // and save it in the store's slug property
        this.slug = slug(this.name);            
    }

    next()

    // TODO: make sure every slug is unique
});

module.exports = mongoose.model('Store', storeSchema);