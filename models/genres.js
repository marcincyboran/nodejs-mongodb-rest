const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 144,
    },
    date: { type: Date, default: Date.now },
}));

function validateGenres(genre) {
    return Joi.validate(genre, {
        type: Joi.string().min(3).required()
    })
}

module.exports.Genre = Genre;
module.exports.validate = validateGenres;