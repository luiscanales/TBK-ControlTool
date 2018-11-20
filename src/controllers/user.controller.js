'use stricts'

const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userCtrl = {};

userCtrl.createUser = async(req, res, next) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('No fue posible registrar debido a mail registrado anteriormente.');

    user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let payload = { subject: userDB._id }
            let token = jwt.sign(payload, 'TBKCTSecretKey')
            res.json({
                ok: true,
                user: token
            })
        })
}

userCtrl.getUsers = async (req, res) => {
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
    const user = await User.findById(req.params._id);
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