'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MembersInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      membershipNumber: {
        type: Sequelize.STRING
      },
      currentStandardPoints: {
        type: Sequelize.INTEGER
      },
      currentMembershipTier: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MembersInfos');
  }
};