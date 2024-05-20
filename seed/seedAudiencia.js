const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Audiencia = require('../models/Audiencia');

async function seedAudienciaData() {
    try {
        // Eliminar todos los documentos existentes
        await Audiencia.deleteMany({});

        const seedData = [
            {
                NombreUsuario: 'usuario1',
                Password: 'password1',
                Correo: 'correo1@example.com',
                NumeroTelefonico: '1234567890',
                Canciones: []
            },
            {
                NombreUsuario: 'usuario2',
                Password: 'password2',
                Correo: 'correo2@example.com',
                NumeroTelefonico: '0987654321',
                Canciones: []
            },
            {
                NombreUsuario: 'usuario3',
                Password: 'password3',
                Correo: 'correo3@example.com',
                NumeroTelefonico: '1122334455',
                Canciones: []
            },
            {
                NombreUsuario: 'usuario4',
                Password: 'password4',
                Correo: 'correo4@example.com',
                NumeroTelefonico: '2233445566',
                Canciones: []
            },
            {
                NombreUsuario: 'usuario5',
                Password: 'password5',
                Correo: 'correo5@example.com',
                NumeroTelefonico: '3344556677',
                Canciones: []
            },
        ];

        // Encriptar las contraseñas antes de insertar los datos en la base de datos
        const seededDataWithHashedPasswords = await Promise.all(seedData.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.Password, 10); // 10 es el costo del hashing
            return {
                ...user,
                Password: hashedPassword
            };
        }));

        await Audiencia.insertMany(seededDataWithHashedPasswords);

        console.log('Siembra de datos de audiencia completada');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error durante la siembra de datos de audiencia:', error);
    }
}

module.exports = seedAudienciaData;
