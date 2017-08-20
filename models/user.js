'use strict';

const uniqid = require('uniqid');

// storesDB connection
var mongoose = require("../database/storesDB");



const userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: {
		type: String,
		required: 'email is required',
		unique: true
	},
	username: {
		type: String,
		required: 'username is required',
		unique: true		
	},
	password: {
		type: String,
		required: 'password is required'
	}
});



module.exports = mongoose.model('User', userSchema);