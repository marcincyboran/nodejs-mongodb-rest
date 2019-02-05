const express = require('express');
const mongoose = require('mongoose');
const { Customer, validateCustomer } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
    res.send('get:id')

});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.gold,
        phone: req.body.phone
    });

    try {
        customer = await customer.save();
        res.send(customer)
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true });
        res.send(customer);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        res.send(customer);
    } catch (ex) {
        res.status(404).send(ex.message);
    }
});

module.exports = router;