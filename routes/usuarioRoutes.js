const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, usuarioController.getAllUsers);
router.get('/:id', usuarioController.getUserByIdOrCorreo);
router.post('/', usuarioController.saveUser);
router.delete('/:id', usuarioController.deleteUser);
router.patch('/:id',usuarioController.updateUser);

module.exports = router;
