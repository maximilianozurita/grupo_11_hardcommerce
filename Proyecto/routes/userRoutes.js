const express = require('express')
const userRoutes = express.Router()

const userController = require('../controllers/userController')

userRoutes.get('/login', userController.login)
userRoutes.get('/register', userController.register)

module.exports = userRoutes