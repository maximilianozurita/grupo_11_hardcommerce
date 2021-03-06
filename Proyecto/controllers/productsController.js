const { validationResult } = require('express-validator');
const path = require('path')
const {Product, ImageProduct, Category, Brand}=require("../database/models/")
const fs=require("fs")
const { Op, where } = require('sequelize');
const { isArray } = require('util');

const productsController = {
    listOfProducts: async (req, res) => {
        const productList = await Product.findAll({
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        });
        const brandToLoad= await Brand.findAll()
        const categoryToLoad= await Category.findAll()
        //res.json(productList[0].category.info)

        res.render('products/listOfProducts',{productList,brandToLoad,categoryToLoad})

    },
    detail: async (req, res) => {
        const {id}=req.params

        const productToShow= await Product.findByPk(id,{
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        })

        //linkear detalles de producto en ejs

        res.render('products/productsDetail',{productToShow});
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
        const arrayFiles=req.files

        if(!formValidation.isEmpty()){
            //Borrar imagen
            if(arrayFiles.length>0){
                for(let i=0;i<arrayFiles.length;i++){
                    fs.unlinkSync(arrayFiles[i].path)
                }
            }

            const oldValues=req.body;
            const brandToLoad= await Brand.findAll()
            const categoryToLoad= await Category.findAll()
            res.render("products/productCreate",{brandToLoad,categoryToLoad,oldValues,errors:formValidation.mapped()})
            return
        }

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


        for(let i=0;i<arrayFiles.length;i++){
            const imageCreated={
                "url": "/images/imgProducts/" + arrayFiles[i].filename,
                "product_id": productCreated.id
            }
            await ImageProduct.create(imageCreated)

        }
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
        const categories=await Category.findAll()
        const brandToLoad=await Brand.findAll()
        res.render("products/productEdition",{productToEdit,categories,brandToLoad})
    },
    update: async (req,res)=>{
        const idParams=req.params.id;
        const arrayFiles=req.files

        await Product.update({
            "name": req.body.name,
            "product_description": req.body.product_description,
            "short_description": req.body.short_description,
            "category_id": req.body.category,
            "brand_id":req.body.brand,
            "price": req.body.price,
            "quota": req.body.quota,
            "stock": req.body.stock,},
            {
                where: {id: idParams}
            }
        )


        if(arrayFiles.length!=0){

            const imagesOriginal= await ImageProduct.findAll({
                where: {product_id: idParams}
            })

            let arrayImages=[
                {
                    "id":null,
                    "url":null,
                    "product_id": idParams
                },
                {
                    "id":null,
                    "url":null,
                    "product_id": idParams
                },
                {
                    "id":null,
                    "url":null,
                    "product_id": idParams
                },
                {
                    "id":null,
                    "url":null,
                    "product_id": idParams
                },
                {
                    "id":null,
                    "url":null,
                    "product_id": idParams
                },
            ]

            //cargar imagenes de BD
            for(let i=0;i<imagesOriginal.length;i++){
                arrayImages[i].id=imagesOriginal[i].id
                arrayImages[i].url=imagesOriginal[i].url
            }

            //Cargar y reemplazar imagenes de req
            let position;
            arrayFiles.forEach(file => {
                position=Number(file.fieldname.substr(-1))
                fs.unlinkSync(path.join(__dirname,"../public/", arrayImages[position].url))
                arrayImages[position].url="/images/imgProducts/"+ file.filename
            });


            //Eliminar array sin imagen
            const imageToUpdate=arrayImages.filter(image=>{
                return image.url!=null
            })

            //Subir a BD
            for(let i=0; i<imageToUpdate.length;i++){
                await ImageProduct.update(imageToUpdate[i],{
                    where: {id:imageToUpdate[i].id}
                })
            }
        }
        res.redirect("/products/");
    },

    destroy: async (req,res)=>{
        const idParams=req.params.id;

        const imagesOriginal= await ImageProduct.findAll({
            where: {product_id: idParams}
        })
        for(let i=0;i<imagesOriginal.length;i++){
            fs.unlinkSync(path.join(__dirname,"../public/", imagesOriginal[i].url))
        }

        await ImageProduct.destroy({
            where: {product_id: idParams}
        })

        await Product.destroy({
            where:{ id: idParams }
        })

        res.redirect("/products/");

    }
}

module.exports = productsController
