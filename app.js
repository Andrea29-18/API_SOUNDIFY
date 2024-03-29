// Third party imports
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path : './config.env' });

//Local imports
const usersRouter = require('./routes/user');
const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/album',albumRouter);

// Este disponible y que escuche cuando se le llame
app.listen(3500, () => {
    console.log('Listening');
});