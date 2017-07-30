const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseMongodbErrors = require('mongoose-mongodb-errors');

// use es6 built-in promise
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
	email:{
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	name:{
		type: String,
		trim: true,
		required: true
	}
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(mongooseMongodbErrors);


module.exports = mongoose.model('User', userSchema);
