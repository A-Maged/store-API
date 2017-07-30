const slug = require('slugs');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.findAllUsers = (req, res)=>{
	User.find({}, 'name email _id', (err, allUsers)=>{
		res.json(allUsers);
	});
}


exports.addUser = (req, res)=>{
		const user = new User({email: req.body.email, name: req.body.name});

		User.register(user, req.body.password, function(error, user) {
			if (error){
				res.json({error: error})
			}
			else{
				res.redirect('/api/v1/users/')		
			}
		});	
}
	

