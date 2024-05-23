const Cancion = require('../models/Cancion');
const grpcClient = require('../grpcClient');
const fs = require('fs');
const path = require('path');

// Crear una nueva canción y subir el archivo de audio
exports.createCancion = async (req, res) => {
  try {
    const { NombreCancion, Idioma, Artista, Album, audioPath } = req.body;

    // Subir el archivo de audio a través de gRPC
    const fileName = path.basename(audioPath);
    const stream = fs.createReadStream(audioPath);
    const call = grpcClient.uploadAudio((error, response) => {
      if (error) {
        return res.status(500).send('Error subiendo el archivo de audio');
      }
      
      // Crear la canción en la base de datos
      const nuevaCancion = new Cancion({ NombreCancion, Idioma, Artista, Album });
      nuevaCancion.save((err, cancionGuardada) => {
        if (err) {
          return res.status(500).send('Error guardando la canción');
        }
        res.status(201).json(cancionGuardada);
      });
    });

    // Enviar el archivo por chunks
    stream.on('data', (chunk) => {
      call.write({ data: chunk, nombre: fileName });
    });

    stream.on('end', () => {
      call.end();
    });

  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
};

// Descargar el archivo de audio para una canción específica
exports.getCancionAudio = async (req, res) => {
  try {
    const { id } = req.params;

    // Encontrar la canción en la base de datos
    const cancion = await Cancion.findById(id);
    if (!cancion) {
      return res.status(404).send('Canción no encontrada');
    }

    // Descargar el archivo de audio a través de gRPC
    const call = grpcClient.downloadAudio({ nombre: cancion.NombreCancion });
    const filePath = path.join(__dirname, 'temp', `${cancion.NombreCancion}.mp3`);
    const writeStream = fs.createWriteStream(filePath);

    call.on('data', (chunk) => {
      writeStream.write(chunk.data);
    });

    call.on('end', () => {
      writeStream.end();
      res.download(filePath, (err) => {
        if (err) {
          return res.status(500).send('Error descargando el archivo de audio');
        }
        fs.unlinkSync(filePath);  // Elimina el archivo temporal
      });
    });

    call.on('error', (error) => {
      res.status(500).send('Error descargando el archivo de audio');
    });

  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
};
