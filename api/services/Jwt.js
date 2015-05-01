var jwt = require('jwt-simple'),
moment = require('moment');

module.exports.createToken =function (user) {
    
    var payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, sails.config.secrets.tokenSecret);
}