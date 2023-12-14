'use strict'

const { uuidv7 } = require('uuidv7')
const { ROLE } = require('../constants')
const User = require('../models/User')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await queryInterface.select(User, 'user', {
            where: { role: ROLE.deliverer },
        })

        if (users.length < 3) {
            throw new Error(
                '[Deliverer seeder]: need at least 3 users, given : ' +
                    users.length
            )
        }

        await queryInterface.bulkInsert(
            'deliverer',
            [
                {
                    id: uuidv7(),
                    isActive: true,
                    phone: '0156069034',
                    latitude: 48.8412,
                    longitude: 2.3876,
                    userId: users[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    isActive: false,
                    phone: '0156069034',
                    userId: users[1].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    isActive: true,
                    phone: '0156069034',
                    latitude: 48.84588623046875,
                    longitude: 2.385345935821533,
                    userId: users[2].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('deliverer', null, {})
    },
}
