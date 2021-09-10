const { User } = require("../../database/models");

const userController = {
    checkEmail: async (req, res) => {
         const { email } = req.body

        const emailFinded= await User.findOne({
            where: {
                email
            }
        })

        let hasEmail
        if(emailFinded){
            hasEmail=true;
        }
        else{
            hasEmail=false;
        }

        res.status (200).json({
            meta:{
                status: "Succes",
            },
            data: {
                hasEmail
            }
        })


    },
}

module.exports = userController