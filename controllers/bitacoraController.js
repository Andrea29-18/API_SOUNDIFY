const Bitacora = require('../models/Bitacora');

let self = {}

self.getAllBitacoras = async (req, res) => {
  try {
    const bitacoras = await Bitacora.find();
    res.json(bitacoras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

self.createBitacora = async(req, res) => {
  const bitacora = new Bitacora({
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    usuario: req.body.usuario,
    perfil: req.body.perfil
  })

  try {
    const newBitacora = await bitacora.save();
    res.status(201).json(newBitacora);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = self;
