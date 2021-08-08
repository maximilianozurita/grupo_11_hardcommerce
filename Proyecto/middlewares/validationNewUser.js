const { body } = require('express-validator');
const userModel = require('../models/usersModels')
const { isFileImage } = require('../helpers/file');
const { User } = require('../database/models');

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
        .withMessage('Por favor ingrese su mail una vez mas')
        .isEmail()
        .withMessage('Ingrese un mail valido')
        .bail()
        .custom(async (value, { req }) => {
            const { email} = req.body
            const userFound = await User.findOne({
                where: {
                    email
                }
            })

            if (userFound) {
                return Promise.reject('El email ya esta en uso');
            }
                return true
            })
            /*.custom(({ req }) => {
                const { email } = req.body
                
                return User.findOne({
                    where: {
                        email
                    }
                })
                .then((userFound) => {
            
                    if (userFound) {
                        return Promise.reject('El mail esta en uso')
                    } 
                return true;
                })
            })
           ,*/
        ,
    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese su contraseña con numeros y letras')
        .isAlphanumeric()
        .withMessage("Ingrese una contraseña con numeros y letras"),
    body('cell')
        .notEmpty()
        .withMessage('Por favor ingrese su numero de celular correctamente')
        .isNumeric()
        .withMessage('Ingrese el numero de su celular'),
    body('image')
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
