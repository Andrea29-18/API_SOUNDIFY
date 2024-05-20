const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistaSchema = new Schema({
  NombreArtista: {
    type: String,
    required: true,
    maxlength: 80
  },
  Password: {
    type: String,
    required: true
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
    required: true
  },
  Albumes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Album' 
  }] 
});

const Artista = mongoose.model('Artista', artistaSchema);

module.exports = Artista;