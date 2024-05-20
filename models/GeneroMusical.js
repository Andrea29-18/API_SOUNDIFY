const mongoose = require('mongoose');
const { Schema } = mongoose;

const generoMusicalSchema = new Schema({
  NombreGenero: { 
    type: String, 
    maxlength: 72,
    required: true, 
    unique: true 
  }
});

module.exports = mongoose.model('GeneroMusical', generoMusicalSchema);
