var mandrill = require('mandrill-api/mandrill'),
mandrill_client = new mandrill.Mandrill('5EBj7HufdMILJlRj6ZT_6Q')
Promise = require('bluebird'),
fs = Promise.promisifyAll(require("fs")),
_ = require('underscore');

module.exports = {

	sendMail: function(recipients, subject, html, async){

		if(! async) async = true;
		var to = [];

		if(_.isArray(recipients)) {

			recipients.forEach(function (email) {
				to.push({email: email});
			})
		} else {

			to.push({email: recipients});
		}

		var data = {
			message: {
				"html": html,
				"subject": subject,
				"from_email": "robot@barcza.hu",
				"from_name": "Rising stack test",
				"to": to,
				"preserve_recipients": false,
			},
			async : async,
		};

		//In test mode we dont send emails
		if(process.env.NODE_ENV === 'test') return true;

		return new Promise(function (resolve, reject) {

			mandrill_client.messages.send(data, function(result) {

				return resolve(result);
			}, function(e) {

				return reject(new Error('A mandrill error occurred: ' + e.name + ' - ' + e.message))
			});
		});
	},

	/*
	*
	email object: to, subject, template, data, 
	*
	*/
	send: function(email) {
		var _self = this;
		
		var render = Promise.promisify(sails.renderView, sails);

		email.data.lang = email.lang || 'en';

		return render('email/' + email.template, email.data)
		.then(function (html){

			return _self.sendMail(email.to, email.subject, html)
		})
		.catch(function(err) {

			sails.log.error("Email sending error", err);
		});;
	},


};




