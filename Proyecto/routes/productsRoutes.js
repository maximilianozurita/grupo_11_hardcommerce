const express = require('express')
const productsRoutes = express.Router()
const productsController = require('../controllers/productsController')

productsRoutes.get('/listOfProducts', productsController.listOfProducts)
productsRoutes.get('/detail/:id', productsController.detail)
productsRoutes.get('/cart',productsController.cart)


module.exports = productsRoutes