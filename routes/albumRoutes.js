const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// GET: /api/v2/album
router.get('/', albumController.getAllAlbums);

// GET: /api/v2/album/:nombre
router.get('/:nombre', albumController.getAlbumByName);

// POST: /api/v2/album
router.post('/', albumController.create);

// PUT: /api/v2/album/:nombre
router.delete('/:nombre', albumController.delete);

module.exports = router;
