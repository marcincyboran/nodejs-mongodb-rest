const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/db-genres', { useMongoClient: true })
        .then((result) => {
            winston.info(`DB connected.`);
            console.log(`DB connected.`);
        })
        .catch (error => winston.error(`DB connection failed.`));
}