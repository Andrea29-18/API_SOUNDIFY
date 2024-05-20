const express = require('express');
const router = express.Router();
const audienciaController = require('../controllers/audienciaController');

// POST: /api/v2/audiencia/login
router.post('/login', audienciaController.login);

// POST: /api/v2/audiencia
router.post('/', audienciaController.create);

// PUT /api/v2/audiencia/:nombreUsuario
router.put('/:nombreUsuario', audienciaController.update);

// DELETE /api/v2/audiencia/:nombreUsuario
router.delete('/:nombreUsuario', audienciaController.delete);

module.exports = router;
