const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const { isFileImage } = require('../helpers/file');


const validationLogin = require('../middlewares/validationLogin');
const validationNewUser = require("../middlewares/validationNewUser");
const validationUserEdition=require("../middlewares/validationUserEdition");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
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
});

// fileFilter es un byPass para que multer guarde o no el archivo
const fileFilter = (req, file, cb)  => {
    if (!file) {
        cb(null, false)

        // corta ejecución
        return
    }

    if (!isFileImage(file.originalname)) {
        //  para que llegue a express-validator el archivo
        req.file = file

        cb(null, false)

        // corta ejecución
        return
    }

    // Si aceptamos el archivo
    cb(null, true)

}


const upload = multer({ storage, fileFilter });

userRoutes.get('/login',guestMiddleware, userController.login);
userRoutes.post('/login',guestMiddleware, validationLogin, userController.processLogin);

userRoutes.get('/',userController.listOfUsers);
userRoutes.get('/userDetail/:id', userController.detail);

userRoutes.get("/register", guestMiddleware,userController.formNew);

// aca deberíamos pasar multer
userRoutes.post('/register', upload.single('image'),validationNewUser, userController.store);

userRoutes.get('/editUsers/:id', userController.edit);
userRoutes.put('/:id', upload.single('image'),validationUserEdition, userController.update);

//userRoutes.put('/:id', userController.update);
userRoutes.put('/:id', upload.single('image'), userController.update);
userRoutes.delete("/:id", userController.destroy);

userRoutes.get('/profile', authMiddleware, userController.profile);
userRoutes.get('/logout', authMiddleware, userController.logout)

module.exports = userRoutes