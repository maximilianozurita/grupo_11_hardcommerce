
module.exports=(req, res, next)=>{

    //Si hay un usuario logueado
    if (req.session.logged){
        //se guarda en locals los datos del usuario
        res.locals.logged=req.session.logged
    }

    next()
}