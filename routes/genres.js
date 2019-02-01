const express = require('express');
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genres');

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
    const validate = validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    let genre = new Genre({
        type: req.body.type
    })

    try {
        genre = await genre.save();
        res.send(genre);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    const validate = validate(req.body);
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

module.exports = router;