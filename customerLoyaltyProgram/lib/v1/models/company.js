"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Membership, {
        foreignKey: "companyId",
      });
      Company.hasMany(models.Rule, {
        foreignKey: "companyId",
      });
      Company.hasMany(models.MemberRelation, {
        foreignKey: "companyId",
      });
      Company.hasMany(models.Configuration, {
        foreignKey: "companyId",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      logo: DataTypes.STRING,
      website: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
      paranoid: true,
    }
  );
  return Company;
};
