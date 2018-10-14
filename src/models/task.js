//Object Document Mapper (ODM). Permite definir objetos con un esquema fuertemente
// tipado que se asigna a un documento MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    //esquema de la base de datos, se pone uno como ejemplo
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tasks',TaskSchema)