const path = require('path')
const userModels=require("../models/usersModels")
const userController = {
    login: (req, res) => {
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))
        res.render('user/login')
    },
    register: (req, res) => {
        res.render('user/register')
    },
    listOfUsers: (req, res) =>{
        const usersList= userModels.findAll()
        res.render('user/listOfUsers',{ usersList })
    }
}

module.exports = userController