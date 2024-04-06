// Third party imports
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();


const usersRouter = require('./routes/userRoutes');
const albumRouter = require('./routes/albumRoutes');

const app = express();

app.use(express.json());

connectDB();


// Routes
app.use('/api/v1/users', usersRouter);

app.listen(3500, () => {
    console.log('Listening');
});