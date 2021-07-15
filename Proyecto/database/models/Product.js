module.exports=(sequelize, DataType)=>{

const alias='product'
const cols={
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    }
}
const config={
    underscore:true, //te busca las columnas en snake case
    timestamps: false //No va a buscar los timestamps en las columnas
}

const ProductModel=sequelize.define(alias,cols,config)

return ProductModel
}