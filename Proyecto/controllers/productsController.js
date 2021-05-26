const path = require('path')

const productsController = {
    listaDeArticulos: (req, res) => {
        res.sendFile(path.resolve('views/listaDeArticulos.html'))
    },
    detail: (req, res) => {
        res.sendFile(path.resolve('views/productDetail.html'))
    },
}

module.exports = productsController;