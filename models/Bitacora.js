const mongoose = require('mongoose');

const BitacoraSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    usuario: { 
        type: String, 
        required: true 
    },
    perfil: { 
        type: String, 
        enum: ['Artista', 'Audiencia'], 
        required: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);
