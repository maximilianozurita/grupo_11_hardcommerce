const {body}=require("express-validator");

const isFileImage=require("../helpers/isFile");

const validationNewProduct=[

body("name")
    .notEmpty()
    .withMessage("Por favor ingrese un nombre de producto"),

body("product_description")
    .notEmpty()
    .withMessage("Por favor ingrese una descripción de producto"),
body("short_description")
    .notEmpty()
    .withMessage("Por favor ingrese una descripción de producto"),

body("category")
    .notEmpty()
    .withMessage("Por favor ingrese una categoria de producto"),

body("price")
    .notEmpty()
    .withMessage("Por favor ingrese un precio de producto")
    .bail()
    //
    .isNumeric()
    .withMessage("Ingrese un valor numerico"),

body("quota")
    .notEmpty()
    .withMessage("Por favor ingrese cantidad de cuotas"),
body("brand")
    .notEmpty()
    .withMessage("Por favor ingrese la marca"),
    
body('productImage')

    .custom((value, { req }) => {
        const files = req.files
        
        if (!files) {
            // esto es como si hicieramos .withMessage('Seleccione un archivo')
            throw new Error('Por favor ingrese una imagen')
        }
        files.forEach(file => {
            if (!isFileImage(file.originalname)) {
    
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }
        });

        return true
    })

]

module.exports=validationNewProduct;