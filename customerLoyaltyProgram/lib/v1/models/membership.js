'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.Company, { 
        foreignKey: 'companyId',
      })
      Membership.belongsTo(models.User, { 
        foreignKey: 'userId',
      })
      Membership.hasMany(models.MemberRelation, { 
        foreignKey: 'firstMemberId',
        as: "firstMember",
      })
      Membership.hasMany(models.MemberRelation, { 
        foreignKey: 'secondMemberId',
        as: "secondMember",
      })
      Membership.hasMany(models.Activity ,{
        foreignKey:'memberId'
      })
    }
  }
  Membership.init({
    companyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    membershipNumber: DataTypes.STRING,
    standardPoints: DataTypes.INTEGER,
    tiersPoints: DataTypes.INTEGER,
    membershipTier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Membership',
    paranoid:true
  });
  return Membership;
};