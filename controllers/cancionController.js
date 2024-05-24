const Cancion = require('../models/Cancion');
const grpcClient = require('../grpcClient');
const fs = require('fs');
const path = require('path');

// Crear una nueva canción y subir el archivo de audio
exports.createCancion = async (req, res) => {
  try {
    const { NombreCancion, Idioma, Artista, Album, audioPath } = req.body;

    // Verificar que todos los campos requeridos están presentes
    if (!NombreCancion || !Idioma || !Artista || !Album || !audioPath) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios: NombreCancion, Idioma, Artista, Album y audioPath.'
      });
    }

    // Subir el archivo de audio a través de gRPC
    const fileName = path.basename(audioPath);
    const stream = fs.createReadStream(audioPath);

    // Crear el registro de la nueva canción en la base de datos
    const nuevaCancion = await Cancion.create({
      NombreCancion,
      Idioma,
      Artista,
      Album
    });

    // Llamada a gRPC para subir el archivo de audio
    const call = grpcClient.uploadAudio((error, response) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Error al subir el archivo de audio a través de gRPC.'
        });
      }

      // Guardar la canción en la base de datos después de subir el archivo
      nuevaCancion.save()
        .then(() => {
          return res.status(201).json({
            status: 'success',
            message: 'Canción creada y archivo de audio subido exitosamente.',
            data: nuevaCancion
          });
        })
        .catch((error) => {
          console.error('Error guardando la canción en la base de datos:', error);
          return res.status(500).json({
            status: 'error',
            message: 'Error guardando la canción en la base de datos.'
          });
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
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en el servidor.'
    });
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
