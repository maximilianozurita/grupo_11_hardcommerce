module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING,
        },
        product_description: {
            type: DataTypes.STRING,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        brand_id: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        quota: {
            type: DataTypes.INTEGER,
        },
        short_description: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.STRING,
        },
        sales: {
            type: DataTypes.STRING,
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'products'
    }
    
    const ProductModel = sequelize.define(alias, cols, config)

    ProductModel.associate=models=>{
        ProductModel.hasMany(models.ImageProduct,{ //1 a muchos
            as: "images",
            foreignKey: "product_id"
        })

        ProductModel.belongsTo(models.Category,{
            as: "category",
            foreignKey: "category_id"
        })
        
        ProductModel.belongsTo(models.Brand,{
            as: 'brand',
            foreignKey: 'brand_id',
        })

    }
    return ProductModel
};