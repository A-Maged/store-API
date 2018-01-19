'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session')
const uniqid = require('uniqid');
const userModel = mongoose.model('User');

class User{

	home (req, res){
		userModel.find(function(err, users){
			if (err) {console.error(err); return;}
			else{ res.json(users); }
		});
	}


	async createNewUser (req, res) {

		// make a new user object
		var newUser = new userModel(req.body);
			
		// make username unique
		newUser.username = req.body.username + '-' + uniqid();

		// hash password
		newUser.password = await bcrypt.hash(req.body.password, 10);

		// save the new user to DB
		newUser.save(function(err, user) {
			if(err){ res.send(err); }
			else{ 
				req.session.user = user;
				req.session.user.password = ''; // delete the password from the session
				res.redirect('/api/v1/users/' + newUser.username); 
			}
		});
	}



	showUser (req, res){
		userModel.find({username: req.params.username}, function(err, user){
			if (err){ res.send(err); }
			else{ res.json(user); }
		});
	}



	async updateUser (req, res) {

		// make username unique
		if (req.body.username) {
			req.body.username = await (function() {
				return req.body.username + '-' + uniqid();
			})()
		}
		
		// hash password
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
		}
		
		
		// update the user
		userModel.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, function(err,user){
			if (err) { res.send(err); }
			else{ res.redirect('/api/v1/users/' + req.params.username); }
		})
		
	}



	deleteUser (req, res){
		userModel.findOneAndRemove(
			{username: req.params.username} 
			,function(err, user) {
				if (err) { res.send(err); }
				else{ res.send('succefully deleted  ' + user.username); }
		});
	}


}


module.exports = new User();