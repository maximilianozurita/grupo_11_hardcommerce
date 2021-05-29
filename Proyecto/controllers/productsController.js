const path = require('path')

const productsController = 
{
    listaDeArticulos: (req, res) => {
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))
        res.render('products/listDeArticulos')
    },
    detail: (req, res) => {
        res.render('products/product-detail')
    },
    cart: (req,res)=>{
        res.render('products/productCart')
    },
}

module.exports = productsController