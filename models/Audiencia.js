const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const audienciaSchema = new Schema({
    NombreUsuario: { 
        type: String, 
        required: true, 
        unique: true 
    },
    Password: { 
        type: String, 
        required: true,
        match: [
            /^(?=.*[!@#$%^&*()\-_+=|\\{}[\]:;'"<>,.?\/])(?=.*\d.*\d.*\d)(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z]).{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, mínimo 2 signos especiales, mínimo 3 números, mínimo 2 letras minúsculas y mínimo 2 letras mayúsculas.'
        ],
        required: true
    },
    Correo: { 
        type: String, 
        maxlength: 320, 
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido'], 
        required: true 
    },
    NumeroTelefonico: { 
        type: String, 
        maxlength: 10, 
        required: true 
    },
    Canciones: { 
        type: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Cancion' 
        }], 
        default: [] 
    }
});

module.exports = mongoose.model('Audiencia', audienciaSchema);
