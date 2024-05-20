const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

dotenv.config();

const albumRouter = require('./routes/albumRoutes');
const artistaRouter = require('./routes/artistaRoutes');
const cancionRouter = require('./routes/cancionRoutes');
const generoRouter = require('./routes/generoRoutes');
const usersRouter = require('./routes/audienciaRoutes');

//Siembra de datos
//const seedData = require('./seed/seedAudiencia');
   
const app = express();



app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

connectDB();
//seedData();


// Routes
app.use('/api/v2/album', albumRouter);
app.use('/api/v2/artista', artistaRouter);
app.use('/api/v2/cancion', cancionRouter);
app.use('/api/v2/genero', generoRouter);
app.use('/api/v2/audiencia', usersRouter);
app.get('*', (req,res) => {res.status(404).send() });



//const errorlogger = require('./middlewares/errorlogger.middleware')
//const errorhandler = require('./middlewares/errorhandler.middleware')
//app.use(errorlogger, errorhandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
