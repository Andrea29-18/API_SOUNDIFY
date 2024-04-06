const express = require('express');
const router = express.Router();


const {
    getAllCanciones,
    getCancionById,
    saveCancion,
    deleteCancion,
    updateCancion
} = require('../controllers/cancionController');

router.get('/', getAllCanciones);
router.get('/:id', getCancionById);
router.post('/', saveCancion);
router.delete('/:id', deleteCancion);
router.patch('/:id', updateCancion);

module.exports = router;