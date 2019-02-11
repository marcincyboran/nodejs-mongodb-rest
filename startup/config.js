const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        console.log('ERROR - projekt1_jwtPrivateKey is not defined');
        winston.error('ERROR - projekt1_jwtPrivateKey is not defined');
        process.exit(1);
    }
};