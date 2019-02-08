const express = require('express');
const mongoose = require('mongoose');
const { Genre, validateGenre } = require('../models/genres');

const router = express.Router();

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
    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        type: req.body.type
    })

    try {
        await genre.save();
        res.send(genre);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
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

module.exports = router;