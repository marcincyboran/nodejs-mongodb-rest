const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genres')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,        
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    return Joi.validate(movie, {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;