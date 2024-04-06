const Artista = require('../models/Artista');

const getAllArtistas = async (req, res) => {
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

const getArtistaById = async (req, res) => {
    const { id } = req.params;
    try {
        const artista = await Artista.findById(id);
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

const saveArtista = async (req, res) => {
    const body = req.body;
    try {
        const newArtista = await Artista.create(body);
        res.status(201).json({
            status: 'success',
            data: {
                artista: newArtista
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

const deleteArtista = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArtista = await Artista.findByIdAndDelete(id);
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

module.exports = {
    getAllArtistas,
    getArtistaById,
    saveArtista,
    deleteArtista,
    updateArtista
}
