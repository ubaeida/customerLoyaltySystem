'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      membershipNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      standardPoints: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tiersPoints: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      membershipTier: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Bronze'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{ 
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Memberships');
  }
};