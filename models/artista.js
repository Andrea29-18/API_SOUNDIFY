const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistaSchema = new Schema({
  NombreArtista: {
    type: String,
    required: true,
    maxlength: 72
  },
  DescripcionGeneral: {
    type: String,
    maxlength: 150
  },
  NumeroTelefonico: {
     type: String,
     maxlength: 15
  },
  Albumes: [{ 
    type: Schema.Types.ObjectId, ref: 'Album' 
  }] 
});

const Artista = mongoose.model('Artista', artistaSchema);

module.exports = Artista;