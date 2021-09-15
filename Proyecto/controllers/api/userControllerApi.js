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
                attributes: ["id","name","last_name","email","image"]
            })

            const usersMapped = users.rows.map(user => {

                const urlImage =  "http://localhost:3000"+user.image
                user.setDataValue ("image", urlImage)
                const urlDetail = "http://localhost:3000/api/users/"+user.id
                user.setDataValue ("detail",urlDetail)
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

        const user = await User.findByPk(req.params.id, {attributes:["id","name","last_name","email","cell","image"]});
        const urlImage =  "http://localhost:3000"+user.image
        user.setDataValue ("image", urlImage)

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
                id: user.id,
                name: user.name,
                lastname: user.last_name,
                email: user.email,
                cell: user.cell,
                image: urlImage
            }
        })
    }
}

module.exports = userController