const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  protegido: {
    type: Boolean,
    default: false
  },
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol'
  }
  // Asegúrate de agregar cualquier otra relación o método aquí
});

module.exports = mongoose.model('Usuario', usuarioSchema);
