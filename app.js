const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
require('dotenv').config();
const app = express();



// - view engine setup
// app.engine('hbs', hbs())
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');



// - setup mongoose and models 
mongoose.connect( process.env.DATABASE , {useMongoClient: true} );
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err)=>{
	console.error(err.message);
	
	console.error('retrying to connect in 5s');
	setTimeout( ()=>{
		mongoose.connect( process.env.DATABASE , {useMongoClient: true} );
	},5000)
})
require('./models/store')



// - setup common middilewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next()
})


// - require Routes
const usersRoutes = require('./routes/api/users');
const storeRoutes = require('./routes/api/store')


// - setup Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/stores', storeRoutes);



// - client-side Route
app.use(function(req, res){
		res.sendFile(path.resolve(__dirname, 'public/index.html'))	
});





module.exports = app;
