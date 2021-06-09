const path = require('path')
const userModels=require("../models/usersModels");

const userController = {
    login: (req, res) => {
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