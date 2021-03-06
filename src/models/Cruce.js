const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CruceSchema = new Schema({
    //esquema de la base de datos, esta vez corresponde a solucion tbkct
    _id: {
        año: {
            type: Number,
            required: true,

        },
        periodo: {
            type: String,
            required: true,
        }
    },
    colab_desv: {
        type: JSON,
        required: true
    }
});

module.exports = mongoose.model('cruce', CruceSchema);