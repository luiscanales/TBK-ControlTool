const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const userCtrl = require('../controllers/user.controller');
const router = express.Router();


router.post('/register', userCtrl.createUser);

router.get('/list', userCtrl.getUsers);

// router.get('/:id', userCtrl.getUser);

router.put('/:id', userCtrl.editUser);

router.delete('/delete/:userID', userCtrl.deleteUser);


module.exports = router; 