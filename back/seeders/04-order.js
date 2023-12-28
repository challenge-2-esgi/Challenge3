'use strict'

const { ROLE, ORDER_STATUS } = require('../constants')
const Deliverer = require('../models/Deliverer')
const User = require('../models/User')
const Address = require('../models/Address')
const { uuidv7 } = require('uuidv7')
const { faker } = require('@faker-js/faker')

function minusDays(amount) {
    const d = new Date()
    d.setDate(d.getDate() - amount)
    return d
}

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
        const addresses = await queryInterface.select(Address, 'address', {})

        if (clients.length < 3) {
            throw new Error(
                '[Order seeder]: need at least 3 clients, given : ' +
                    clients.length
            )
        }

        if (deliverers.length < 3) {
            throw new Error(
                '[Order seeder]: need at least 3 deliverers, given : ' +
                    deliverers.length
            )
        }

        if (addresses.length < 6) {
            throw new Error(
                '[Order seeder]: need at least 6 addresses, given : ' +
                    addresses.length
            )
        }

        await queryInterface.bulkInsert(
            'order',
            [
                {
                    id: uuidv7(),
                    status: ORDER_STATUS.waitingForPickup,
                    isDelivered: false,
                    pickupTime: null,
                    deliverTime: null,
                    sku: faker.commerce.isbn(),
                    validationCode: faker.commerce.isbn(),
                    distance: 5,
                    receiverEmail: 'reciever1@dev.fr',
                    receiverPhone: '0156069031',
                    clientId: clients[0].id,
                    delivererId: deliverers[0].id,
                    pickupAddressId: addresses[0].id,
                    deliveryAddressId: addresses[1].id,
                    createdAt: minusDays(1),
                    updatedAt: minusDays(1),
                },
                {
                    id: uuidv7(),
                    status: ORDER_STATUS.delivering,
                    isDelivered: false,
                    pickupTime: minusDays(2),
                    deliverTime: null,
                    sku: faker.commerce.isbn(),
                    validationCode: faker.commerce.isbn(),
                    distance: 5,
                    receiverEmail: 'reciever2@dev.fr',
                    receiverPhone: '0156069031',
                    clientId: clients[1].id,
                    delivererId: deliverers[1].id,
                    pickupAddressId: addresses[2].id,
                    deliveryAddressId: addresses[3].id,
                    createdAt: minusDays(3),
                    updatedAt: minusDays(3),
                },
                {
                    id: uuidv7(),
                    status: ORDER_STATUS.delivered,
                    isDelivered: true,
                    pickupTime: minusDays(5),
                    deliverTime: new Date(),
                    sku: faker.commerce.isbn(),
                    validationCode: faker.commerce.isbn(),
                    distance: 5,
                    receiverEmail: 'reciever3@dev.fr',
                    receiverPhone: '0156069031',
                    clientId: clients[2].id,
                    delivererId: deliverers[2].id,
                    pickupAddressId: addresses[4].id,
                    deliveryAddressId: addresses[5].id,
                    createdAt: minusDays(6),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('order', null, {})
    },
}
