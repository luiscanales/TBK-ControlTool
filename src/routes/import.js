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


// router.put('/ingresoSingular',function(req,res){
//     let body  = req.body;
//     let mes = body.periodo;
//     let año = body.año;
//     let tipo = body.tipo;
//     let sujeto = {
//         id: body.id,
//         nombre: body.nombre,
//         cargo: body.cargo
//     }

//     Colaboradores.find({_id:{periodo:mes,año:año}},function(req,usuarioDB){

//     });
// });


//obtener Colab, Desv o Cruce
router.post('/lista', function(req, res) {
    let body = req.body;
    let tipo = body.tipo;
    let mes = body.periodo;
    let año = parseInt(body.año);
    console.log(tipo, mes, año)
        /** API path that will upload the files */
    if (tipo == 'Colaboradores') {
        Colaboradores.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (listaDB[0] == undefined) {
                res.status(400).json({
                    ok: false,
                    msg: 'No existe Colaboradores en de datos en la DB'
                });

            } else {
                res.json({
                    ok: true,
                    lista: listaDB
                });
            };
        });

    } else if (tipo == 'Desvinculados') {
        Desvinculados.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (listaDB[0] == undefined) {
                res.status(400).json({
                    ok: false,
                    msg: 'No existe Desvinculados en de datos en la DB'
                });

            } else {
                res.json({
                    ok: true,
                    lista: listaDB
                });
            };
        });

    } else if (tipo == 'Cruce') {
        Cruce.find({ _id: { periodo: mes, año: año } }, (err, listaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (listaDB[0] == undefined) {
                res.status(400).json({
                    ok: false,
                    msg: 'No existe Cruce en de datos en la DB'
                });

            } else {
                res.json({
                    ok: true,
                    lista: listaDB
                });
            };
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

                    datos.save((err, active) => {

                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

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
    return res.redirect('/desvinculados');
});


router.post('/borrar', function(req, res) {
    let body = req.body;
    let mes = body.periodo
    let tipo = body.tipo;
    let año = parseInt(body.año)

    if (tipo == 'Colaboradores') {
        Colaboradores.deleteOne({ _id: { periodo: mes, año: año } }, function(err) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (mes === undefined || año === undefined) {
                res.json({
                    ok: false,
                    msg: 'Error al borrar lista de colaboradores.'
                });

            } else {
                res.json({
                    ok: true,
                    msg: 'Se elimino la lista de colaboradores.'
                });
            }
        });
    } else if (tipo == 'Desvinculados') {
        Desvinculados.deleteOne({ _id: { periodo: mes, año: año } }, function(err) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (mes === undefined || año === undefined) {
                res.json({
                    ok: false,
                    msg: 'Error al borrar lista de desvinculados.'
                });

            } else {
                res.json({
                    ok: true,
                    msg: 'Se elimino la lista de desvinculados.'
                });
            }
        });

    } else if (tipo == 'Cruces') {
        Cruce.deleteOne({ _id: { periodo: mes, año: año } }, function(err) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else if (mes === undefined || año === undefined) {
                res.json({
                    ok: false,
                    msg: 'Error al borrar cruce de datos'
                });

            } else {
                res.json({
                    ok: true,
                    msg: 'Se elimino el cruce de datos.'
                });
            }
        });
    }
});

router.post('/cruce', function(req, res) {
    let body = req.body;
    let mes = body.periodo;
    let años = parseInt(body.año);

    Desvinculados.find({ _id: { periodo: mes, año: años } }, (err, desvDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        } else if (desvDB[0] === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe Lista de Desvinculados'
            })

        } else {
            Colaboradores.find({ _id: { periodo: mes, año: años } }, (err, colabDB) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                } else if (colabDB[0] === undefined) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No existe Lista de Colaboradores'
                    });

                } else {

                    var arr = [];

                    for (let desv of desvDB[0].colab) {
                        for (let colab of colabDB[0].colab) {
                            if (desv.id === colab.id) {
                                arr.push(desv)
                            }
                        }
                    }

                    var cruce = new Cruce({
                        colab_desv: arr,
                        _id: {
                            periodo: mes,
                            año: años
                        }
                    });

                    cruce.save((err, active) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

                        res.json({
                            ok: true,
                            msg: 'Cruce ' + mes + ' ' + años + ' Grabados'
                        });
                    });
                }
            });
        }
    });
    return res.redirect('/desvinculados');
});

module.exports = router;