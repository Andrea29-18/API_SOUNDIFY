const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

// GET: /api/v2/genero
router.get('/', generoController.getAllGeneros);

// GET: /api/v2/genero/:nombreGenero
router.get('/:nombreGenero', generoController.getGeneroByNombre);

module.exports = router;
