'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('companies', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_company_name' // Give the constraint a descriptive name
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('companies', 'unique_company_name');
  }
};
