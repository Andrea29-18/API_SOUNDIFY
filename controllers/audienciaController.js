const User = require('../models/Audiencia');
const bcrypt = require('bcrypt');


let self = {}

self.create = async (req, res) => {
    const { Correo, NombreUsuario, Password, NumeroTelefonico } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ Correo });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya existe'
            });
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(Password, 10); // 10 es el costo del hashing

        // Crear un nuevo usuario con la contraseña hasheada
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
        // Buscar al usuario por nombre de usuario
        const user = await User.findOne({ NombreUsuario });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión exitoso'
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
    const { Correo, NombreUsuario } = req.params;

    try {
        if (!Correo && !NombreUsuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un correo o nombre de usuario para eliminar al usuario'
            });
        }

        let filter = {};
        if (Correo) {
            filter.Correo = Correo;
        } else if (NombreUsuario) {
            filter.NombreUsuario = NombreUsuario;
        }

        const deletedUser = await User.findOneAndDelete(filter);

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


self.update = async (req, res) => {
    const { Correo, NombreUsuario } = req.params;
    const newData = req.body;

    try {
        if (!Correo && !NombreUsuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un correo o nombre de usuario para actualizar al usuario'
            });
        }

        let filter = {};
        if (Correo) {
            filter.correo = correo;
        } else if (NombreUsuario) {
            filter.NombreUsuario = NombreUsuario;
        }

        const updatedUser = await User.findOneAndUpdate(filter, newData, { new: true });

        if (!updatedUser) {
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


module.exports = self;