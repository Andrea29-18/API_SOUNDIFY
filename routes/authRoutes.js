const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authService');
const Audiencia = require('../models/Audiencia');
const Artista = require('../models/Artista');

router.post('/login', async (req, res) => {
    const { correo, password, tipoUsuario } = req.body;
    try {
        let token;
        if (tipoUsuario === 'audiencia') {
            token = await authenticateUser(Audiencia, correo, password);
        } else if (tipoUsuario === 'artista') {
            token = await authenticateUser(Artista, correo, password);
        } else {
            return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
