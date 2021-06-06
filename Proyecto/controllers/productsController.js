const path = require('path')
const productsModels=require ("../models/productsModels")

const productsController = {
    listaDeArticulos: (req, res) => {
        const productList=productsModels.findAll();
        //res.sendFile(path.resolve('views/products/listaDeArticulos.html'))-->>En caso de enviar el HTML.
        res.render('products/listOfArticles',{productList})
    },
    detail: (req, res) => {
        res.render('products/productDetail')
    },
    cart: (req,res)=>{
        res.render('products/productCart')
    },
    products:(req, res) => {
        const productList=productsModels.findAll()
        res.render('products/products',{productList})
    },
    formNew: (req,res)=>{
        res.render("products/productCreate")
    },
    store: (req,res)=>{
        const product={
            "id": req.body.id,
            "name": req.body.name,
            "description": req.body.description,
            "category": req.body.category,
            "precio": req.body.price,
            "cuotas": req.body.cuotas
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
