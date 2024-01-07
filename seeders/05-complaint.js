'use strict'

const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')
const { Order } = require('../models')
const { COMPLAINT_STATUS, ORDER_STATUS } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const orders = await queryInterface.select(Order, 'order', {
            where: Sequelize.or(
                { status: ORDER_STATUS.delivered },
                { status: ORDER_STATUS.cancelled }
            ),
        })

        if (orders.length < 3) {
            throw new Error(
                '[Complaint seeder]: need at least 3 orders, given: ' +
                    orders.length
            )
        }

        await queryInterface.bulkInsert(
            'complaint',
            [orders[0], orders[1]].map((order) => ({
                id: uuidv7(),
                subject: faker.lorem.slug(),
                content: faker.lorem.paragraph(2),
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: order.clientId,
                orderId: order.id,
                status: faker.helpers.arrayElement(
                    Object.values(COMPLAINT_STATUS)
                ),
            }))
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('complaint', null, {})
    },
}
