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
})

module.exports = mongoose.model('Audiencia', audienciaSchema);
