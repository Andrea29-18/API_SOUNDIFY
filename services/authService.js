const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Audiencia = require('../models/Audiencia');
const Artista = require('../models/Artista');
const jwtSecret = process.env.JWT_SECRET;
const ClaimTypes = require('../config/claimtypes');

const GeneraToken = (user) => {
    const token = jwt.sign({
        [ClaimTypes.Name]: user.Correo,
        [ClaimTypes.GivenName]: user.NombreUsuario || user.NombreArtista,
        [ClaimTypes.Role]: user instanceof Audiencia ? 'audiencia' : 'artista',
        "iss": "ServidorFeiJWT",
        "aud": "ClientesFeiJWT"
    }, jwtSecret, {
        expiresIn: '30m',
    });
    return token;
};

const authenticateUser = async (model, identifier, password) => {
    const user = await model.findOne({ Correo: identifier });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    return GeneraToken(user);
};

module.exports = { GeneraToken, authenticateUser };
