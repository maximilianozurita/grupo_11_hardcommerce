const express = require('express')
const productsRoutes = express.Router()

const productsController = require('../controllers/productsController')

productsRoutes.get('/listaDeArticulos', productsController.listaDeArticulos)
productsRoutes.get('/detail/:id', productsController.detail)

module.exports = productsRoutes