const express = require('express');
const router = express.Router();
const bitacoraService = require('../controllers/bitacoraController');

// Obtener todas las bitácoras
router.get('/', bitacoraService.getAllBitacoras);

// Crear una nueva bitácora
router.post('/', bitacoraService.createBitacora);

module.exports = router;
