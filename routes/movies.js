const express = require('express');
const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movies');
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
        // if (!movie) return res.status(404).send('The movie with the given ID was not found.');

        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const genre = await Genre.findById(req.body.genreId);
        // if (!genre) return res.status(400).send('Invalid genre / genreId');
    
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                type: genre.type
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        movie = await movie.save();
        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    // if (!genre) return res.status(400).send('Invalid genre / genreId');

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            type: genre.type
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    // if (!movie) return res.status(404).send('The movie with given ID was not found');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);
        // if (!movie) return res.status(404).send('The movie with the given ID was not found.');

        res.send(movie);
    } catch (ex) {
        res.status(404).send(ex);
    }
});

module.exports = router;