'use strict';

/* REQUIRE DEPENDENCIES */
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/* CONFIG */
const app = express();
require('dotenv').config();



/*  DATABASE */
var mongooseStoreConnection = require("./database/connectDB")(process.env.STORE_DATABASE)




/* REQUIRE MODELS */
var store = require('./models/store')
var User = require('./models/user')




/* MIDDLEWARES */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	name:'cm-cookie',
	secret: toString(process.env.SECRET),
	cookie: { secure: false },
	// store: new redisStore({ host: process.env.REDIS_IP, port: process.env.REDIS_PORT, client: client}),	
	resave: false,
	saveUninitialized: true ,
	// cookie: { secure: true },
}));
//TODO: implement rate limiting 



/* SET NECCESARY HTTP HEADERS */
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next()
})
//TODO: add security HTTP headers



/* ROUTES */
require('./routes/api/')(app);



module.exports = app;
