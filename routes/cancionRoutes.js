const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionController');

router.post('/canciones', cancionController.createCancion);
router.get('/canciones/:id/audio', cancionController.getCancionAudio);

module.exports = router;
