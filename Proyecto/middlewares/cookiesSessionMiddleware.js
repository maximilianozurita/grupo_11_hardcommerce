const usersModels = require('../models/usersModels')
module.exports = (req, res, next) => {
    // chequeamos si existe cookie
    // Si existe buscamos en el modelo el usuario
    // Lo guardamos en la session
    const userCookie = req.signedCookies.user
    
    if (userCookie) {
        const user = usersModels.findByPk(userCookie)
        
        delete user.password
        // pasar a la sesión
        req.session.logged = user
    }

    next()
}