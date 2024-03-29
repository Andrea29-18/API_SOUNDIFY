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

const getUserById = (req, res) => {

    const {id} = req.params;

    const user = MOCK_USERS.find(user => user.id == id);

    if(!user){
        return res.status(404).json({
            status: 'failed',
            message: 'User not found, try with a correct id.'
        });
    }

    res.status(200).json({
        status: 'sucessed',
        data:{
            user: user
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

const deleteUser = (req, res) => {

    const {id} = req.params;

    const userIndex = MOCK_USERS.findIndex(user => user.id == id);

    
    if(userIndex === -1){
        return res.status(404).json({
            status: 'failed',
            message: 'User not found, try with a correct id.'
        });
    }



    MOCK_USERS.splice(userIndex, 1);

    res.status(200).json({
        status: 'sucessed',
        data:{
            user: MOCK_USERS
        }
    });
}

const updateUser = (req, res) => {

    const { id } = req.params;

    const userIndex = MOCK_USERS.findIndex(user => user.id === id);

    if(userIndex === -1){
        res.status(404).json({
            status: 'failed',
            message: 'User not found, try with a correct id.'
        });
    }

    MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        ...req.body
    };

    res.status(200).json({
        status: 'sucessed',
        data:{
            user: MOCK_USERS[userIndex]
        }
    });
}

module.exports = {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    saveUser,
}