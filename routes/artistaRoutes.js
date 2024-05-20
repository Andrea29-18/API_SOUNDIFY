const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

// GET: /api/v2/artista
router.get('/', artistaController.getAll);

// GET: /api/v2/artista/:nombre
router.get('/:nombre', artistaController.getByNombre);

// POST: /api/v2/artista
router.post('/', artistaController.create);

// PUT: /api/v2/artista/:nombre
router.put('/:nombre', artistaController.update);

// DELETE: /api/v2/artista/:nombre
router.delete('/:nombre', artistaController.delete);

module.exports = router;
