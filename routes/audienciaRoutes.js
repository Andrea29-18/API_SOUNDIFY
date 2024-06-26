const express = require('express');
const router = express.Router();
const audienciaController = require('../controllers/audienciaController');
const authMiddleware = require('../middleware/authMiddleware');

//Parte del Refresh
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ status: 'error', message: 'Token no proporcionado' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
};

// POST: /api/v2/audiencia/login
router.post('/login', audienciaController.login);

// POST: /api/v2/audiencia
router.post('/', audienciaController.create);

// PUT: /api/v2/audiencia/:nombreUsuario (Protegida)
router.put('/:nombreUsuario', authMiddleware, audienciaController.update);

// DELETE: /api/v2/audiencia/:nombreUsuario (Protegida)
router.delete('/:nombreUsuario', authMiddleware, audienciaController.delete);

router.get('/refresh-token', authenticateJWT, audienciaController.refreshToken);

module.exports = router;