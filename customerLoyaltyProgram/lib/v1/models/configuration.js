'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    static associate(models) {
      Configuration.belongsTo(models.Company, { 
        foreignKey: 'companyId'
      })
  }}
  Configuration.init({
    companyId: DataTypes.INTEGER,
    key: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Configuration',
    paranoid:true
  });
  return Configuration;
};