'use strict';

const { hashPassword } = require('../lib/v1/utils/passwordUtile');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Admins',[{
      name: "super Admin",
      email:"superadmin@gmail.com",
      password:hashPassword("Ab123456!"),
      createdAt: Sequelize.fn("now"),
      updatedAt: Sequelize.fn("now"),
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
