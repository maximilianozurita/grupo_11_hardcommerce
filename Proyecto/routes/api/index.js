const express=require ("express")
const apiRoutes=express.Router()
const productRoutes=require("./productRoutesApi")
const userRoutes=require("./userRouterApi")

apiRoutes.use("/produts",productRoutes);
apiRoutes.use("user",userRoutes);

module.exports=apiRoutes