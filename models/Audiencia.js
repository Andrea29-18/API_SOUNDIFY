const mongoose = require('mongoose');
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
    NumeroTelefonico: { 
        type: String, 
        required: true 
    },
    Canciones: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Cancion' 
    }] // Relación con Cancion
});

module.exports = mongoose.model('Audiencia', audienciaSchema);
