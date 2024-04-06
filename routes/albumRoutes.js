const express = require('express');
const router = express.Router();

const {
    getAllAlbums,
    getAlbumById,
    saveAlbum,
    deleteAlbum,
    updateAlbum
} = require('../controllers/albumController');

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/', saveAlbum);
router.delete('/:id', deleteAlbum);
router.patch('/:id', updateAlbum);

module.exports = router;
