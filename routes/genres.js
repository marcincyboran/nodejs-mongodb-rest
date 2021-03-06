const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Genre, validateGenre } = require('../models/genres');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre with this id no exist');
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        type: req.body.type
    })

    await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        type: req.body.type
    }, { new: true });
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
});

module.exports = router;