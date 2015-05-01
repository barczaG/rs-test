'use strict'
var _ = require('underscore');

module.exports = {

	baseUrl: function(req) {
		var protocol = req.connection.encrypted ? 'https':'http';
		var baseUrl = protocol + '://' + req.headers.host + '/';
		return baseUrl;
	},

}