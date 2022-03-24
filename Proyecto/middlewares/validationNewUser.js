const { body } = require('express-validator');
const userModel = require('../models/usersModels');
const { isFileImage } = require('../helpers/file');
const { User } = require('../database/models');

const validationUserEdition = [
    body('name')
        .notEmpty()
        .withMessage('Por favor ingrese nombre')
        .bail()
        //
        .isLength({ min: 2 })
        .withMessage('Por favor ingrese un nombre mayor a 3 caracteres'),
    body('last_name')
        .notEmpty()
        .withMessage('Por favor ingrese un apellido una vez mas')
        .bail()
        //
        .isLength({ min: 2 })
        .withMessage('Por favor ingrese su apellido una vez mas'),
    body('email')
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
        ,
    body('cell')
        .notEmpty()
        .withMessage('Ingrese el numero de su celular')
        .isNumeric()
        .withMessage('Por favor ingrese su numero de celular correctamente')
        .bail(),
        
    body('image')
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