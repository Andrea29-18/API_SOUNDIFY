const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionController');

// Ruta para crear una canción
router.post('/', cancionController.create);

// Ruta para obtener el audio de una canción por ID
router.get('/:id', cancionController.getCancion);

module.exports = router;
