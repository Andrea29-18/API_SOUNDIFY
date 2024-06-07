const User = require('../models/Audiencia');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = '5f9b327ba659bad1da6609494f4a0157ae3e21e2f4ccd44cfcb42e8dbe3c226531738d'

let self = {};


self.create = async (req, res) => {
    const { Correo, NombreUsuario, Password, NumeroTelefonico } = req.body;
    try {
        const existingUser = await User.findOne({ Correo });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            Correo,
            NombreUsuario,
            Password: hashedPassword,
            NumeroTelefonico
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}

self.login = async (req, res) => {
    const { NombreUsuario, Password } = req.body;
    try {
        const user = await User.findOne({ NombreUsuario });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign({
            userId: user._id,
            NombreUsuario: user.NombreUsuario,
            Correo: user.Correo
        }, jwtSecret, { expiresIn: '30m' });

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token: token,
            data: {
                user: user
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}

self.update = async (req, res) => {
    const { nombreUsuario } = req.params;
    const newData = req.body;

    try {
        if (!nombreUsuario) {
            console.log('Nombre de usuario no proporcionado');
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un nombre de usuario para actualizar al usuario'
            });
        }

        const filter = { NombreUsuario: nombreUsuario };
        console.log('Filtro de búsqueda:', filter);

        const updatedUser = await User.findOneAndUpdate(filter, newData, { new: true });

        if (!updatedUser) {
            console.log('Usuario no encontrado:', filter);
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente',
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}



self.delete = async (req, res) => {
    const { NombreUsuario } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ NombreUsuario });

        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Usuario eliminado correctamente',
            data: {
                user: deletedUser
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}

module.exports = self;