'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
  
    static associate(models) {
      // define association here
      Activity.belongsTo(models.Membership, { 
        foreignKey : 'memberId'
      })
      Activity.belongsTo(models.Bill, { 
        foreignKey : 'billId'
      })
    }
  }
  Activity.init({
    memberId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    standardPoints: DataTypes.INTEGER,
    tiersPoints: DataTypes.INTEGER,
    billId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
    paranoid:true
  });
  return Activity;
};