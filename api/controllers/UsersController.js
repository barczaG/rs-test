//var Promise = require('bluebird');

module.exports = {
	registration: function(req, res) {

		Users.create(req.body)
		.then(function (user) {

			var token = Jwt.createToken(user);
			res.send({user: user, token: token});
		}).catch(res.negotiate);
	}
};

