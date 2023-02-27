'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Company, { 
        foreignKey: 'companyId'
      })
    }
  }
  Bill.init({
    billNumber: DataTypes.STRING,
    billReference: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
    paranoid : true
  });
  return Bill;
};