const Cancion = require('../models/Cancion');
const ArtistaM = require('../models/Artista');
const AlbumM = require('../models/Album');
const grpcClient = require('../grpcClient');
const fs = require('fs');
const path = require('path');

let self = {}

// Crear una nueva canción y subir el archivo de audio
self.create = async (req, res) => {
  try {
    const { NombreCancion, Idioma, Artista, Album, audioPath } = req.body;

    // Verificar que todos los campos requeridos están presentes
    if (!NombreCancion || !Idioma || !Artista || !Album || !audioPath) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios: NombreCancion, Idioma, Artista, Album y audioPath.'
      });
    }

    const artista = await ArtistaM.findOne({ NombreArtista: Artista });
    const album = await AlbumM.findOne({ NombreAlbum: Album });

    if (!artista || !album) {
      return res.status(404).json({
        status: 'error',
        message: 'Artista o Album no encontrado.'
      });
    }


    // Crear el registro de la nueva canción en la base de datos
    const nuevaCancion = await Cancion.create({
      NombreCancion,
      Idioma,
      Artista: artista._id,
      Album: album._id
    });

    // Construir el nombre del archivo en el formato deseado
    const formattedFileName = `${Artista}${Album}${NombreCancion}${path.extname(audioPath)}`;
    const stream = fs.createReadStream(audioPath);

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
      call.write({
        data: chunk,
        nombre: formattedFileName
      });
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
}

// Descargar el archivo de audio para una canción específica
self.getCancion = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la canción en la base de datos por su ID
    const cancion = await Cancion.findById(id);
    if (!cancion) {
      return res.status(404).json({
        status: 'error',
        message: 'Canción no encontrada.'
      });
    }

    // Definir la ruta del archivo de audio
    const audioPath = path.join(__dirname, 'audio', `${cancion.NombreCancion}.mp3`);

    // Verificar si el archivo de audio existe
    if (!fs.existsSync(audioPath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Archivo de audio no encontrado.'
      });
    }

    // Crear una llamada a gRPC para descargar el archivo de audio
    const call = grpcClient.downloadAudio({ nombre: `${cancion.NombreCancion}.mp3` });

    // Crear un stream para la respuesta
    res.setHeader('Content-Type', 'audio/mpeg');
    call.on('data', (chunk) => {
      res.write(chunk.data);
    });

    call.on('end', () => {
      res.end();
    });

    call.on('error', (error) => {
      console.error('Error descargando el archivo:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error al descargar el archivo de audio.'
      });
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en el servidor.'
    });
  }
}

module.exports = self;