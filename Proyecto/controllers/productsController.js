const { validationResult } = require('express-validator');
const path = require('path')
const productsModels=require ("../models/productsModels")
const fs=require("fs")

const productsController = {
    listOfProducts: (req, res) => {
        const productList = productsModels.findAll();
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))
        res.render('products/listOfProducts',{productList});
    },
    detail: (req, res) => {
        res.render('products/productsDetail')
    },
    cart: (req,res)=>{
        res.render('products/productsCart')
    },
    products:(req, res) => {
        const productList=productsModels.findAll()
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

        const product={
            
            "name": req.body.name,
            "description": req.body.description,
            "category": req.body.category,
            "price": req.body.price,
            "cuotas": req.body.cuotas,
            "image1": req.file.filename
        }
        const productCreated=productsModels.create(product);

        res.redirect("/products/");
    },
    edit:(req,res)=>{
        const productToEdit=productsModels.findByPk(req.params.id);
        res.render("products/productEdition",{productToEdit})
    },
    update: (req,res)=>{
        const data=req.body;
        const id=req.params.id;
        
        const productOriginal=productsModels.findByPk(id);

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
