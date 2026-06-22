const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    joiningDate: {
        type: Date,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    plan: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'Active'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);