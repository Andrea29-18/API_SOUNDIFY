const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true,
        maxlength: 320
    },
    nombreDeUsuario: {
        type: String,
        maxlength: 25
    },
    password: {
        type: String,
        maxlength: 100
    }
});

const User = mongoose.model('Usuario', usuarioSchema);

module.exports = User;