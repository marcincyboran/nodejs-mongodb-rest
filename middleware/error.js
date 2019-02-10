const winston = require('winston');

module.exports = function(err, req, res, next){
    winston.error(err.message);
    res.status(501).send(err.message);
}