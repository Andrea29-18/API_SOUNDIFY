/*routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuarioService');

// Definición de rutas y asignación de funciones de controlador
router.get('/', usuarioService.getAllUsuarios);
router.get('/:id', usuarioService.getUsuarioById);
router.post('/', usuarioService.createUsuario);
router.put('/:id', usuarioService.updateUsuario);
router.delete('/:id', usuarioService.deleteUsuario);

module.exports = router;*/

const express = require('express');
const router = express.Router();

const {
    deleteUser,
    getAllUsers,
    getUserByIdOrCorreo,
    updateUser,
    saveUser,
} = require('../controllers/usuarioController');


router.get('/', getAllUsers);
router.get('/:id',getUserByIdOrCorreo);
router.post('/',saveUser);
router.delete('/:id', deleteUser);
router.patch('/:id',updateUser);

module.exports = router;
