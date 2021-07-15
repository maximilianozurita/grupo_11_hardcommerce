const { body } = require ('express-validator');
const path = require ('path');
const usersModels = require('../models/usersModels');
const isFileImage=require("../helpers/isFile");

const validationNewUser = [

    body('name')
        .notEmpty()
        .withMessage('Por favor ingrese su nombre')  
        .bail()
        //
        .isLength({ min:3 })
        .withMessage('Por favor ingrese un nombre más largo'),
        //como es la ultima no usamos bail.

    body('lastName')
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
        .withMessage('Por favor ingrese una dirección correcta')
        .bail()
        .custom((email)=>{
            const userFound=usersModels.findByField("email",email);
                
            //Si encuentra userFound devuelve el usuario encontrado y si no lo encuentra devuelve undefine.
            if(userFound){
                return false;
            }
            return true;
        })
        .withMessage("El usuario ya existe"),

    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese un password'),
        
        /*.isStrongPassword()
        .withMessage("por favor ingrese una clave....")*/

    body('cell')
        .notEmpty()
        .withMessage('Por favor ingrese un telefono '),    

    body('imagen')
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

module.exports = validationNewUser


