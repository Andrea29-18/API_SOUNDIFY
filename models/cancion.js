const mongoose = require('mongoose');
const { Schema } = mongoose;

const cancionSchema = new Schema({
  NombreCancion: {
     type: String, 
     maxlength: 72,
     required: true 
  },
  Idioma: { 
    type: String,
    maxlength: 50
  },
  Album: { 
    type: Schema.Types.ObjectId, 
    ref: 'Album', 
    required: true 
  } // Relación con Album
});

module.exports = mongoose.model('Cancion', cancionSchema);
