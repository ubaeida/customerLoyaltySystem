'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billNumber: {
        allowNull:false,
        type: Sequelize.STRING
      },
      billReference: {
        allowNull:false,
        type: Sequelize.STRING
      },
      amount: {
        allowNull:false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      companyId: {
        allowNull:false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bills');
  }
};