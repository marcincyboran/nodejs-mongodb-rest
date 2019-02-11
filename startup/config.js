const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        console.log('ERROR - projekt1_jwtPrivateKey is not defined');
        throw new Error(`ERROR - projekt1_jwtPrivateKey is not defined`)
    }
};