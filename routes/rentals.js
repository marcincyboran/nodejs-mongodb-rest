const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const { Rental, validateRental } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');

const router = express.Router();
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
    } catch (ex) {
        res.status(404).send(ex.message);      
    }
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findById(req.body.customerId);
        const movie = await Movie.findById(req.body.movieId);

        if( movie.numberInStock <= 0) return res.status(400).send('This movie is out of stock');

        const rental = new Rental ({
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },
        });

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: {
                    numberInStock: -1
                }
            })
            .run();

        res.send(rental);

    } catch (ex) {
        res.status(404).send(ex.message);              
    }
})

module.exports = router;