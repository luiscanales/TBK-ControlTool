'use stricts'

const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const router = express.Router();

const userCtrl = {};

String.prototype.capitalize = function(allWords) {
    return (allWords) ? // if all words
    this.split(' ').map(word => word.capitalize()).join(' ') : //break down phrase to words then  recursive calls until capitalizing all words
    this.charAt(0).toUpperCase() + this.slice(1); // if allWords is undefined , capitalize only the first word , mean the first char of the whole string
}

userCtrl.createUser = async(req, res, next) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('No fue posible registrar debido a mail registrado anteriormente.');

    user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name.capitalize(true),
        username: req.body.username,
        email: req.body.email,
        position: req.body.position.capitalize(),
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            // let payload = { subject: userDB._id }
            let token = jwt.sign({user: userDB}, 'TBKCTSecretKey')
            res.json({
                ok: true,
                user: token
            })
        })
}

userCtrl.getUsers = async (req, res) => {
    console.log("Hola Yerson");
    console.log("Subject", req.body);
    console.log("Usuario", req.token);
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({message: `Error al realizar petición: ${err}`})
        if (!users) return res.status(404).send({message: 'No existen usuarios'})

        res.send(200, users)
    })
    // const users = await User.find();
    // res.json(users);
}

userCtrl.deleteUser = (req, res, next) => {
    User.remove({_id: req.params.userID})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Usuario eliminado exitosamente."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                error: err
            });
        });
}

userCtrl.getUser = async(req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
}

userCtrl.editUser = async(req, res) => {
    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) return res.status(500).send({message: `Error al realizar petición: ${err}`})

        res.status(200).send({ user: userUpdated })
    })

    // const {id} = req.params;
    // const user = {
    //     position: req.body.position
    // };
    // await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    // res.json('Usuario actualizado.')
}

module.exports = userCtrl;