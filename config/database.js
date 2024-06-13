const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const DB_URI = process.env.DB_URI_LOCAL;
const DB_URI_NUBE = process.env.DB_CONNECTION;


/*NUBE
module.exports = () => {
  const connect = () => {
    mongoose.connect(DB_URI_NUBE, {
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

//LOCAL

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