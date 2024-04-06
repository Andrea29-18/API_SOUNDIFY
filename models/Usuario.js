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
    contraseña: {
        type: String,
        maxlength: 100
    },
    numeroTelefonico: {
        type: String,
        maxlength: 10
    },
    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artista'
    }
});

const User = mongoose.model('Usuario', usuarioSchema);

module.exports = User;