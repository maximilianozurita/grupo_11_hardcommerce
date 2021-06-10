const express = require('express')
const productsRoutes = express.Router()
const path=require("path")
const productsController = require('../controllers/productsController')
const multer=require("multer")

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname, "../public/images/imgProducts"))
    },
    filename:(req,file,cb)=>{
        const newFileName="product-"+Date.now()+path.extname(file.originalname);
        cb(null,newFileName);
    }
})
const upload=multer({storage:storage});

//--------------------VISTA CLIENTES--------------------------------

productsRoutes.get('/listOfArticles', productsController.listaDeArticulos) //-->>listado de productos
productsRoutes.get('/detail/:id', productsController.detail)               //-->>Detalle de producto seleccionado.
productsRoutes.get('/cart',productsController.cart)                    //-->>Carrito de compras.

//-------------------VISTA ADMINISTRADOR------------------------------

productsRoutes.get("/",productsController.products) //-->>LISTADO DE PRODUCTOS

//Create:
productsRoutes.get("/productCreate", productsController.formNew) //-->> Pagina de creacion.
productsRoutes.post("/productCreate",upload.single("productImage"), productsController.store)

//Update
productsRoutes.get("/productEdition/:id", productsController.edit)
productsRoutes.put("/productEdition/:id",upload.single("productImage"), productsController.update)

productsRoutes.delete("/:id", productsController.destroy)


module.exports = productsRoutes