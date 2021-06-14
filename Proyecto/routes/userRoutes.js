const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

userRoutes.get('/login', userController.login);

userRoutes.get('/listOfUsers',userController.listOfUsers);
userRoutes.get('/userDetail/:id', userController.detail);

userRoutes.get("/register", userController.formNew);
userRoutes.post('/register', userController.store);

userRoutes.get('/editUsers/:id', userController.edit);
userRoutes.put('/:id', userController.update);

userRoutes.delete("/:id", userController.destroy);

module.exports = userRoutes