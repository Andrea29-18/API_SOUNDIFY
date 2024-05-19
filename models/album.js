const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
  NombreAlbum: { 
    type: String, 
    maxlength: 72,
    required: true 
  },
  Descripcion: { 
    maxlength: 72,
    type: String 
  },
  FechaCreacion: { 
    type: Date, 
    default: Date.now },
  Artista: { 
    type: Schema.Types.ObjectId, 
    ref: 'Artista', 
    required: true 
  }, // Relación con Artista
  GeneroMusical: { 
    type: Schema.Types.ObjectId, 
    ref: 'GeneroMusical', 
    required: true 
  } // Relación con Genero Musical
});

module.exports = mongoose.model('Album', albumSchema);
