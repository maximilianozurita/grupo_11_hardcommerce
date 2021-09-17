const { setRandomFallback } = require("bcryptjs");
const {Product, ImageProduct, Category, Brand}=require("../../database/models")
const { Op, where } = require('sequelize');

const productsController = {
     search: async (req, res) => {
        const { name } = req.query

        const productFound = await Product.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })

        res.status(200).json({
            meta: {
                status: "success",
                total: productFound.count
            },
            data: {
                Products: productFound.rows
            }
        })
    },
    listOfProducts: async (req, res) => {
        const productList = await Product.findAll({
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        })


        res.status(200).json({
            meta:{
                status: "succes",
            },
            data:{
                products: productsMapped
            }
        })
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

        res.status(200).json({
            meta:{
                status: "succes",
            },
            data:{
                product: productToShow
            }
        })

    },
    products:async (req, res) => {
        const productList = await Product.findAll({
            include:[
                {association: 'images'},
                {association: 'category'},
                {association: 'brand'}
            ]
        });

        const productsMapped = productList.map(product => {
            product.images.forEach( images => {
                const urlImage =  "http://localhost:3000"+images.url
                images.setDataValue ("url", urlImage)
                
            });    
            
           return product
        });
        
        res.status(200).json({
            meta:{
                status: "succes",
            },
            data:{
                product: productsMapped
            }
        })
    }
}

module.exports = productsController
