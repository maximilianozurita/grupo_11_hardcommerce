
const { validationResult }=require('express-validator');

const usersModels=require("../models/usersModels");
const fs = require("fs");
const bcrypt = require('bcryptjs');
const { maxAgeUserCookie } = require('../config/config');
//const { user } = require("../database/models");


const userController = {
    login: (req, res) => {
        res.render('user/login')
    },
    profile: (req, res)=> {
        const user =req.session.logged
        res.render("user/userProfile",{user})
    },
    processLogin: (req,res)=>{
        const formValidation=validationResult(req);
        const oldValues=req.body;


        if(!formValidation.isEmpty()){
            return res.render ("user/login",{oldValues,errors: formValidation.mapped ()})
        }
        
        const {email, remember}=req.body;

        //Encuentra el usuario a loguear
        const userFound=usersModels.findByField("email",email);

        //elimina el password del usuario logueado
        delete userFound.password;
        req.session.logged=userFound;

        //Guardar si hay un remember en la cookie "user"
        if(remember){
            res.cookie("user",userFound.id,{maxAge: maxAgeUserCookie,signed: true})
        }

        res.redirect("/")
    },
    logout:(req,res)=>{

        req.session.destroy()
        res.clearCookie('user')
        
        res.redirect("/")
    },
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
        
        // hashear el password
        const hashPassword = bcrypt.hashSync(password)

        //hashear password y guardarla en la constante
        const hashpassword=bcrypt.hashSync(password);

        const user ={
            name:name,
            lastName:lastName,
            email:email,
            password:hashPassword,
            cell:cell,
            imagen: "/images/imgUser/" + imagen,
        }
        usersModels.create(user);
        res.redirect('/user/');
       /* user.create({userr})
        .then((userFound)=>{
            res.redirect('/user/')
        })*/
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
        let imagen = userOriginal.imagen

        if (file) {
            imagen = '/images/imgUser/' + file.filename

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