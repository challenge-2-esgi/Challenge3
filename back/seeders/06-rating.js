'use strict'

const { uuidv7 } = require('uuidv7')
const Deliverer = require('../models/Deliverer')
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
const { ROLE } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const clients = await queryInterface.select(User, 'user', {
            where: { role: ROLE.client },
        })
        const deliverers = await queryInterface.select(
            Deliverer,
            'deliverer',
            {}
        )

        if (clients.length < 3) {
            throw new Error(
                '[Rating seeder]: need at least 3 clients, given : ' +
                    clients.length
            )
        }

        if (deliverers.length < 3) {
            throw new Error(
                '[Rating seeder]: need at least 3 deliverers, given : ' +
                    deliverers.length
            )
        }

        await queryInterface.bulkInsert(
            'rating',
            [
                {
                    id: uuidv7(),
                    rating: faker.number.int({ min: 0, max: 5 }),
                    clientId: clients[0].id,
                    delivererId: deliverers[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    rating: faker.number.int({ min: 0, max: 5 }),
                    clientId: clients[1].id,
                    delivererId: deliverers[1].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    rating: faker.number.int({ min: 0, max: 5 }),
                    clientId: clients[2].id,
                    delivererId: deliverers[2].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('rating', null, {})
    },
}
