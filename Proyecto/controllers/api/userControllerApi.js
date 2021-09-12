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
    users: async (req, res ) => {
        try {
            const users = await User.findAndCountAll({
                attributes: ["id","name","last_name","email"]
            })

            const usersMapped = users.rows.map(user => {
                const urlDetail = "http://localhost:3005/api/users/" + user.id 
                user.setDataValue ("detail", urlDetail)
                return user;
            });

                res.status(200).json({
                    meta: {
                        status: "success",
                        total: users.count
                    },
                    data:{
                        data: usersMapped
                    }

                })
        } catch (err) {
            res.send(500).json({
                meta: {
                    status:"error"
                },
                error: {
                    msj: "cannot connect to database"

                }

            })
        }
    },
    detail: async (req, res) => {

        const user = await User.findByPk(req.params.id, {attributes:["id","name","last_name","image"]})

        if(!user) {
            res.status(404).json({
                meta: {
                    status: "not_found"
                },
            })
            return
        }
            res.status(200).json({
                meta:{
                    status:"success",
                    
                },
                data:{
                    user: user
                    
                }
            })
    }

}

module.exports = userController