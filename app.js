const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local')
require('dotenv').config();
const app = express();


// - setup common middilewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// - view engine setup
// app.engine('hbs', hbs())
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');


// - set neccesary http-headers
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next()
})



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



// - require models
require('./models/store')
app.use(passport.initialize());
app.use(passport.session());
require('./passportSetup.js')



// - require/setup Routes
const usersRoutes = require('./routes/api/users');
const storeRoutes = require('./routes/api/store')
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/stores', storeRoutes);



module.exports = app;
