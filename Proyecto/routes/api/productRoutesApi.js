const express=require ("express")
const apiRoutes=express.Router()

const productsController=require("../../controllers/api/productControllerApi")


//--------------------VISTA CLIENTES--------------------------------

apiRoutes.get('/listOfProducts', productsController.listOfProducts) //-->>listado de productos
apiRoutes.get('/detail/:id', productsController.detail)               //-->>Detalle de producto seleccionado.

//-------------------VISTA ADMINISTRADOR------------------------------

apiRoutes.get("/",productsController.products) //-->>LISTADO DE PRODUCTOS


module.exports = apiRoutes;