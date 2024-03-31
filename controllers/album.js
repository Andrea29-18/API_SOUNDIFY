const User = require('../models/album');

const deleteArtista = async (req, res) => {
    const { id, correo } = req.params;

    try {
        // Verificar si se proporciona un ID o un correo para eliminar al artista
        if (!id && !correo) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un ID o un correo para eliminar al artista'
            });
        }

        let deletedArtista;
        if (id) {
            // Eliminar al artista por su ID
            deletedArtista = await Artista.findByIdAndDelete(id);
        } else {
            // Eliminar al artista por su correo
            deletedArtista = await Artista.findOneAndDelete({ correo });
        }

        if (!deletedArtista) {
            return res.status(404).json({
                status: 'error',
                message: 'Artista no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Artista eliminado correctamente',
            data: {
                artista: deletedArtista
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

const updateArtista = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        // Verificar si se proporciona un ID para actualizar al artista
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requiere proporcionar un ID para actualizar al artista'
            });
        }

        // Actualizar los datos del artista por su ID
        const updatedArtista = await Artista.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedArtista) {
            return res.status(404).json({
                status: 'error',
                message: 'Artista no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Artista actualizado correctamente',
            data: {
                artista: updatedArtista
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

const getAllArtistas = async (req, res) => {
    try {
        // Obtener todos los artistas
        const artistas = await Artista.find();

        res.status(200).json({
            status: 'success',
            data: {
                artistas
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

const getArtistaByIdOrCorreo = async (req, res) => {
    const { id, correo } = req.params;

    try {
        let artista;
        if (id) {
            // Obtener al artista por su ID
            artista = await Artista.findById(id);
        } else {
            // Obtener al artista por su correo
            artista = await Artista.findOne({ correo });
        }

        if (!artista) {
            return res.status(404).json({
                status: 'error',
                message: 'Artista no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                artista
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

const agregarArtista = async (req, res) => {
    const { correo } = req.body;

    try {
        let usuarioExistente = await User.findOne({ correo });

        if (!usuarioExistente) {
            // Si el usuario no existe, crearlo como nuevo usuario
            usuarioExistente = await User.create(req.body);
        }

        // Verificar si el usuario ya es un artista
        if (usuarioExistente.artista) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya es un artista'
            });
        }

        // Actualizar el usuario para indicar que ahora es un artista
        const updatedUser = await User.findByIdAndUpdate(usuarioExistente._id, { artista: true }, { new: true });

        res.status(201).json({
            status: 'success',
            data: {
                usuario: updatedUser
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
    deleteArtista,
    agregarArtista,
    getArtistaByIdOrCorreo,
    getAllArtistas,
    updateArtista
}