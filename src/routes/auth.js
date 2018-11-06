const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async(req, res,next) => {

    let user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Credenciales (Usuario y/o password) incorrectas.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Credenciales (Usuario y/o password) incorrectas.');

    const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');

    res.send(token);
});

// function validate(req){
//     const schema = {
//         username: Joi.string().min(5).max(48).required().username(),
//         password: Joi.string().min(5).max(48).required()
//     }

//     return Joi.validate(req, schema);
// };


module.exports = router; 