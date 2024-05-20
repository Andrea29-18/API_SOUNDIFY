const Artista = require('../models/Artista');
const Audiencia = require('../models/Audiencia');

let self = {};

// Obtener todos los artistas
self.getAll = async (req, res) => {
    try {
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

// Obtener un artista por nombre
self.getByNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const artista = await Artista.findOne({ NombreArtista: nombre });
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

// Crear un artista a partir de los datos de audiencia
self.create = async (req, res) => {
    const { Correo, DescripcionGeneral } = req.body;

    try {
        // Verificar si el usuario de la audiencia ya existe
        const existingUser = await Audiencia.findOne({ Correo });
        if (!existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario no existe'
            });
        }

        // Verificar si ya existe un artista con el mismo correo
        const existingArtist = await Artista.findOne({ Correo });
        if (existingArtist) {
            return res.status(400).json({
                status: 'error',
                message: 'El artista ya existe con el mismo correo'
            });
        }

        // Crear un nuevo artista con los datos del usuario de la audiencia
        const newArtist = new Artista({
            NombreArtista: existingUser.NombreUsuario,
            Correo: existingUser.Correo,
            NumeroTelefonico: existingUser.NumeroTelefonico,
            DescripcionGeneral: DescripcionGeneral,
            Password: existingUser.Password
        });

        await newArtist.save();

        res.status(201).json({
            status: 'success',
            data: {
                artist: newArtist
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

// Eliminar un artista por nombre
self.delete = async (req, res) => {
    const { nombre } = req.params;
    try {
        const deletedArtista = await Artista.findOneAndDelete({ NombreArtista: nombre });
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

// Actualizar un artista por nombre
self.update = async (req, res) => {
    const { nombre } = req.params;
    const newData = req.body;
    
    try {
        const updatedArtista = await Artista.findOneAndUpdate({ NombreArtista: nombre }, newData, { new: true });
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

module.exports = self;
