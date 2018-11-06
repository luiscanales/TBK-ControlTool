const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.post('/register', async(req, res,next) => {

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Usuario ya registrado.');

    
    user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        // phone: req.body.phone,
        cargo: req.body.cargo,
        password: bcrypt.hashSync(req.body.password, 12)
    });
    user
        .save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                user: userDB
            })
        })
        
});

router.delete('/:userID', (req, res, next) =>{    
    User.remove({_id: req.params.userID})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Usuario eliminado."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                error: err
            });
        });
});


module.exports = router; 