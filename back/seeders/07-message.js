'use strict'

const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')
const { Order } = require('../models')
const { User } = require('../models')
const { ORDER_STATUS, ROLE } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const orders = await queryInterface.select(Order, 'order', {
            where: Sequelize.or(
                { status: ORDER_STATUS.delivered },
                { status: ORDER_STATUS.cancelled }
            ),
        })

        const userSupports = await queryInterface.select(
            User, 'user', { where: { role: ROLE.support } }
        )

        if (orders.length < 3) {
            throw new Error(
                '[Message seeder]: need at least 3 orders, given: ' +
                    orders.length
            )
        }

        const messages = [];

        [orders[0], orders[1]].map((order) => {

            for (let i = 0; i < 3; i++) {
                messages.push({
                    id: uuidv7(),
                    content: faker.lorem.paragraph(2),
                    createdAt: new Date(),
                    senderId: order.clientId,
                    receiverId: userSupports[0].id,
                    orderId: order.id,
                })
            }

            return messages;
        })

        await queryInterface.bulkInsert(
            'message',
            messages
            )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('message', null, {})
    },
}
