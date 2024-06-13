const fs = require('fs');
const path = require('path');
const ArtistaM = require('../models/Artista');
const AlbumM = require('../models/Album');
const Cancion = require('../models/Cancion');
const grpcClient = require('../grpcClient');

let self = {};

self.create = async (req, res) => {
  try {
    const { NombreCancion, Idioma, Artista, Album } = req.body;

    // Verificar que todos los campos requeridos están presentes
    if (!NombreCancion || !Idioma || !Artista || !Album || !req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios: NombreCancion, Idioma, Artista, Album y audio.'
      });
    }

    const artista = await ArtistaM.findOne({ NombreArtista: Artista });
    const album = await AlbumM.findOne({ NombreAlbum: Album });

    if (!artista || !album) {
      return res.status(404).json({
        status: 'error',
        message: 'Artista o Álbum no encontrado.'
      });
    }

    // Crear el registro de la nueva canción en la base de datos
    const nuevaCancion = await Cancion.create({
      NombreCancion,
      Idioma,
      Artista: artista._id,
      Album: album._id
    });
    const audioPath = path.join('uploads', req.file.filename); 

    // Llamada a gRPC para subir el archivo de audio
    const call = grpcClient.uploadAudio((error, response) => {
      if (error) {
        console.error('Error al subir el archivo de audio a través de gRPC:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Error al subir el archivo de audio a través de gRPC.'
        });
      }

      // Si la subida a gRPC es exitosa, podemos responder con éxito
      return res.status(201).json({
        status: 'success',
        message: 'Canción creada y archivo de audio subido exitosamente a través de gRPC.',
        data: nuevaCancion
      });
    });

    const formattedFileName = `${Artista}${Album}${NombreCancion}${path.extname(audioPath)}`;
    const stream = fs.createReadStream(audioPath);

    // Enviar el archivo por chunks a través de gRPC
    fs.createReadStream(audioPath)
      .on('data', (chunk) => {
        call.write({
          data: chunk,
          nombre: formattedFileName 
        });
      })
      .on('end', () => {
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


// Verificar si una canción existe y devolver la URL del audio
self.getCancion = async (req, res) => {
  try {
    const { NombreCancion, Artista, Album } = req.body;

    // Verificar que todos los campos requeridos están presentes
    if (!NombreCancion || !Artista || !Album) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios: NombreCancion, Artista y Album.'
      });
    }

    // Buscar la canción en la base de datos
    const artista = await ArtistaM.findOne({ NombreArtista: Artista });
    const album = await AlbumM.findOne({ NombreAlbum: Album });

    if (!artista || !album) {
      return res.status(404).json({
        status: 'error',
        message: 'Artista o Album no encontrado.'
      });
    }

    const cancion = await Cancion.findOne({
      NombreCancion,
      Artista: artista._id,
      Album: album._id
    });

    if (!cancion) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontró una canción con los detalles proporcionados.'
      });
    }

    // Construir la URL con la que se guarda en gRPC
    const audioUrl = `${Artista}${Album}${NombreCancion}${path.extname(cancion.audioPath || '')}`;

    return res.status(200).json({
      status: 'success',
      message: 'Canción encontrada.',
      data: audioUrl
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