const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user ) return res.status(400).send('Invalid username or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid username or password');

        res.send(true);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

async function validate(req) {
    return Joi.validate(req, {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
    })
}

module.exports = router;