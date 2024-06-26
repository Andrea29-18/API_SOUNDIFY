const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
require('dotenv').config({ path: './config/.env' });


dotenv.config();


const albumRouter = require('./routes/albumRoutes');
const artistaRouter = require('./routes/artistaRoutes');
const cancionRouter = require('./routes/cancionRoutes');
const generoRouter = require('./routes/generoRoutes');
const audienciaRouter = require('./routes/audienciaRoutes');
const bitacoraRouter = require('./routes/bitacoraRoutes');


//Siembra de datos
//const seedAudiencia = require('./seed/seedAudiencia');
//const seedArtista = require('./seed/seedArtista');
//const seedGenero = require('./seed/seedGenero');
//const seedAlbum = require('./seed/seedAlbum');

const app = express();


app.use(express.json());

//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

try {
    connectDB();
} catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Internal Server Error');
}

//seedAudiencia();
//seedArtista();
//seedGenero();
//seedAlbum();

// Routes
app.use('/api/v2/album', albumRouter);
app.use('/api/v2/artista', artistaRouter);
app.use('/api/v2/cancion', cancionRouter);
app.use('/api/v2/generos', generoRouter);
app.use('/api/v2/audiencia', audienciaRouter);
app.use('/api/v2/bitacora', bitacoraRouter);
app.get('*', (req,res) => {res.status(404).send() });



const errorlogger = require('./middleware/errorloggerMiddleware')
const errorhandler = require('./middleware/errorhandlerMiddleware')
app.use(errorlogger, errorhandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
