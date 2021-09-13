const express=require ("express")
const apiRoutes=express.Router()
const userController=require("../../controllers/api/userControllerApi")

apiRoutes.post('/hasEmail', userController.checkEmail)
apiRoutes.get('/', userController.users)
apiRoutes.get('/:id', userController.detail)



module.exports = apiRoutes;