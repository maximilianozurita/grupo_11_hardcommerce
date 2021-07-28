const { body } = require('express-validator');
const userModel = require('../models/usersModels')
const { isFileImage } = require('../helpers/file');


const validationUserEdition = [
    body('name')
        .notEmpty()
        .withMessage('Por favor ingrese nombre')
        .bail()
        //
        .isLength({ min: 2 })
        .withMessage('Por favor ingrese un nombre mayor a 3 caracteres'),
    body('lastName')
        .notEmpty()
        .withMessage('Por favor ingrese un apellido una vez mas')
        .bail()
        //
        .isLength({ min: 2 })
        .withMessage('Por favor ingrese su apellido una vez mas'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Ingrese un mail valido')
        .bail()
        .custom((email,{req}) => {
            const userFound = userModel.findByField('email', email)

            if (userFound){
                if (userFound.id!=req.params.id) {
                    return false
                }
            }
            return true
        })
        .withMessage('El usuario ya existe'),
    body('cell')
        .notEmpty()
        .withMessage('Ingrese el numero de su celular')
        .isNumeric()
        .withMessage('Por favor ingrese su numero de celular correctamente')
        .bail(),
        
    body('imagen')
        .custom((value, { req }) => {
            const { file } = req
            if(file){
            if (!isFileImage(file.originalname)) {
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }}
            return true;
        })
]
module.exports = validationUserEdition;
