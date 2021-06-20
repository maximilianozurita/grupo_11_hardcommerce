const { body } = require ('express-validator');
const path = require ('path');


const validationNewUser = [

    body('name')
        .notEmpty()
        .withMessage('Por favor ingrese su nombre')  
        .bail()
        //
        .isLength({ min:3 })
        .withMessage('Por favor ingrese un nombre más largo'),
        //como es la ultima no usamos bail.

    body('lastname')
        .notEmpty()
        .withMessage('Por favor ingrese su apellido')
        .bail()
        //
        .isLength({ min:3 })
        .withMessage('Por favor ingrese un apellido más largo'),
        //como es la ultima no usamos bail.

    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su email')
        .bail()
        //
        .isEmail()
        .withMessage('Por favor ingrese una dirección correcta'),
        //como es la ultima no usamos bail.

    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese un password'),
        
        //como es la ultima no usamos bail.

    body('imagen').custom((value, { req }) => {

        const { file } = req

        //chequea que haya cargado imagen

        if (!file) {
            // esto es como si hicieramos .withMessage('Seleccione un archivo')
            throw new Error('Por favor ingrese una imagen')
        }

        const AVIABLE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png']
        //sacamos la extension
        const extension = path.extname(file.originalname)

        if (!AVIABLE_EXTENSIONS.includes(extension)) {
            //disparar error
            throw new Error('Por favor ingrese un archivo que sea una imagen')
        }

        // chequea que la extension sea la correcta


    })
    
    
    ]

module.exports = validationNewUser


