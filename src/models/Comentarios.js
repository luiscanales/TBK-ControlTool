const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
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
    comentario: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('comentarios', ComentarioSchema);