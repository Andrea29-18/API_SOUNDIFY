const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Rol', rolSchema);
