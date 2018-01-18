
const usersRoutes = require('./users');
const storeRoutes = require('./store')
const authRoutes = require('./auth')

function apiRoutes(app){
	
	app.use('/api/v1/users', usersRoutes);
	app.use('/api/v1/stores', storeRoutes);
	app.use('/api/v1/', authRoutes);
} 

module.exports = apiRoutes;