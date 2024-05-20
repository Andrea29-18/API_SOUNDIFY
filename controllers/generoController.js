const Genero = require('../models/GeneroMusical');

let self = {};

self.getAllGeneros = async (req, res) => {
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

self.getGeneroByNombre = async (req, res) => {
    const { nombreGenero } = req.params;
    try {
        const genero = await Genero.findOne({ NombreGenero: nombreGenero });
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

module.exports = self;
 