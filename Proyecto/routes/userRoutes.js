const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer')
const { body } = require('express-validator')
const path = require('path');
const validationNewUser = require('../middlewares/validationNewUser');

// destino donde guardar el archivo
// nombre del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const detinationPath = path.join(__dirname, '../public/images/imgUser')
        // llamamos al callback con error (null) y el path de donde guardaría el archivo
        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {
        // El nombre del archivo original es: file.originalname
        const extension = path.extname(file.originalname) // .jpg

        // generamos un identificador único a partir de la fecha
        const now = Date.now() // 32173821637218631

        // generar un nombre para nuestro archivo
        //const filename = `${now}${extension}`
        const filename = now + extension
        
        // ejecutamos callback con null (error) y el nombre del archivo
        cb(null, filename)
    },
})
const upload = multer({ storage })

userRoutes.get('/login', userController.login);

userRoutes.get('/',userController.listOfUsers);
userRoutes.get('/userDetail/:id', userController.detail);

userRoutes.get("/register", userController.formNew);
//userRoutes.post('/register', userController.store);
userRoutes.post('/register', upload.single('imagen'), validationNewUser, userController.store);

userRoutes.get('/editUsers/:id', userController.edit);

//userRoutes.put('/:id', userController.update);
userRoutes.put('/:id', upload.single('imagen'), userController.update);

userRoutes.delete("/:id", userController.destroy);

module.exports = userRoutes