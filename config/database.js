//NUBE
const mongoose = require('mongoose')
require('dotenv').config()

const DB_URI = 'mongodb+srv://aavp0316:EDN0X8soxBO6OpTU@cluster0.wrh2jsu.mongodb.net/Soundify?retryWrites=true&w=majority&appName=Cluster0'

module.exports = () => {
  const connect = () => {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
      console.error('Error de conexión a la base de datos:', error);
    });
  };

  connect();

  mongoose.connection.on('error', console.error.bind(console, 'Error de conexión MongoDB:'));
  mongoose.connection.on('disconnected', connect);
};


/*LOCAL
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/Soundify';

module.exports = () => {
  const connect = () => {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    
    })
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
      console.error('Error de conexión a la base de datos:', error);
    });
  };

  connect();

  mongoose.connection.on('error', console.error.bind(console, 'Error de conexión MongoDB:'));
  mongoose.connection.on('disconnected', connect);
};
*/