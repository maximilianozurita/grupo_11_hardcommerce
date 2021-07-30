module.exports = (sequelize, DataTypes) => {
    const alias = 'User'
    
    const cols = {  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.INTEGER
        },
        cell: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
    }
    
    const config = {
        tableName: "users",  // <--------
        timestamps: false, /* no va a buscar las columnas de timestamps */
        underscored: false  // <si la columna esta snakecase lo pongo true
    }
    
    const UserModel = sequelize.define(alias, cols, config)

    return UserModel;
}           
