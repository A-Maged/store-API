
const bcrypt = require('bcrypt');

exports.comparePassword = async function (hash, password) {
	var result =  await bcrypt.compare(password, hash);
	return result;
}