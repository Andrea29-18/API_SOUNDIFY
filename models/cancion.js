const mongoose = require('mongoose');
const { Schema } = mongoose;

const cancionSchema = new Schema({
  NombreCancion: {
     type: String, 
     required: true 
  },
  Idioma: { 
    type: String 
  },
  Album: { 
    type: Schema.Types.ObjectId, 
    ref: 'Album', 
    required: true 
  } // Relación con Album
});

module.exports = mongoose.model('Cancion', cancionSchema);
