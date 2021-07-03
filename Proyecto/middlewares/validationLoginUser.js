const { body } = require ('express-validator');
const path = require ('path');
const usersModels = require('../models/usersModels');
const bcrypt=require("bcryptjs");


const validationLoginUser = [

    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su email')
        .bail()

        .isEmail()
        .withMessage('No es un formato de email')
        .bail(),
        
        /*.custom((email)=>{
            const userFound=usersModels.findByField("email",email);
                
            //Si encuentra userFound devuelve el usuario encontrado y si no lo encuentra devuelve undefine.
            if(userFound){
                return false;
            }
            return true;
        })
        .withMessage("El usuario ya existe"),
*/
    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese un password')
        .bail()

        .custom((value,{req})=>{
            const {email,password}=req.body;

            //Encontrar el usuario con el mail correspondiente
            const userFound=usersModels.findByField("email",email);

            if(userFound){
                //comparar las contraseña
                const passwordMatch=bcrypt.compareSync(password,userFound.password);
                if (passwordMatch){
                    return true;
                }
            }
            //Si bien passwordMatch es un booleano, se utiliza el if para cortar la funcion ahi.
            return false;
        })
        .withMessage("usuario no encontrado"),
]

module.exports = validationLoginUser;
