// Third party imports
const express = require('express');

//Local imports
const usersRouter = require('./routes/user')

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/users', usersRouter);

// Este disponible y que escuche cuando se le llame
app.listen(3500, () => {
    console.log('Listening');
});