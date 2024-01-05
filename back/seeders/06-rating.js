'use strict'

const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')
const { Order } = require('../models')
const { ORDER_STATUS } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const orders = await queryInterface.select(Order, 'order', {})

        await queryInterface.bulkInsert(
            'rating',
            orders
                .filter(
                    (order) =>
                        order.status === ORDER_STATUS.delivered ||
                        order.status === ORDER_STATUS.cancelled
                )
                .map((order) => ({
                    id: uuidv7(),
                    rating: faker.number.int({ min: 0, max: 5 }),
                    clientId: order.clientId,
                    delivererId: order.delivererId,
                    orderId: order.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }))
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('rating', null, {})
    },
}
