const User = require('../models/Audiencia');

let self = {}

self.login = async (req, res) => {
    const { nombreUsuario, password } = req.body;
    try {
        const user = await User.findOne({ nombreDeUsuario: nombreUsuario });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            status: 'success',
            //BORRAR ESTA LINEA
            message: 'Inicio de sesión exitoso',
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
};


self.create = async (req, res) => {
    const body = req.body;

    try {
        if (!body.correo || !body.nombreDeUsuario || !body.password || !body.numeroTelefonico) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios'
            });
        }

        const existingUser = await User.findOne({ correo: body.correo });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya existe'
            });
        }

        // Crear un nuevo usuario
        const newUser = await User.create(body);

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


self.delete = async (req, res) => {
    const { correo, nombreUsuario } = req.params;

    try {
        if (!correo && !nombreUsuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un correo o nombre de usuario para eliminar al usuario'
            });
        }

        let filter = {};
        if (correo) {
            filter.correo = correo;
        } else if (nombreUsuario) {
            filter.nombreUsuario = nombreUsuario;
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
    const { correo, nombreUsuario } = req.params;
    const newData = req.body;

    try {
        if (!correo && !nombreUsuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un correo o nombre de usuario para actualizar al usuario'
            });
        }

        let filter = {};
        if (correo) {
            filter.correo = correo;
        } else if (nombreUsuario) {
            filter.nombreUsuario = nombreUsuario;
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