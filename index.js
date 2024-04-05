// Third party imports
const express = require('express');
const dotenv = require('dotenv');
const mongose = require('mongoose');

dotenv.config({path : './config.env' });

//Local imports
const usersRouter = require('./routes/user');
const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

mongose.connect(process.env.DB_CONNECTION)
               .then(connection => {
                    console.log('Connected Success');
               })
               .catch(console.log);

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/album',albumRouter);

// Este disponible y que escuche cuando se le llame
app.listen(3500, () => {
    console.log('Listening');
});