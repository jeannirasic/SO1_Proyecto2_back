const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Proyecto = new Schema({
    Nombre: String,
    Departamento: String,
    Edad: Number,
    Forma: String,
    Estado: String
}, { collection : 'proyecto' });

module.exports = mongoose.model('proyecto',Proyecto);