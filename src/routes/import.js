/*
npm:    multer
        xlstojson
        xlsxtojson

Por hacer : Ingresar data.json a la base de datos.
            Modificar los mensajes de errores.
*/

const express = require('express');
const router = express.Router();

//------------------------//

const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

//-------------------------------------//

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = new Date();
        cb(null, file.originalname)
            // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});


//multer settings
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (['xls', 'xlsx', 'csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Este documento no es soportado.'));
        }
        callback(null, true);
    }
}).single('file');


/** API path that will upload the files */
router.post('/upload', function(req, res) {
    var exceltojson;
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "Error a en la subida de archivo" });
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: "./uploads/data.json",
                lowerCaseHeaders: true
            }, function(err) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                res.json('Ingresando a base de datos');

                // Ingreso a base de datos.

            });
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }

        var fs = require('fs');
        try {
            fs.unlinkSync(req.file.path);
        } catch (e) {
            //error deleting the file
        }

    })

});



module.exports = router;