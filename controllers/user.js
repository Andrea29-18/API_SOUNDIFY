const MOCK_USERS= [
    {
        id: '1',
        name: 'Alejandra',
        country: 'Mexico'
    }
]

const getAllUsers = (req, res) => {
    console.log('Listening to user');

    res.json({
        status: 'success',
        data: {
            user: MOCK_USERS
        }
    });
}

const saveUser = (req, res) => {
    res.send('Saving!!');
}

module.exports = {
    getAllUsers,
    saveUser,
}