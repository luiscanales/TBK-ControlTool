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
const Desviculados = require('../models/Desviculados');


//-------------------------------------//

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './temp/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
            // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var fecha = new Date;
var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");


//multer settings
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (['xls', 'xlsx', 'csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Este documento no es soportado.'));
        }
        callback(null, true);
    }
});


/** API path that will upload the files */

//ingreso Colaboradores.

// router.post('/colab', upload.single('file'), function(req, res) {
//     var exceltojson;
//     let file = req.file;
//     let body = req.body;

//     /** Multer gives us file info in req.file object */
//     if (!file) {
//         res.json({ error_code: 1, err_desc: "Error a en la subida de archivo" });
//         return;
//     }
//     /** Check the extension of the incoming file and 
//      *  use the appropriate module
//      */
//     if (file.originalname.split('.')[file.originalname.split('.').length - 1] === 'xlsx') {
//         exceltojson = xlsxtojson;
//         console.log(body);
//     } else {
//         exceltojson = xlstojson;
//     }

//     console.log(file.path);

//     try {
//         exceltojson({
//             input: file.path,
//             output: "./uploads/data.json",
//             lowerCaseHeaders: true
//         }, function(err) {
//             if (err) {
//                 return res.json({ error_code: 1, err_desc: err, data: null });
//             } else {

//                 fs.readFile('./uploads/data.json', 'utf8', function(err, data) {
//                     if (err) throw err;
//                     obj = JSON.parse(data);

//                     //res.json(obj);
//                     //console.log('datos')

//                     let datos = new Colaboradores({
//                         colab: obj,
//                         periodo: meses[fecha.getMonth()],
//                         año: fecha.getFullYear()
//                     });

//                     console.log('vamos a grabar');

//                     datos.save((err, active) => {
//                         console.log('grabar')
//                         if (err) {
//                             return res.status(400).json({
//                                 ok: false,
//                                 err
//                             });
//                         }

//                         console.log('grabame')
//                         res.json({
//                             ok: true,
//                             datos: active
//                         });
//                     });
//                 });
//             }
//         });
//     } catch (e) {
//         res.json({ error_code: 1, err_desc: "Corupted excel file" });
//     }
//     try {
//         fs.unlinkSync(req.file.path);
//     } catch (e) {
//         //error deleting the file
//     };

// });


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

                        var datos = new Desviculados({
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
        console.log('holi')
    };

});

module.exports = router;