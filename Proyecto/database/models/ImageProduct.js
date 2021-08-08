module.exports = (sequelize, DataTypes) => {
    const alias = 'ImageProduct'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        url: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.INTEGER,
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'image_products'
    }
    
    const imageModel = sequelize.define(alias, cols, config)

    imageModel.associate=models=>{
        imageModel.belongsTo(models.Product,{ //muchos a 1
            as: "product",
            foreignKey: "product_id"
        })
    }

    return imageModel
};

