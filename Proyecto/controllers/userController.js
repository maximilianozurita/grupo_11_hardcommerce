const usersModels=require("../models/usersModels");
const {validationResult} = require("express-validator");
const fs = require("fs");

const userController = {
    login: (req, res) => {
        res.render('user/login')
    },
    /*register: (req, res) => {
        res.render('user/register')
    },*/
    listOfUsers: (req, res) =>{
        const usersList = usersModels.findAll()
        res.render('user/listOfUsers',{ usersList })
    },
    detail: (req, res) => {
        const { id } = req.params
        const userDetail = usersModels.findByPk(id)
        res.render('user/userDetail', { userDetail })
    },
    formNew: (req, res) => {
        res.render('user/register');
    },
    store: (req, res) => {
        
        const formValidation = validationResult(req)
        /* si encuentro un error devuelvo el formulario
        con los valores ya cargados y los errores */
    
        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }
            
            // tenemos errores
            const oldValues = req.body
            res.render('user/register', { oldValues, errors: formValidation.mapped() })
          return  
        } 


        const {name, lastName, email, password, cell} = req.body;
        
        const { file } = req;
        const imagen = file.filename;

        const user = 
        {
            name:name,
            lastName:lastName,
            email:email,
            password:password,
            cell:cell,
            imagen: "/images/imgUser/" + imagen,
        }
        const userCreated = usersModels.create(user);
        res.redirect('/user/')
    },
    edit: (req, res) => {
        const userToEdit = usersModels.findByPk(req.params.id);
        res.render('user/editUsers', {userToEdit});
    },
    update: (req, res) => {
        const data = req.body;
        const { id } = req.params;
        // el usuario original y su imagen
        const userOriginal = usersModels.findByPk(id);

        // dentro de req.file va a venir la información del archivo
        const { file } = req

        /* Si viene una imagen nueva, cargar la imagen nueva
        sino poner la original */
        let imagen

        if (file) {
            imagen = '/images/imgUser/' + file.filename
        } else {
            imagen = userOriginal.imagen
        }

        data.imagen = imagen

        usersModels.update(data, id);
        res.redirect('/user/');
    },
    destroy: (req, res) => {
        const id = req.params.id;
        
        usersModels.destroy(id);

        res.redirect('/user/');
    }
}

module.exports = userController