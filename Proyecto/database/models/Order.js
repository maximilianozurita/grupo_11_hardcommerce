module.exports = (sequelize, DataTypes) => {
    const alias = 'Order'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        user_id: {
            type: DataTypes.INTEGER,
        },
        sum: {
            type: DataTypes.INTEGER,
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'orders'
    }
    
    const orderModel = sequelize.define(alias, cols, config)


    orderModel.associate=models=>{
        orderModel.belongsTo(models.User,{ //1 a muchos
            as: "User",
            foreignKey: "user_id"
        })
    }

    return orderModel
};