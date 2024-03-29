const express = require('express');

const {
    getAllUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} = require('./../controllers/user');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id',getUserById)

router.post('/',saveUser);

router.delete('/:id', deleteUser);

router.patch('/:id',updateUser);

module.exports = router;