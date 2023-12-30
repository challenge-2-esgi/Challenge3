'use strict'

const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')
const { Order, User } = require('../models')
const { ROLE } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await queryInterface.select(User, 'user', {
            where: { role: ROLE.client },
        })
        const orders = await queryInterface.select(Order, 'order', {})

        if (users.length < 3) {
            throw new Error(
                '[Complaint seeder]: need at least 3 users, given: ' +
                    users.length
            )
        }
        if (orders.length < 3) {
            throw new Error(
                '[Complaint seeder]: need at least 3 orders, given: ' +
                    orders.length
            )
        }

        await queryInterface.bulkInsert(
            'complaint',
            [
                {
                    id: uuidv7(),
                    subject: faker.lorem.slug(),
                    content: faker.lorem.paragraph(2),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: users[0].id,
                    orderId: orders[0].id,
                },
                {
                    id: uuidv7(),
                    subject: faker.lorem.slug(),
                    content: faker.lorem.paragraph(2),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: users[1].id,
                    orderId: orders[1].id,
                },
                {
                    id: uuidv7(),
                    subject: faker.lorem.slug(),
                    content: faker.lorem.paragraph(2),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: users[2].id,
                    orderId: orders[2].id,
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('complaint', null, {})
    },
}
