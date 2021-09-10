const express=require ("express")
const apiRoutes=express.Router()
const productRoutes=require("./productRoutesApi")
const userRoutes=require("./userRouterApi")

apiRoutes.use("/products",productRoutes);

apiRoutes.use("/users",userRoutes);

module.exports=apiRoutes