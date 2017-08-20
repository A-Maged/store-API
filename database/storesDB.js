const mongoose = require('mongoose');

// use es6 promises
mongoose.Promise = global.Promise;

// connect to DB
mongoose.connect(process.env.STORE_DATABASE, {useMongoClient: true});

var StoreConnecion = mongoose.connection;

// retry connection on error 
StoreConnecion.on('error', function() {
	console.error.bind(console, 'connection error:')
	setTimeout(function () {
		mongoose.connect(process.env.STORE_DATABASE, {useMongoClient: true});
	}, 3000)	
});

// alert on success
StoreConnecion.once('open', function(){
	console.info('DB connected succefully');
})


module.exports = mongoose;
