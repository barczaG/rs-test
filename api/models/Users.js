/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		}
	},

	afterCreate: function(user, cb) {
		
		var token = encodeURIComponent(Jwt.createToken(user));

		var link = sails.config.baseUrl + 'users?token=' + token;

		Mandrill.send({to: user.email, template: 'reg', subject: 'Welcome', data: {name: user.name, link: link} });
		cb(null, user);
	},
};

