const path = require('path')

const userController = {
    login: (req, res) => {
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))
        res.render('user/login')
    },
    register: (req, res) => {
        res.render('user/register')
    },
}

module.exports = userController