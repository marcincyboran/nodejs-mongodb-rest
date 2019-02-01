const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 144
    },
    isGold: Boolean,
    phone: Number
}));

function validateCustomer(customer) {
    return Joi.validate(customer, {
        name: Joi.string().min(5).max(144).required(),
        phone: Joi.number().required(),
        gold: Joi.bool().required()
    })
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;