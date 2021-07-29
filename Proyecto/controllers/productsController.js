const { validationResult } = require('express-validator');
const path = require('path')
const {Product}=require("../database/models")
const fs=require("fs")
const { Op } = require('sequelize');

const productsController = {
    listOfProducts: (req, res) => {
        Product.findAll()
            .then(productList=>{
                res.render('products/listOfProducts',{productList})
            })
        
    },
    detail: (req, res) => {
        const {id}=req.params

        const productToEdit=Product.findByPk(id)

        res.render('products/productsDetail',{productToEdit});
    },
    cart: (req,res)=>{
        //Agregar tabla de carrito de compras. Ver si agregar aca o en un modelo nuevo.

        res.render('products/productsCart')
    },
    products:async (req, res) => {
        const productList = await Product.findAll();
        res.render('products/products',{productList})
    },
    formNew: (req,res)=>{
        res.render("products/productCreate")
    },
    store: (req,res)=>{
        const formValidation=validationResult(req)

        if(!formValidation.isEmpty()){
            //Borrar imagen
            if(req.file){
                fs.unlinkSync(req.file.path)
            }
            const oldValues=req.body;
            res.render("products/productCreate",{oldValues,errors:formValidation.mapped()})
            return
        }

        //Modificar formularios.
        const productToCreate={
            
            "name": req.body.name,
            "description": req.body.description,
            "category": req.body.category,
            "price": req.body.price,
            "cuotas": req.body.cuotas,
            "image1": req.file.filename
        }
        Product.create(productToCreate)
        .then(result=>{
            res.redirect("/products/");
        })
    },
    edit:async (req,res)=>{
        const productToEdit= await productsModels.findByPk(req.params.id);
        res.render("products/productEdition",{productToEdit})
    },
    update: async (req,res)=>{
        const data=req.body;
        const id=req.params.id;
        
        const productOriginal= await productsModels.findByPk(id);

        let image=productOriginal.image1

        if(req.file){
            image= req.file.filename;
        }

        data.image1=image;

        productsModels.update(data,id);
        res.redirect("/products/");
    },
    destroy:(req,res)=>{
        const id=req.params.id;
        productsModels.destroy(id);
        res.redirect("/products/");
    }
}

module.exports = productsController
