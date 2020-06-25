const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
    Nombre: String,
    Departamento: String,
    Edad: Number,
    Forma: String,
    Estado: String
});

module.exports = mongoose.model('proyecto',ProyectoSchema);