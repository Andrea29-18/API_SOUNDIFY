const express = require('express');
const router = express.Router();

const {
    getAllArtistas,
    getArtistaById,
    saveArtista,
    deleteArtista,
    updateArtista
} = require('../controllers/artistaController');

router.get('/', getAllArtistas);
router.get('/:id', getArtistaById);
router.post('/', saveArtista);
router.delete('/:id', deleteArtista);
router.patch('/:id', updateArtista);

module.exports = router;
