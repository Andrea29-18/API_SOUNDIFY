const uuid = require('uuid').v4;

const MOCK_USERS= [
    {
        id: uuid(),
        name: 'Alejandra',
        country: 'Mexico'
    }
]

const getAllUsers = (req, res) => {
    console.log('Listening to user');

    res.status(200).json({
        status: 'success',
        data: {
            user: MOCK_USERS
        }
    });
}

const saveUser = (req, res) => {
    const body = req.body;

    // TODO: Send user to DB
    const newUser = {
        id:uuid(),
        name:body.name,
        country: body.country,
    }

    MOCK_USERS.push(newUser)

    res.status(201).json({
        status: 'sucesses',
        data:{
            user : newUser
        }
    });
}

module.exports = {
    getAllUsers,
    saveUser,
}