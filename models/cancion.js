const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
    nombreCancion: {
      type: String,
      maxlength: 72
    },
    idioma: {
      type: String,
      maxlength: 50
    }
});
  
const Cancion = mongoose.model('Cancion', cancionSchema);

module.exports = Cancion;