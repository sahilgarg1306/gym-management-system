const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({

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

    experience:{
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
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Instructor', instructorSchema);