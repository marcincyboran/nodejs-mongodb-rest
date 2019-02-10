require('express-async-errors');
const winston = require('winston');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const homeRouter = require('./routes/home');
const customersRouter = require('./routes/customers');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const rentalsRouter = require('./routes/rentals');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const config = require('config');
const error = require('./middleware/error');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log('ERROR - projekt1_jwtPrivateKey is not defined');
    process.exit(1);
}

winston.configure({
    transports: [
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });

// CONNECT TO DB
mongoose.connect('mongodb://localhost/db-genres', { useMongoClient: true })
.then(result => console.log(`Connecting to db... Done.`))
.catch(error => console.log(`Failed to connect...`));

// Middleware functions
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ROUTES AFTER OTHER USES
app.use('/', homeRouter);
app.use('/api/customers', customersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Middleware error function - last in queue
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up. Listening on port ${port}...`)
});