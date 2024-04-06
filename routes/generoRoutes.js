const express = require('express');
const router = express.Router();


const {
    getAllGeneros,
    getGeneroById,
    saveGenero,
    deleteGenero,
    updateGenero
} = require('../controllers/generoController');

router.get('/', getAllGeneros);
router.get('/:id', getGeneroById);
router.post('/', saveGenero);
router.delete('/:id', deleteGenero);
router.patch('/:id', updateGenero);

module.exports = router;