'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('rating', 'orderId', {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'order',
                key: 'id',
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('rating', 'orderId')
    },
}
