const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();


const albumRouter = require('./routes/albumRoutes');
const artistaRouter = require('./routes/artistaRoutes');
const cancionRouter = require('./routes/cancionRoutes');
const generoRouter = require('./routes/generoRoutes');
const usersRouter = require('./routes/usuarioRoutes');

   
const app = express();

app.use(express.json());

connectDB();


// Routes
app.use('/api/v1/album', albumRouter);
app.use('/api/v1/artista', artistaRouter);
app.use('/api/v1/cancion', cancionRouter);
app.use('/api/v1/genero', generoRouter);
app.use('/api/v1/usuario', usersRouter);
//app.get('*', ())


const errorhandler = require('./middleware/errorhandler')
app.use(errorhandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
