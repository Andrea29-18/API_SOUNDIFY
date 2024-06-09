const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const artistaSchema = new Schema({
  NombreArtista: { 
    type: String, 
    required: true, 
    maxlength: 80 
  },
  Password: { 
    type: String, 
    required: true,
    match: [
        /^(?=.*[!@#$%^&*()\-_+=|\\{}[\]:;'"<>,.?\/])(?=.*\d.*\d.*\d)(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z]).{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, mínimo 2 signos especiales, mínimo 3 números, mínimo 2 letras minúsculas y mínimo 2 letras mayúsculas.'
    ]
},
  DescripcionGeneral: { 
    type: String, 
    maxlength: 250 
  },
  NumeroTelefonico: { 
    type: String, 
    maxlength: 10 
  },
  Correo: { 
    type: String, 
    maxlength: 320, 
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido'], 
    required: true 
},
  Albumes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Album' 
  }]
})

const Artista = mongoose.model('Artista', artistaSchema);

module.exports = Artista;
