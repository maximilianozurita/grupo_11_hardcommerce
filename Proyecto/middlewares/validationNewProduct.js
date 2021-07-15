const {body}=require("express-validator");

const isFileImage=require("../helpers/isFile");

const validationNewProduct=[

body("name")
    .notEmpty()
    .withMessage("Por favor ingrese un nombre de producto"),

body("description")
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

body("cuotas")
    .notEmpty()
    .withMessage("Por favor ingrese cantidad de cuotas"),

body('image')

    .custom((value, { req }) => {
        const { file } = req
 
        if (!file) {
            // esto es como si hicieramos .withMessage('Seleccione un archivo')
            throw new Error('Por favor ingrese una imagen')
        }
        if (!isFileImage(file.originalname)) {

            throw new Error('Por favor ingrese una archivo que sea una imagen')
        }
        return true
    })

]

module.exports=validationNewProduct;