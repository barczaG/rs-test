 var jwt = require('jwt-simple'),
 moment = require('moment');
 
 module.exports = function (req, res, next) {

    var token = req.query.token;
    if (!token) {
        return res.forbidden('No token');
    }
    try {
        var payload = jwt.decode(token, sails.config.secrets.tokenSecret);
    } catch(e) {
        return res.forbidden('Invalid token');
    }
    
    if (payload.exp <= moment().unix()) {
        return res.forbidden('You are not permitted to perform this action.');
    }

    delete req.query.token;

    Users.findOne(payload.sub)
    .then(function (user) {

        req.user = user;
        next();

    }).catch(next);

}


