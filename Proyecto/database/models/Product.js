module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING
        },
        product_description: {
            type: DataTypes.STRING,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        quota: {
            type: DataTypes.INTEGER,
        },
        image_id: {
            type: DataTypes.INTEGER,
        },
        short_description: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.STRING
        },
        sales: {
            type: DataTypes.STRING
        },
        brand_id: {
            type: DataTypes.STRING
        },
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'products'
    }
    
    const ProductModel = sequelize.define(alias, cols, config)

    return ProductModel
};