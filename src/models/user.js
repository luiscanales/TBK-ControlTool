'use strict'

const mongoose = require('mongoose');

// Esquema de usuario
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    position:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        
    }
});

module.exports = mongoose.model('User', userSchema);