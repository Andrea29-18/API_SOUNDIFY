const { MongoClient } = require('mongodb');

// Conexión a la base de datos
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function seedData() {
  try {
    await client.connect();
    const database = client.db('mi_base_de_datos');
    const collection = database.collection('mi_coleccion');

    // Datos de semilla
    const seedDocuments = [
      { name: 'Usuario1', email: 'usuario1@example.com' },
      { name: 'Usuario2', email: 'usuario2@example.com' },
      // Agrega más documentos según sea necesario
    ];

    // Insertar datos de semilla en la colección
    await collection.insertMany(seedDocuments);
    console.log('Datos de semilla insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos de semilla:', error);
  } finally {
    await client.close();
  }
}

seedData();
