module.exports=(req, res, next)=>{

    //se detecta si la persona esta logueada
    const userSession=req.session.logged
    //console.log(req.session.logged)

    if (!userSession){
        res.redirect("/user/login")
    }


    next();
}