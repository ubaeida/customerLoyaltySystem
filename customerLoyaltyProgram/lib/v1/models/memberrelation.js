"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MemberRelation.belongsTo(models.Company, {
        foreignKey: "companyId",
      });
      MemberRelation.belongsTo(models.Membership, {
        as: "firstMember",
        foreignKey: "firstMemberId",
      });
      MemberRelation.belongsTo(models.Membership, {
        as: "secondMember",
        foreignKey: "secondMemberId",
      });
    }
  }
  MemberRelation.init(
    {
      firstMemberId: DataTypes.INTEGER,
      secondMemberId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MemberRelation",
      paranoid: true,
    }
  );
  return MemberRelation;
};
