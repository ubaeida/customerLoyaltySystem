'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MembersInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MembersInfo.init({
    membershipNumber: DataTypes.STRING,
    currentStandardPoints: DataTypes.INTEGER,
    currentMembershipTier: DataTypes.STRING,
    phone: DataTypes.STRING,
    companyName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MembersInfo',
  });
  return MembersInfo;
};