const mongoose = require('mongoose');
const Album = require('../models/Album');
const Artista = require('../models/Artista');

async function seedAlbumData() {
    try {
        // Eliminar todos los documentos existentes
        await Album.deleteMany({});

        // Buscar algún artista existente para relacionarlo con los álbumes
        const artistas = await Artista.find();

        const seedData = [
            {
                NombreAlbum: 'Álbum 1',
                Descripcion: 'Descripción del álbum 1',
                Artista: artistas[0]._id, // Relacionar con el primer artista
                GeneroMusical: '664bca7d0efc224da643fcbe'
            },
            {
                NombreAlbum: 'Álbum 2',
                Descripcion: 'Descripción del álbum 2',
                Artista: artistas[1]._id, // Relacionar con el segundo artista
                GeneroMusical: '664bca7d0efc224da643fcbe'
            },
            // Agrega más datos de álbumes según sea necesario
        ];

        await Album.insertMany(seedData);

        console.log('Siembra de datos de álbumes completada');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error durante la siembra de datos de álbumes:', error);
    }
}

module.exports = seedAlbumData;
