module.exports = (sequelize, DataTypes) => {
    const alias = ‘m’
    const columns = {}
    const config = {}
    const Model = sequelize.define(alias, columns, config);
    return Model;
    }