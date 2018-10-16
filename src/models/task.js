//Object Document Mapper (ODM). Permite definir objetos con un esquema fuertemente
// tipado que se asigna a un documento MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesvSchema = new Schema({
    //esquema de la base de datos, esta vez corresponde a solucion tbkct
    id: Number,
    nombre: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('desvinculaciones',DesvSchema)