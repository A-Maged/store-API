

var mongoose = function( DBurl ){

	const mongoose = require('mongoose');
	
	// use es6 promises
	mongoose.Promise = global.Promise;

	// connect to DB
	mongoose.connect( DBurl , {useMongoClient: true});

	var DBconnection = mongoose.connection;


	// retry connection on error 
	DBconnection.on('error', function() {
		console.error.bind(console, 'connection error:')
		setTimeout(function () {
			mongoose.connect( DBurl , {useMongoClient: true});
		}, 3000)	
	});


	// alert on success
	DBconnection.once('open', function(){
		console.info('DB connected succefully');
	})

	return mongoose
}


module.exports = mongoose;
