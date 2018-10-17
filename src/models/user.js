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
        trim: true
    },
    // phone:{
    //     type: Number,
    //     unique: true,
    //     trim: true,
    //     required: true
    // },
    cargo:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    // passwordConf: {
    //     type: String,
    //     required: true,
    // }
});

module.exports = mongoose.model('User', userSchema);