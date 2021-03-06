const { validationResult } = require('express-validator');
const fs = require("fs");
const path=require ("path");
const bcrypt = require('bcryptjs');
const { maxAgeUserCookie } = require('../config/config');
const { User } = require("../database/models");



const userController = {
    login: (req, res) => {
        res.render('user/login')
    },
    processLogin: (req, res) => {
        
        const formValidation = validationResult(req)
        const oldValues = req.body

        if (!formValidation.isEmpty()) {
            return res.render('user/login', { oldValues, errors: formValidation.mapped() })
        }
        // lo que viene del login
        const { email,remember } = req.body
        // le pedimos al modelo el usuario
        //const user = usersModels.findByField('email', email)
        User.findOne({
            where: {
                email
            }
        })
        .then((user) => {
            //req.session = {}
            // cargamos los datos del usuario en la sesión
            // le sacamos el password
            delete user.password

            // cargamos dentro de la sesión la propieda logged con el usuario (menos el password)
            req.session.logged = user
            // guardamos un dato de nuestro usuario en la sesión (email, user_id)
            if (remember) {
                // clave
                res.cookie('user', user.id, {
                    maxAge: maxAgeUserCookie,
                    // pasamos esta propiedad para que firme la cookie
                    signed: true,
                })
            }
            // redirigimos al profile
            res.redirect('/user/profile')
        })
    },
    profile: (req, res) => {
        res.render('user/profile')
    },
    /*register: (req, res) => {
        res.render('user/register')
    },*/
    logout: (req, res) => {
        // borrar session y cookie
        req.session.destroy()
        res.clearCookie('user')
        res.redirect('/')
    },
    listOfUsers: (req, res) =>{
        User.findAll({
            order: [
                ['name', 'ASC'],
            ]
        })
        .then(usersList => {
            res.render('user/listOfUsers',{ usersList })
        })
    },
    detail: (req, res) => {
        const { id } = req.params

        User.findByPk(id)
        .then(userDetail =>{

            res.render('user/userDetail', { userDetail })
         })

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


        const {name, last_name, email, password, cell} = req.body;

        const { file } = req
        const image = file.filename

        // hashear el password
        const hashPassword = bcrypt.hashSync(password)

        const user =
        {
            name:name,
            last_name:last_name,
            email:email,
            password:hashPassword,
            cell:cell,
            image: "/images/imgUser/" + image ,
        }
        /*usersModels.create(user);
        res.redirect('/user/');*/

        User.create(user)
        .then((userCreated) => {
            res.redirect('/user/userDetail/' + userCreated.id);
        })
    },
    edit: (req, res) => {
        User.findByPk(req.params.id)
        .then(userToEdit => {

            res.render('user/editUsers',{
                userToEdit
            });
        })
    },
    update: (req, res) => {
        const data = req.body;
        const { id } = req.params;
        // el usuario original y su imagen
        User.findByPk(id)
        .then(userOriginal=>{
            const userToEdit=userOriginal;
            const formValidation = validationResult(req);
            if (!formValidation.isEmpty()) {
                // borrar imagen
                if (req.file) {
                    // primero chequeamos que exista
                    fs.unlinkSync(req.file.path)
                }
                // tenemos errores
                res.render('user/editUsers', {userToEdit, errors: formValidation.mapped() })
                return
            }
            // dentro de req.file va a venir la información del archivo
            const { file } = req

            /* Si viene una imagen nueva, cargar la imagen nueva
            sino poner la original */
            let image

            if (file) {
                image = '/images/imgUser/' + file.filename
            }else {
                image = userToEdit.image
            }

            //data.image = image

            //Hashear password si fue ingresada
            if(data.password){
                const password=req.body.password
                const hashPassword = bcrypt.hashSync(password)
                data.password=hashPassword
            }
            else{
                data.password=userToEdit.password
            }
            if(data.email===""){
                data.email=userToEdit.email
            }

            const propertiesToEdit = {
                name:data.name,
                last_Name:data.last_name,
                email:data.email,
                password:data.password,
                cell:data.cell,
                image:image
            }

            User.update(propertiesToEdit,{
                where:{id}
            })
            .then(() => {

                res.redirect('/user/');
            })
        })

    },
    destroy:async (req, res) => {
        const {id} = req.params;
        const deleteImage = await User.findAll({
            where: {
                id
            }
        })
        //fs.unlinkSync(path.join(__dirname,"../public/images/imgUser/",deleteImage.image))
        deleteImage.forEach(image => {
            fs.unlinkSync(path.join(__dirname,"../public/", image.image))
        });


        await User.destroy({
            where: {
                id
            }
        })

        res.redirect('/user/');

    }
}

module.exports = userController