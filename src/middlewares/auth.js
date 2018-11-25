'use strict'

const jwt = require('jsonwebtoken')
// const moment = require('moment')
// const config = require('../config')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token){
        return res.status(401).send({ message: 'No tienes autorización para esta acción.'})
    }

    try {
        const decoded = jwt.verify(token, 'TBKCTjwtPrivateKey');
        req.user = token;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}