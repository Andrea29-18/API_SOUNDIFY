const express = require('express');

const {
    getAllUsers,
    saveUser
} = require('./../controllers/user');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/',saveUser);

module.exports = router;