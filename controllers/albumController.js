const Album = require('../models/Album');
const Artista = require('../models/Artista');

let self = {};


self.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            status: 'success',
            data: {
                albums
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

self.getAlbumByName = async (req, res) => {
    const { nombre } = req.params;
    try {
        const album = await Album.findOne({ NombreAlbum: nombre });
        if (!album) {
            return res.status(404).json({
                status: 'error',
                message: 'Álbum no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                album
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

self.create = async (req, res) => {
    const { NombreAlbum, Descripcion, ArtistaNombre, GeneroMusical } = req.body;
    try {

        // Buscar al artista por su nombre
        const artista = await Artista.findOne({ ArtistaNombre });
        if (!artista) {
            return res.status(404).json({
                status: 'error',
                message: 'Artista no encontrado'
            });
        }

        // Crear el álbum asociado al artista encontrado
        const newAlbum = await Album.create({ 
            NombreAlbum, 
            Descripcion, 
            Artista: artista._id, 
            GeneroMusical 
        });
        res.status(201).json({
            status: 'success',
            data: {
                album: newAlbum
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
    const { nombre } = req.params;
    try {
        const deletedAlbum = await Album.findOneAndDelete({ NombreAlbum: nombre });
        if (!deletedAlbum) {
            return res.status(404).json({
                status: 'error',
                message: 'Álbum no encontrado'
            });
        }

        // Buscar el artista y eliminar la referencia al álbum eliminado
        const artista = await Artista.findById(deletedAlbum.Artista);
        if (artista) {
            artista.Albumes.pull(deletedAlbum._id);
            await artista.save();
        }

        res.status(200).json({
            status: 'success',
            message: 'Álbum eliminado correctamente',
            data: {
                album: deletedAlbum
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