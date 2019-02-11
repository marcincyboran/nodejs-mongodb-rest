const express = require('express');
const homeRouter = require('../routes/home');
const customersRouter = require('../routes/customers');
const genresRouter = require('../routes/genres');
const moviesRouter = require('../routes/movies');
const rentalsRouter = require('../routes/rentals');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function (app) {

    // Middleware decode req
    app.use(express.json());

    // Routes
    app.use('/', homeRouter);
    app.use('/api/customers', customersRouter);
    app.use('/api/genres', genresRouter);
    app.use('/api/movies', moviesRouter);
    app.use('/api/rentals', rentalsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/auth', authRouter);

    // Middleware error function - last in queue
    app.use(error);
}