const Album = require('../models/Album');

const getAllAlbums = async (req, res) => {
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

const getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const album = await Album.findById(id);
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

const saveAlbum = async (req, res) => {
    const body = req.body;
    try {
        const newAlbum = await Album.create(body);
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

const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAlbum = await Album.findByIdAndDelete(id);
        if (!deletedAlbum) {
            return res.status(404).json({
                status: 'error',
                message: 'Álbum no encontrado'
            });
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

const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedAlbum) {
            return res.status(404).json({
                status: 'error',
                message: 'Álbum no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Álbum actualizado correctamente',
            data: {
                album: updatedAlbum
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
    getAllAlbums,
    getAlbumById,
    saveAlbum,
    deleteAlbum,
    updateAlbum
}