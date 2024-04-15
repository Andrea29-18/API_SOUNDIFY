// services/usuarioService.js

const usuarioController = require('../controllers/usuarioController');

module.exports = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioController.getAllUsers();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUsuarioById: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await usuarioController.getUserByIdOrCorreo(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createUsuario: async (req, res) => {
    try {
      const body = req.body;
      const usuario = await usuarioController.saveUser();
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'ERROR AQUI' });
    }
  },
  updateUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      const usuario = await usuarioController.updateUser(id, newData);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await usuarioController.deleteUser(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
