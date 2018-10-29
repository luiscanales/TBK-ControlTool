//Object Document Mapper (ODM). Permite definir objetos con un esquema fuertemente
// tipado que se asigna a un documento MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    //esquema de la base de datos, se pone uno como ejemplo
    periodo: { type: String, default: 'Octubre' },
    año: { type: Number, default: 2018 },
    colab: JSON
});

module.exports = mongoose.model('tasks', TaskSchema)