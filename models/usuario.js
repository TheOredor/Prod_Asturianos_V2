const mongoose = require('mongoose');

// Definición del schema de Usuarios
let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8
    }
});

// Modelo de los Productos
let Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;
