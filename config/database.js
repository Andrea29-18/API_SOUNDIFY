/*const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;*/

//LOCAL
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/Soundify';

module.exports = () => {
  const connect = () => {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
