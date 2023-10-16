'use strict'

const { ROLE, ORDER_STATUS } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('address', {
            id: { type: Sequelize.UUID, primaryKey: true },
            streetNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            street: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            zipCode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            latitude: Sequelize.DECIMAL(8, 6),
            longitude: Sequelize.DECIMAL(9, 6),
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })

        await queryInterface.createTable('complaint', {
            id: { type: Sequelize.UUID, primaryKey: true },
            subject: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })

        await queryInterface.createTable('deliverer', {
            id: { type: Sequelize.UUID, primaryKey: true },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            latitude: Sequelize.DECIMAL(8, 6),
            longitude: Sequelize.DECIMAL(9, 6),
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })

        await queryInterface.createTable('order', {
            id: { type: Sequelize.UUID, primaryKey: true },
            sku: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            isDelivered: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            pickupTime: Sequelize.DATE,
            deliverTime: Sequelize.DATE,
            validationCode: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            distance: {
                type: Sequelize.FLOAT,
                allowNull: null,
            },
            status: {
                type: Sequelize.ENUM(Object.values(ORDER_STATUS)),
                defaultValue: ORDER_STATUS.waitingForPickup,
            },
            recieverEmail: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            recieverPhone: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })

        await queryInterface.createTable('rating', {
            id: { type: Sequelize.UUID, primaryKey: true },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })

        await queryInterface.createTable('user', {
            id: { type: Sequelize.UUID, primaryKey: true },
            firstname: {
                type: Sequelize.STRING(25),
                allowNull: false,
            },
            lastname: {
                type: Sequelize.STRING(25),
                allowNull: false,
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM(Object.values(ROLE)),
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('address')
        await queryInterface.dropTable('complaint')
        await queryInterface.dropTable('deliverer')
        await queryInterface.dropTable('order')
        await queryInterface.dropTable('rating')
        await queryInterface.dropTable('user')
    },
}
