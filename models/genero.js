const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombreGenero: {
    type: String,
    maxlength: 72
  }
});

const Genero = mongoose.model('Genero', generoSchema);

module.exports = Genero;