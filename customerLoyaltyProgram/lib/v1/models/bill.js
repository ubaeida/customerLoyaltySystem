"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      Bill.hasMany(models.Activity, {
        foreignKey: "billId",
      });
    }
  }
  Bill.init(
    {
      billNumber: DataTypes.STRING,
      billReference: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
      paranoid: true,
    }
  );
  return Bill;
};
