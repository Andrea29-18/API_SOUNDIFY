const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  nombreAlbum: {
    type: String,
    maxlength: 72
  },
  descripcion: {
    type: String,
    maxlength: 150
  },
  fechaCreacion: Date,
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero',
    required: true
  },
  cancion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cancion'
  }]
});

const Artista = mongoose.model('Artista', artistaSchema);

module.exports = Artista;