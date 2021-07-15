
module.exports = (sequelize, DataTypes) => {
    const alias = 'user'
    const columns = {
        id:{type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            
        },
        lastName:{
            type:DataTypes.STRING,
            
        },
        email:{
            type:DataTypes.STRING,
            
        },
        password:{
            type:DataTypes.STRING,
            
        },
        cell_id:{
            type:DataTypes.INTEGER,
            
        },
        image_id:{
            type:DataTypes.STRING,
            
        }
    }
    const config = {
        underscore:true,
        timestamps:false
    }
    const user = sequelize.define(alias, columns, config);
    return user;
}