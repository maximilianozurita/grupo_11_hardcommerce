const { validationResult } = require('express-validator');
const path = require('path')
const {Product, ImageProduct, Category, Brand}=require("../database/models/")
const fs=require("fs")
const { Op } = require('sequelize');

const productsController = {
    listOfProducts: async (req, res) => {
        const productList= await Product.findAll()

        res.render('products/listOfProducts',{productList})
        
    },
    detail: async (req, res) => {
        const {id}=req.params

        const productToEdit= await Product.findByPk(id,{
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        })

        //linkear detalles de producto en ejs

        res.render('products/productsDetail',{productToEdit});
    },
    cart: (req,res)=>{
        //Agregar tabla de carrito de compras. Ver si agregar aca o en un modelo nuevo.

        res.render('products/productsCart')
    },
    products:async (req, res) => {
        const productList = await Product.findAll({
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        });
        //res.json(productList)
        res.render('products/products',{productList})
    },
    formNew: async (req,res)=>{
        
        const brandToLoad= await Brand.findAll()
        const categoryToLoad= await Category.findAll()

        res.render("products/productCreate",{brandToLoad,categoryToLoad})
    },
    store: async (req,res)=>{
        const formValidation=validationResult(req)
        arrayFiles=req.files
        
        if(!formValidation.isEmpty()){
            //Borrar imagen
            arrayFiles.forEach(file => {
                if(file){
                    fs.unlinkSync(file.path)
                }   
            });
            const oldValues=req.body;
            const brandToLoad= await Brand.findAll()
            const categoryToLoad= await Category.findAll()
            res.render("products/productCreate",{brandToLoad,categoryToLoad,oldValues,errors:formValidation.mapped()})
            return
        }


        //Modificar formularios.
        const productToCreate={
            
            "name": req.body.name,
            "product_description": req.body.product_description,
            "category_id": req.body.category,
            "brand_id": req.body.brand,
            "price": req.body.price,
            "quota": req.body.quota,
            "short_description": req.body.short_description,
            "stock": req.body.stock,
            "sales": 0,
        }
        
        const productCreated=await Product.create(productToCreate)

        arrayFiles.forEach(async file => {
            const imageCreated={
                "url": "/images/imgProducts/" + file.filename,
                "product_id": productCreated.id
            }
            await ImageProduct.create(imageCreated)
        });
       
        res.redirect("/products/");

    },
    edit:async (req,res)=>{
        const productToEdit= await Product.findByPk(req.params.id,
            {
                include:[
                    {association: 'images'},
                    {association: 'category'},
                    {association: 'brand'}
                ]
            });
        const categorys=await Category.findAll()
        const brandToLoad=await Brand.findAll()
        res.render("products/productEdition",{productToEdit,categorys,brandToLoad})
    },
    update: async (req,res)=>{
        const id=req.params.id;
        
        const productOriginal= await Product.findByPk(id);
        const imageOriginal= await ImageProduct.findAll({
            where: {product_id: id}
        })

        let image=imageOriginal[0];

        if(req.file){
            image.url= "/images/imgProducts/" + req.file.filename
        }


        await Product.update({
            "name": req.body.name,
            "product_description": req.body.product_description,
            "short_description": req.body.short_description,
            "category_id": req.body.category,
            "brand_id":req.body.brand,
            "price": req.body.price,
            "quota": req.body.quota,
            "stock": req.body.stock,
        })

        await ImageProduct.update({
            "url": "/images/imgProducts/" + req.file.filename,
            "product_id": id
        })

        res.redirect("/products/");
    },
    destroy:async (req,res)=>{
        const id=req.params.id;

        await ImageProduct.destroy({
            where: {product_id: id}
        })

        await Product.destroy({
            where:{ id }
        })

        res.redirect("/products/");

    }
}

module.exports = productsController
