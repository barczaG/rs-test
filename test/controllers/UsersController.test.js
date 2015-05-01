var request = require('supertest');
var token;

describe('UsersController', function() {

	describe('#register()', function() {

		it('should register a user', function (done) {
			request(sails.hooks.http.app)
			.post('/registration')
			.send({name: 'User4', email: 'user4@dcw.hu'})
			.expect(function(res){
				var user = res.body.user;
				token = res.body.token;
				user.should.have.properties({
					name: 'User4',
					email: 'user4@dcw.hu',
				});
			})
			.expect(200, done);
		});

		it('email validation should work', function (done) {
			request(sails.hooks.http.app)
			.post('/registration')
			.send({name: 'User', email: 'user1@dcw'})
			.expect(400, done);
		});

		it('email most be unique', function (done) {
			request(sails.hooks.http.app)
			.post('/registration')
			.send({name: 'User', email: 'user1@dcw.hu'})
			.expect(400, done);
		});

		it('email is required', function (done) {
			request(sails.hooks.http.app)
			.post('/registration')
			.send({name: 'User'})
			.expect(400, done);
		});

		it('name is required', function (done) {
			request(sails.hooks.http.app)
			.post('/registration')
			.send({name: 'Name'})
			.expect(400, done);
		});
		

		
	});

	describe('#users()', function() {

		it('should list users', function (done) {
			request(sails.hooks.http.app)
			.get('/users')
			.query({token: token})
			.expect(function(res){
				var users = res.body;
				users.should.have.lengthOf(4);
			})
			.expect(200, done);
		});

		it('token required', function (done) {
			request(sails.hooks.http.app)
			.get('/users')
			.expect(403, done);
		});

		it('token should be valid', function (done) {
			request(sails.hooks.http.app)
			.get('/users')
			.query({token: "asd"})
			.expect(403, done);
		});
		
	});

});

function prettyJSON(obj) {
	console.log(JSON.stringify(obj, null, 2));
}
