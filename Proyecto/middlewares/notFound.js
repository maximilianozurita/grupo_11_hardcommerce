module.exports = (req, res, next) => {
    // locals.title está disponible desde las vistas
    //res.locals.title = 'error'
    res.render('not-found')
}