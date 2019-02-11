const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.configure({
        transports: [
            new winston.transports.File({
                filename: 'logfile.log',
                handleExceptions: true
            }),
            new winston.transports.MongoDB({
                db: 'mongodb://localhost/db-genres',
                level: 'error',
                handleExceptions: true
            })
        ]
    });

    process.on('unhandledRejection', (ex) => {
        throw new Error(ex);
    });

    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
}