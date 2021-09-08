const express = require('express')
const productsRoutes = express.Router()
const path=require("path")
const productsController = require('../controllers/productsController')
const multer=require("multer")
const validationNewProduct=require("../middlewares/validationNewProduct")
const isFileImage=require("../helpers/isFile");
const { uuid } = require('uuidv4');


const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname, "../public/images/imgProducts"))
    },
    filename:(req,file,cb)=>{
        const newFileName="product-"+uuid()+path.extname(file.originalname);//uuiv4
        cb(null,newFileName);
    }
})

const fileFilter = (req, file, cb)  => {
    if (!file) {
        cb(null, false)

        // corta ejecución
        return
    }

    if (!isFileImage(file.originalname)) {
        //Para que llegue a express-validator el archivo
        req.file=file

        cb(null, false)

        // corta ejecución
        return
    }
    // Si aceptamos el archivo
    cb(null, true)
}


const upload=multer({storage:storage, fileFilter});

//--------------------VISTA CLIENTES--------------------------------

productsRoutes.get('/listOfProducts', productsController.listOfProducts) //-->>listado de productos
productsRoutes.get('/detail/:id', productsController.detail)               //-->>Detalle de producto seleccionado.
productsRoutes.get('/cart',productsController.cart)                    //-->>Carrito de compras.

//-------------------VISTA ADMINISTRADOR------------------------------

productsRoutes.get("/",productsController.products) //-->>LISTADO DE PRODUCTOS

//Create:
productsRoutes.get("/productCreate", productsController.formNew) //-->> Pagina de creacion.
productsRoutes.post("/productCreate",upload.any("productImage1","productImage2","productImage3","productImage4","productImage5"),validationNewProduct , productsController.store)

//Update
productsRoutes.get("/productEdition/:id", productsController.edit)
productsRoutes.put("/productEdition/:id",upload.any("productImage1","productImage2","productImage3","productImage4","productImage5"), productsController.update)

productsRoutes.delete("/:id", productsController.destroy)



module.exports = productsRoutes