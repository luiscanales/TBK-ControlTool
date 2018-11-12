const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesvSchema = new Schema({
    //esquema de la base de datos, esta vez corresponde a solucion tbkct
    periodo: {
        type: String,
        required: true,
        index: true,
    },
    año: {
        type: Number,
        required: true,
        index: true,
    },
    colab: JSON
});

DesvSchema.index({
    periodo: 1,
    año: 1,
}, {
    unique: true,
});

module.exports = mongoose.model('desvinculados', DesvSchema);