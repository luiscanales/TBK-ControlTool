'use strict'

const jwt = require('jwt')
const moment = require('moment')
const config = require('../config')

function isAuth (req, res next) {
    if (!req.headers.authorization){
        return res.status(403).send({ message: 'No tienes autorización para esta acción.'})
    }

    const token = req.headers.authorization.split(" ")[1]

}