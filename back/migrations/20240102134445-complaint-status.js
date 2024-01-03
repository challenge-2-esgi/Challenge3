'use strict';

const { COMPLAINT_STATUS } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('complaint', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: COMPLAINT_STATUS.pending
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('complaint', 'status');
  }
};
