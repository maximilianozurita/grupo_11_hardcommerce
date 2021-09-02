const express=require ("express")
const apiRoutes=express.Router()

const productsController=require("../../controllers/api/productControllerApi")


//--------------------VISTA CLIENTES--------------------------------

productsRoutes.get('/listOfProducts', productsController.listOfProducts) //-->>listado de productos
productsRoutes.get('/detail/:id', productsController.detail)               //-->>Detalle de producto seleccionado.

//-------------------VISTA ADMINISTRADOR------------------------------

productsRoutes.get("/",productsController.products) //-->>LISTADO DE PRODUCTOS


apiRoutes.get()