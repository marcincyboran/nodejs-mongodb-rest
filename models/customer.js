const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isGold: Boolean,
    phone: Number
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    return Joi.validate(customer, {
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.number().required(),
        gold: Joi.bool().required()
    })
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;