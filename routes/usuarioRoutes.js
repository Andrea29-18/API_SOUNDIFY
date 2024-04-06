const express = require('express');
const router = express.Router();

const {
    deleteUser,
    getAllUsers,
    getUserByIdOrCorreo,
    updateUser,
    saveUser,
} = require('../controllers/usuarioController');


router.get('/', getAllUsers);
router.get('/:id',getUserByIdOrCorreo);
router.post('/',saveUser);
router.delete('/:id', deleteUser);
router.patch('/:id',updateUser);

module.exports = router;