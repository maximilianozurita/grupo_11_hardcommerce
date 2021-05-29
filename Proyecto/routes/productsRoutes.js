const express = require('express')
const productsRoutes = express.Router()

const productsController = require('../controllers/productsController')

productsRoutes.get('/listOfArticles', productsController.listaDeArticulos)
productsRoutes.get('/detail/:id', productsController.detail)
productsRoutes.get('/cart',productsController.cart)

module.exports = productsRoutes