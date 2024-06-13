const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán temporalmente los archivos

router.post('/', upload.single('audio'), cancionController.create);

// Ruta para obtener el audio de una canción por ID
router.post('/pathAudio', cancionController.getCancion);

module.exports = router;
