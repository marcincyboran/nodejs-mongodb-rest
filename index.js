const express = require('express');
const mongoose = require('mongoose');
const homeRouter = require('./routes/home');
const customersRouter = require('./routes/customers');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');

const app = express();

// CONNECT TO DB
mongoose.connect('mongodb://localhost/db-genres')
    .then(result => console.log(`Connecting to db... Done.`))
    .catch(error => console.log(`Failed to connect...`));

// Parse req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES AFTER OTHER USES
app.use('/', homeRouter);
app.use('/api/customers', customersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up. Listening on port ${port}...`)
});