const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Audiencia = require('../models/Audiencia');
const Artista = require('../models/Artista');

async function seedArtistData() {
    try {
        // Eliminar todos los documentos existentes
        await Artista.deleteMany({});

        // Recuperar tres usuarios de audiencia
        const audienceUsers = await Audiencia.find().limit(3);

        if (audienceUsers.length < 3) {
            throw new Error('No hay suficientes usuarios en la audiencia para crear artistas.');
        }

        // Crear datos de artistas basados en usuarios de audiencia
        const artistSeedData = await Promise.all(audienceUsers.map(async user => {
            const hashedPassword = await bcrypt.hash(user.Password, 10); // Encriptar la contraseña

            return {
                NombreArtista: user.NombreUsuario,
                DescripcionGeneral: `Descripción general del artista ${user.NombreUsuario}`,
                NumeroTelefonico: user.NumeroTelefonico,
                Correo: user.Correo,
                Password: hashedPassword, // Usar la contraseña encriptada
                Albumes: []
            };
        }));

        await Artista.insertMany(artistSeedData);

        console.log('Siembra de datos de artistas completada');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error durante la siembra de datos de artistas:', error);
    }
}

module.exports = seedArtistData;
