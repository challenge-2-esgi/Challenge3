'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('complaint', 'userId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        })
        await queryInterface.addColumn('complaint', 'orderId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id',
            },
        })

        await queryInterface.addColumn('deliverer', 'userId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        await queryInterface.addColumn('order', 'clientId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        })
        await queryInterface.addColumn('order', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'deliverer',
                key: 'id',
            },
        })
        await queryInterface.addColumn('order', 'pickupAddressId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'address',
                key: 'id',
            },
        })
        await queryInterface.addColumn('order', 'deliveryAddressId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'address',
                key: 'id',
            },
        })

        await queryInterface.addColumn('rating', 'clientId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        })
        await queryInterface.addColumn('rating', 'delivererId', {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'deliverer',
                key: 'id',
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('complaint', 'userId')
        await queryInterface.removeColumn('complaint', 'orderId')

        await queryInterface.removeColumn('deliverer', 'userId')

        await queryInterface.removeColumn('order', 'clientId')
        await queryInterface.removeColumn('order', 'delivererId')
        await queryInterface.removeColumn('order', 'pickupAddressId')
        await queryInterface.removeColumn('order', 'deliveryAddressId')

        await queryInterface.removeColumn('rating', 'clientId')
        await queryInterface.removeColumn('rating', 'delivererId')
    },
}
