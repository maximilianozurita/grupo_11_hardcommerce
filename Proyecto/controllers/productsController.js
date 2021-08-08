const { validationResult } = require('express-validator');
const path = require('path')
const {Product, ImageProduct, Category, Brand}=require("../database/models/")
const fs=require("fs")
const { Op, where } = require('sequelize');

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
        const idParams=req.params.id;
        arrayFiles=req.files
        const productOriginal= await Product.findByPk(idParams);
        const imagesOriginal= await ImageProduct.findAll({
            where: {product_id: idParams}
        })

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
            })
        

        if(arrayFiles){

            imagesOriginal.forEach(image => {
                fs.unlinkSync(path.join(__dirname,"../public/", image.url))
            });

            await ImageProduct.destroy({
                where: {product_id: idParams}
            })

            

            arrayFiles.forEach(async file => {
                const imageCreated={
                    "url": "/images/imgProducts/" + file.filename,
                    "product_id": idParams
                }
                await ImageProduct.create(imageCreated)
            });

            /*if (arrayFiles.length>imagesOriginal.length){
                for(let i=0; i<imagesOriginal.length;i++){
                    imagesOriginal[i].url= "/images/imgProducts/" + arrayFiles[i].filename
                }
                for(let i=imagesOriginal.length;i<arrayFiles.length;i++){
                    const newImages={
                        "url": "/images/imgProducts/" + arrayFiles[i].filename,
                        "product_id": idParams
                    }
                    imagesOriginal[i].push(newImages)
                }
            }
            
            if (arrayFiles.length<=imagesOriginal.length){
                for(let i=0; i<imagesOriginal.length;i++){
                    imagesOriginal[i].url= "/images/imgProducts/" + arrayFiles[i].filename
                }
            }
        }
        
        No funciona UPSERT
        imagesOriginal.forEach(async image => {
            await ImageProduct.Upsert({
                "url": image.url,
                "product_id": image.product_id},
            {
                where: {id: image.id}
            })
        })
        
        imagesOriginal.forEach(async image => {
            const foundItem = await ImageProduct.findOne({where: {id: image.id}});
            if (foundItem) {
                await ImageProduct.update(
                    {
                        "url": image.url,
                        "product_id": image.product_id}, 
                    {
                        where: {id: image.id}
                    })
            }
            else{
                await ImageProduct.create(
                    {
                        "url": image.url,
                        "product_id": image.product_id 
                    } 
                )
            }
        })*/
    }
        res.redirect("/products/");
    },
    destroy:async (req,res)=>{
        const idParams=req.params.id;

        const imagesOriginal= await ImageProduct.findAll({
            where: {product_id: idParams}
        })
        imagesOriginal.forEach(image => {
            fs.unlinkSync(path.join(__dirname,"../public/", image.url))
        });


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
