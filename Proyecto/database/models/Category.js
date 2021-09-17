module.exports = (sequelize, DataTypes) => {
    const alias = 'Category'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        info: {
            type: DataTypes.STRING
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'categories'
    }
    
    const categoryModel = sequelize.define(alias, cols, config)
    
    categoryModel.associate=models=>{
        categoryModel.hasMany(models.Product,{
            as: "products",
            foreignKey: "category_id"
        })
    }
    return categoryModel
};