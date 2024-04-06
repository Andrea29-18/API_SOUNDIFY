const Cancion = require('../models/Cancion');

const getAllCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.status(200).json({
            status: 'success',
            data: {
                canciones
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

const getCancionById = async (req, res) => {
    const { id } = req.params;
    try {
        const cancion = await Cancion.findById(id);
        if (!cancion) {
            return res.status(404).json({
                status: 'error',
                message: 'Canción no encontrada'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                cancion
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

const saveCancion = async (req, res) => {
    const body = req.body;
    try {
        const newCancion = await Cancion.create(body);
        res.status(201).json({
            status: 'success',
            data: {
                cancion: newCancion
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

const deleteCancion = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCancion = await Cancion.findByIdAndDelete(id);
        if (!deletedCancion) {
            return res.status(404).json({
                status: 'error',
                message: 'Canción no encontrada'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Canción eliminada correctamente',
            data: {
                cancion: deletedCancion
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

const updateCancion = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedCancion = await Cancion.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedCancion) {
            return res.status(404).json({
                status: 'error',
                message: 'Canción no encontrada'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Canción actualizada correctamente',
            data: {
                cancion: updatedCancion
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
    getAllCanciones,
    getCancionById,
    saveCancion,
    deleteCancion,
    updateCancion
}
