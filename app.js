const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
require('dotenv').config();


// - setup common middilewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false
  }));

// - set neccesary http-headers
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next()
})



// - setup mongoose connection 
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
User = require('./models/user')



// - setup Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// - setup Routes
const usersRoutes = require('./routes/api/users');
const storeRoutes = require('./routes/api/store')
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/stores', storeRoutes);



module.exports = app;
