const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            data: {
                users
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


const getUserByIdOrCorreo = async (req, res) => {
    const { id, correo } = req.params;

    try {
        let user;
        if (id) {
            // Obtener al usuario por su ID
            user = await User.findById(id);
        } else {
            // Obtener al usuario por su correo
            user = await User.findOne({ correo });
        }

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
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


const saveUser = async (req, res) => {
    const body = req.body;

    try {
        // Validar que se proporcionen todos los campos necesarios
        if (!body.correo || !body.nombreUsuario || !body.password || !body.numeroTelefonico) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios'
            });
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ correo: body.correo });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya existe'
            });
        }

        // Crear un nuevo usuario
        const newUser = await User.create(body);

        // Enviar respuesta con el usuario creado
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        console.error(error);
        // Manejar otros errores de manera adecuada
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}


const deleteUser = async (req, res) => {
    const { id, correo } = req.params;

    try {
        // Verificar si se proporciona un ID o un correo para eliminar al usuario
        if (!id && !correo) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un ID o un correo para eliminar al usuario'
            });
        }

        let deletedUser;
        if (id) {
            // Eliminar al usuario por su ID
            deletedUser = await User.findByIdAndDelete(id);
        } else {
            // Eliminar al usuario por su correo
            deletedUser = await User.findOneAndDelete({ correo });
        }

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


const updateUser = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        // Verificar si se proporciona un ID para actualizar al usuario
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un ID para actualizar al usuario'
            });
        }

        // Actualizar los datos del usuario por su ID
        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente',
            data: {
                user: updatedUser
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


module.exports = {
    deleteUser,
    getAllUsers,
    getUserByIdOrCorreo,
    updateUser,
    saveUser,
}