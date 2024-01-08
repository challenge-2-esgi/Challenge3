'use strict'

const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')
const { Order } = require('../models')
const { User } = require('../models')
const { ORDER_STATUS, ROLE } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        
        const userClients = await queryInterface.select(
            User, 'user', { where: { role: ROLE.client} }
        )

        const userDeliverers = await queryInterface.select(
            User, 'user', { where: { role: ROLE.deliverer } }
        )

        const userSupports = await queryInterface.select(
            User, 'user', { where: { role: ROLE.support } }
        )

        const messages = [];

        for (let i = 0; i < 3; i++) {
            messages.push({
                id: uuidv7(),
                content: faker.lorem.paragraph(2),
                createdAt: new Date(),
                senderId: [...userClients, ...userDeliverers][0].id,
                receiverId: userSupports[0].id,
            })
        }
        

        await queryInterface.bulkInsert(
            'message',
            messages
            )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('message', null, {})
    },
}
