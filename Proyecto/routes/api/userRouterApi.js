const express=require ("express")
const apiRoutes=express.Router()

const userController=require("../../controllers/api/userControllerApi")


apiRoutes.post('/hasEmail', userController.checkEmail)


module.exports = apiRoutes;