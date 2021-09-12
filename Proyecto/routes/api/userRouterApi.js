const express=require ("express")
const apiRoutes=express.Router()

const userControllerApi=require("../../controllers/api/userControllerApi")


apiRoutes.post('/hasEmail', userControllerApi.checkEmail);
apiRoutes.get("/",userControllerApi.users);
apiRoutes.get("/:id",userControllerApi.detail);

module.exports = apiRoutes;