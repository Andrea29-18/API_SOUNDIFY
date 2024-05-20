const mongoose = require('mongoose');
const GeneroMusical = require('../models/GeneroMusical');

async function seedGeneros() {
    try {
        // Eliminar todos los géneros existentes
        await GeneroMusical.deleteMany({});

        // Datos de géneros para sembrar
        const generos = [
            { NombreGenero: 'Rock' },
            { NombreGenero: 'Pop' },
            { NombreGenero: 'Hip Hop' },
            { NombreGenero: 'Electrónica' },
            { NombreGenero: 'Reggae' },
            { NombreGenero: 'Jazz' },
            { NombreGenero: 'Clásica' },
            { NombreGenero: 'R&B' },
            { NombreGenero: 'Folk' },
            { NombreGenero: 'Indie' },
            { NombreGenero: 'Metal' },
            { NombreGenero: 'Country' },
            { NombreGenero: 'Blues' },
            { NombreGenero: 'Soul' },
            { NombreGenero: 'Funk' },
            { NombreGenero: 'Disco' },
            { NombreGenero: 'Reggaeton' },
            { NombreGenero: 'Ska' },
            { NombreGenero: 'Punk' },
            { NombreGenero: 'Gospel' },
            { NombreGenero: 'Rap' },
            { NombreGenero: 'Trap' },
            { NombreGenero: 'Dubstep' },
            { NombreGenero: 'Techno' },
            { NombreGenero: 'House' },
            { NombreGenero: 'Chillout' },
            { NombreGenero: 'Ambient' },
            { NombreGenero: 'New Age' },
            { NombreGenero: 'World' },
            { NombreGenero: 'Latin' }
        ];

        // Insertar los datos de géneros en la base de datos
        await GeneroMusical.insertMany(generos);

        console.log('Semilla de géneros completada de Genero');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error durante la siembra de datos:', error);
    }
}

module.exports = seedGeneros;
