const mongoose = require('mongoose');
const Audiencia = require('../models/Audiencia'); // Asegúrate de que la ruta sea correcta

async function seedData() {
    try {

        // Eliminar todos los documentos existentes
        await Audiencia.deleteMany({});

        const seedData = [
            {
                NombreUsuario: 'usuario1',
                Password: 'password1',
                Correo: 'correo1@example.com',
                NumeroTelefonico: '1234567890',
                Canciones: [] // Aquí puedes poner los IDs de las canciones que quieras asociar
            },
            {
                NombreUsuario: 'usuario2',
                Password: 'password2',
                Correo: 'correo2@example.com',
                NumeroTelefonico: '0987654321',
                Canciones: []
            },
            // Agrega tantos objetos como quieras
        ];

        await Audiencia.insertMany(seedData);

        console.log('Siembra de datos completada');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error durante la siembra de datos:', error);
    }
}

module.exports = seedData;