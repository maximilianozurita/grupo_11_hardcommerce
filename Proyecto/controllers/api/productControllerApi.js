const {Product, ImageProduct, Category, Brand}=require("../../database/models")

const productsController = {
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
                product: productList
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

        const productMapped = productList.map(product =>{
            const urlImage = "http://localhost:3000/api/products/"+product.images.url
            product.setDataValue ("cacas", urlImage)
            return product;
        })   
        
        res.status(200).json({
            meta:{
                status: "succes",
            },
            data:{
                product: productList
            }
        })
    }
}

module.exports = productsController
