'use strict'

const { faker } = require('@faker-js/faker')
const { uuidv7 } = require('uuidv7')
const { ROLE } = require('../constants')

const users = [
    { email: 'admin@dev.fr', role: ROLE.admin },
    { email: 'support1@dev.fr', role: ROLE.support },
    { email: 'support2@dev.fr', role: ROLE.support },
    { email: 'client1@dev.fr', role: ROLE.client },
    { email: 'client2@dev.fr', role: ROLE.client },
    { email: 'client3@dev.fr', role: ROLE.client },
    { email: 'deliverer1@dev.fr', role: ROLE.deliverer },
    { email: 'deliverer2@dev.fr', role: ROLE.deliverer },
    { email: 'deliverer3@dev.fr', role: ROLE.deliverer },
]
const PASSWORD = 'password'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'user',
            users.map((u) => ({
                id: uuidv7(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                role: u.role,
                email: u.email,
                password: PASSWORD,
                createdAt: new Date(),
                updatedAt: new Date(),
            })),
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user', null, {})
    },
}
