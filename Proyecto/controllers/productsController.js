const path = require('path')
const productsModels = require("../models/productsModels")
const productsController = {
    listOfProducts: (req, res) => {
        const productList = productsModels.findAll();
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))
        res.render('products/listOfProducts',{productList});
    },
    detail: (req, res) => {
        res.render('products/productsDetail')
    },
    cart: (req,res)=>{
        res.render('products/productsCart')
    }
}
module.exports = productsController