module.exports = (sequelize, DataTypes) => {
    const alias = 'OrderItem'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        user_id: {
            type: DataTypes.INTEGER,
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        ordered: {
            type: DataTypes.INTEGER,
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'orderItems'
    }
    
    const orderItemModel = sequelize.define(alias, cols, config)

    return orderItemModel
};