const uuid = require('uuid').v4;

const getAllProducts = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            products: '<products>'
        }
    })

}

module.exports = {
    getAllProducts,
}