const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(401).json({ status: 'error', message: 'No se proporcionó un token de autenticación' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: 'error', message: 'Token inválido' });
    }
};
