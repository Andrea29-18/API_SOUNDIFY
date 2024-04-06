const Genero = require('../models/Genero');

const getAllGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.status(200).json({
            status: 'success',
            data: {
                generos
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

const getGeneroById = async (req, res) => {
    const { id } = req.params;
    try {
        const genero = await Genero.findById(id);
        if (!genero) {
            return res.status(404).json({
                status: 'error',
                message: 'Género no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                genero
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

const saveGenero = async (req, res) => {
    const body = req.body;
    try {
        const newGenero = await Genero.create(body);
        res.status(201).json({
            status: 'success',
            data: {
                genero: newGenero
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

const deleteGenero = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGenero = await Genero.findByIdAndDelete(id);
        if (!deletedGenero) {
            return res.status(404).json({
                status: 'error',
                message: 'Género no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Género eliminado correctamente',
            data: {
                genero: deletedGenero
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

const updateGenero = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedGenero = await Genero.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedGenero) {
            return res.status(404).json({
                status: 'error',
                message: 'Género no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Género actualizado correctamente',
            data: {
                genero: updatedGenero
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
    getAllGeneros,
    getGeneroById,
    saveGenero,
    deleteGenero,
    updateGenero
}
