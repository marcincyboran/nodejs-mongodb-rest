const express = require('express');
const mongoose = require('mongoose');
const { Movie, validateMovie } = require('../models/movies');
const { Genre } = require('../models/genres');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send('Not such genre');

        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                type: genre.type
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })

        await movie.save();

        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            type: genre.type
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);

        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

module.exports = router;