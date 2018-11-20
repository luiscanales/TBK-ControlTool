//Object Document Mapper (ODM). Permite definir objetos con un esquema fuertemente
// tipado que se asigna a un documento MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColabSchema = new Schema({
    //esquema de la base de datos, se pone uno como ejemplo
    _id: {
        periodo: {
            type: String,
            required: true,
        },
        año: {
            type: Number,
            required: true,
        }
    },

    colab: JSON
});

// ColabSchema.index({
//     periodo: 1,
//     año: 1,
// }, {
//     unique: true,
// });

module.exports = mongoose.model('colaboradores', ColabSchema);