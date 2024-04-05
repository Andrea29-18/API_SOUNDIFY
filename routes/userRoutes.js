const express = require('express');

const {
    deleteUser,
    getAllUsers,
    getUserByIdOrCorreo,
    updateUser,
    saveUser,
} = require('./../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id',getUserByIdOrCorreo);

router.post('/',saveUser);

router.delete('/:id', deleteUser);

router.patch('/:id',updateUser);

module.exports = router;