const userController = require("../controllers/userController");
const usersModels=require("../models/usersModels");
const bcrypt=require("bcryptjs");

module.exports=(req, res, next)=>{
    
    const userIdCookie=req.cookies.user
    //Se verifica si existe cookie
    if (userIdCookie){
        //Se busca los datos del usuario con el ID hasheado
        const users = usersModels.findAll();
        //Se busca el modelo usuario
        const user = users.find(user => bcrypt.compareSync('' + user.id, userIdCookie));

        delete user.password;

        //Se guarda en session
        req.session.logged=user;
    }

    next()
}