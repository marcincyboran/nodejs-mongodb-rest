const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    date: { type: Date, default: Date.now }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(genre) {
    return Joi.validate(genre, {
        type: Joi.string().min(3).max(255).required()
    })
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenres;
