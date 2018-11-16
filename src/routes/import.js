/*
npm:    multer
        xlstojson
        xlsxtojson

Por hacer : Modificar los mensajes de errores.
*/

const express = require('express');
const router = express.Router();

//------------------------//

const multer = require('multer');
const archivo = multer({
    dest: './uploads/',
    fileFilter: function(req, file, callback) {
        if (['xls', 'xlsx', 'csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback('Este documento no es soportado.');
        }
        callback(null, true);
    }
});

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const mongoose = require('mongoose');
const fs = require('fs');

const Colaboradores = require('../models/Colaboradores');
const Desvinculados = require('../models/Desvinculados');
const Cruce = require('../models/Cruce')

//-------------------------------------//

/** API path that will upload the files */


//obtener Colab, Desv o Cruce
router.get('/lista', function(req, res) {
    let body = req.body;
    let tipo = body.tipo;
    let mes = body.periodo;
    let año = parseInt(body.año);

    console.log(mes);
    console.log(typeof año);

    if (tipo == 'Colaboradores') {
        Colaboradores.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                lista: listaDB
            });
        });
    } else if (tipo = 'Desvinculados') {
        Desvinculados.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                lista: listaDB
            });
        });
    } else if (tipo == 'Cruce') {
        Cruce.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                lista: listaDB
            });
        });
    }
});



// Ingreso de Colab y Desv 


router.post('/ingreso', archivo.single('file'), function(req, res) {

    let body = req.body;
    let file = req.file;

    /** Multer gives us file info in req.file object */
    if (!file) {
        res.json({ error_code: 1, err_desc: "Error a en la subida de archivo" });
        return;
    }
    /** Check the extension of the incoming file and 
     *  use the appropriate module
     */
    if (file.originalname.split('.')[file.originalname.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }

    try {
        exceltojson({
            input: file.path,
            output: "./uploads/data.json",
            lowerCaseHeaders: true
        }, function(err) {
            if (err) {
                return res.json({ error_code: 1, err_desc: err, data: null });
            } else {

                fs.readFile('./uploads/data.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    obj = JSON.parse(data);
                    console.log(body.tipo)

                    if (body.tipo === 'Desvinculados') {

                        var datos = new Desvinculados({
                            colab: obj,
                            _id: {
                                periodo: body.mes,
                                año: body.año
                            }

                        });

                    } else if (body.tipo === 'Colaboradores') {
                        var datos = new Colaboradores({
                            colab: obj,
                            _id: {
                                periodo: body.mes,
                                año: body.año
                            }
                        });
                    }

                    console.log('vamos a grabar');

                    datos.save((err, active) => {
                        console.log('grabar')
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

                        console.log('grabame')
                        res.json({
                            ok: true,
                            msg: body.tipo + ' Grabados'
                        });
                    });
                });
            }
        });
    } catch (e) {
        res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
    try {
        fs.unlinkSync(file.path);
    } catch (e) {
        //error deleting the file
        console.log('No se pudo eliminar el archivo')
    };

});


router.post('/cruce', function(req, res) {

});

module.exports = router;