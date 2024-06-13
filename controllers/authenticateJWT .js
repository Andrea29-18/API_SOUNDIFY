const express = require('express');
const router = express.Router();
const audienciaController = require('../controllers/audienciaController');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Middleware para autenticar el token JWT
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

module.exports = authenticateJWT;  