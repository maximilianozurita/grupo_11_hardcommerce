const express = require('express')
const productsRoutes = express.Router()

const productsController = require('../controllers/productsController')

//--------------------VISTA CLIENTES--------------------------------

productsRoutes.get('/listOfProducts', productsController.listOfProducts) //-->>listado de productos
productsRoutes.get('/detail/:id', productsController.detail)               //-->>Detalle de producto seleccionado.
productsRoutes.get('/cart',productsController.cart)                        //-->>Carrito de compras.

//-------------------VISTA ADMINISTRADOR------------------------------

productsRoutes.get("/",productsController.products) //-->>LISTADO DE PRODUCTOS

//Create:
productsRoutes.get("/productCreate", productsController.formNew) //-->> Pagina de creacion.
productsRoutes.post("/productCreate",productsController.store)
//Edition
productsRoutes.get("/productEdition/:id", productsController.edit)
productsRoutes.put("/productEdition/:id", productsController.update)

productsRoutes.delete("/:id", productsController.destroy)




module.exports = productsRoutes