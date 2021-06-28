const { body } = require('express-validator')
const { isFileImage } = require('../helpers/file');


const validationNewUser = [
    body('name')
        .notEmpty()
        .withMessage('Por favor ingrese nombre')
        .bail()
        //
        .isLength({ min: 4 })
        .withMessage('Por favor ingrese un nombre mayor a 3 caracteres'),
        // como es la última no usamos bail()
    body('lastName')
        .notEmpty()
        .withMessage('Por favor ingrese un apellido una vez mas')
        .bail()
        //
        .isLength({ min: 4 })
        .withMessage('Por favor ingrese su apellido una vez mas'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Por favor ingrese su mail una vez mas'),
    body('password')
        .notEmpty()
        .isAlphanumeric()
        .bail()
        .withMessage('Por favor ingrese su contraseña una vez mas'),
    body('cell')
        .notEmpty()
        .isNumeric()
        .bail()
        .withMessage('Por favor ingrese su numero de celular correctamente'),
    body('imagen')
        .custom((value, { req }) => {
            const { file } = req

            // chequea que haya cargado imagen
            if (!file) {
                // esto es como si hicieramos .withMessage('Seleccione un archivo')
                throw new Error('Por favor ingrese una imagen')
            }
            /*if (!isFileImage(file.originalname)) {
                // disparar error
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }
            chequea que la extensión sea la correcta
            const avalaible_extensions = [".jpg", ".jpeg", ".gif", "png"];
            const extension = path.extname(file.originalname);
            if(avalaible_extensions.includes(extension)){
                throw new Error('Por favor ingrese una archivo que sea una imagen');
            };
            return true;*/
            if (!isFileImage(file.originalname)) {
                // disparar error
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }

            // chequea que la extensión sea la correcta
            
            return true;
        })
]
module.exports = validationNewUser;