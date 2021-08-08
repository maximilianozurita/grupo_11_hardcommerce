module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING
        }
    }
    
    const config = {
        underscored: true, /* te busca en snake case las columnas */
        timestamps: false, /* no va a buscar las columnas de timestamps */
        tableName: 'brands'
    }
    
    const BrandModel = sequelize.define(alias, cols, config)

    BrandModel.associate=models=>{
        BrandModel.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'brand_id', 
        })
    }

    return BrandModel
};