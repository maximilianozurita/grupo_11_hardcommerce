const usersModels=require("../models/usersModels");


module.exports=(req, res, next)=>{
    
    const userCookie=req.cookies.user
    //Se verifica si existe cookie
    if (userCookie){
        //Se busca la 
        user=usersModels.findByPk(userCookie);

        delete user.password;

        req.session.logged=user;
    }
    //Se busca el modelo usuario

    //Se guarda en session
    console.log(userCookie)

    next()
}