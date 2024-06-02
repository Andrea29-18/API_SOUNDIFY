const jwt = require('jsonwebtoken');
const jwtSecret = '5f9b327ba659bad1da6609494f4a0157ae3e21e2f4ccd44cfcb42e8dbe3c226531738d'

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token no válido' });
    }
};

module.exports = authMiddleware;
