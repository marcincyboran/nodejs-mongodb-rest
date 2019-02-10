const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById( req.user._id ).select('-password');
        res.send(user);
    } catch (ex) {
        res.status(500).send(ex.message);        
    }
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('This e-mail is already in use.');
        
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        
        await user.save();
        
        const token = await user.genAuthToken();

        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;