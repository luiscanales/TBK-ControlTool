const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesvSchema = new Schema({
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

    colab: JSON
});

// DesvSchema.index({
//     año: 1,
//     periodo: 1,
// }, {
//     unique: true,
// });

module.exports = mongoose.model('desvinculados', DesvSchema);