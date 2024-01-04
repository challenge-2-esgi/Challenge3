'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // order
        await queryInterface.changeColumn('order', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: true,
        })
        await queryInterface.removeConstraint('order', 'order_delivererId_fkey')
        await queryInterface.addConstraint('order', {
            fields: ['delivererId'],
            type: 'foreign key',
            name: 'order_delivererId_fkey',
            references: {
                table: 'deliverer',
                field: 'id',
            },
            onDelete: 'SET NULL',
        })
        // rating
        await queryInterface.changeColumn('rating', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: true,
        })
        await queryInterface.removeConstraint(
            'rating',
            'rating_delivererId_fkey'
        )
        await queryInterface.addConstraint('rating', {
            fields: ['delivererId'],
            type: 'foreign key',
            name: 'rating_delivererId_fkey',
            references: {
                table: 'deliverer',
                field: 'id',
            },
            onDelete: 'SET NULL',
        })
    },

    async down(queryInterface, Sequelize) {
        // order
        await queryInterface.changeColumn('order', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: false,
        })
        await queryInterface.removeConstraint('order', 'order_delivererId_fkey')
        await queryInterface.addConstraint('order', {
            fields: ['delivererId'],
            type: 'foreign key',
            name: 'order_delivererId_fkey',
            references: {
                table: 'deliverer',
                field: 'id',
            },
            onDelete: 'NO ACTION',
        })
        // rating
        await queryInterface.changeColumn('rating', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: false,
        })
        await queryInterface.removeConstraint(
            'rating',
            'rating_delivererId_fkey'
        )
        await queryInterface.addConstraint('rating', {
            fields: ['delivererId'],
            type: 'foreign key',
            name: 'rating_delivererId_fkey',
            references: {
                table: 'deliverer',
                field: 'id',
            },
            onDelete: 'NO ACTION',
        })
    },
}
