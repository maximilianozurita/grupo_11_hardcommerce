const usersModels=require("../models/usersModels");

module.exports=(req, res, next)=>{
    
    const userIdCookie=req.signedCookies.user
    //Se verifica si existe cookie
    if (userIdCookie){

        const user=usersModels.findByPk(userIdCookie)
        delete user.password;

        //Se guarda en session
        req.session.logged=user;
    }

    next()
}