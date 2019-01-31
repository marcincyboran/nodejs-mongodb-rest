const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

const Genre = mongoose.model('Genre', {
    type: String,
    date: { type: Date, default: Date.now },
});


// host/api/genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.send(genres);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('Genre with this id no exist');
        res.send(genre);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    const validate = validateGenres(req.body);
    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    let genre = new Genre({
        type: req.body.type
    })
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const validate = validateGenres(req.body);
    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    try {
        let genre = await Genre.findByIdAndUpdate(req.params.id, {
            type: req.body.type
        }, { new: true });
        res.send(genre);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        res.send(genre);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

function validateGenres(genre) {
    return Joi.validate(genre, {
        type: Joi.string().min(3).required()
    })
}

module.exports = router;