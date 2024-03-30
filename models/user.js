const mongoose = require('mongoose');

const userSheam = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'The name is require']
    },
    correo:String,
    password:String,
    numeroTele:Number
});

const User = mongoose.model('User',userSheam);

module.exports = User;