'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('order', 'receiverFirstname', {
            type: Sequelize.STRING(25),
            allowNull: false,
        })
        await queryInterface.addColumn('order', 'receiverLastname', {
            type: Sequelize.STRING(25),
            allowNull: false,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('order', 'receiverFirstname')
        await queryInterface.removeColumn('order', 'receiverLastname')
    },
}
