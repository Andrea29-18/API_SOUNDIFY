const express = require('express');
const router = express.Router();
const audienciaController = require('../controllers/audienciaController');
const authMiddleware = require('../middleware/authMiddleware');

// POST: /api/v2/audiencia/login
router.post('/login', audienciaController.login);

// POST: /api/v2/audiencia
router.post('/', audienciaController.create);

// PUT: /api/v2/audiencia/:nombreUsuario (Protegida)
router.put('/:nombreUsuario', authMiddleware, audienciaController.update);

// DELETE: /api/v2/audiencia/:nombreUsuario (Protegida)
router.delete('/:nombreUsuario', authMiddleware, audienciaController.delete);

module.exports = router;
