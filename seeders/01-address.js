'use strict'

const { uuidv7 } = require('uuidv7')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'address',
            [
                {
                    id: uuidv7(),
                    streetNumber: 242,
                    street: 'rue du Faubourg Saint Antoine',
                    zipCode: '75012',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.84975051879883,
                    longitude: 2.3869788646698,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    streetNumber: 19,
                    street: 'rue Erard',
                    zipCode: '75012',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.84588623046875,
                    longitude: 2.385345935821533,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    streetNumber: 20,
                    street: 'rue Bouvier',
                    zipCode: '75011',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.8522087,
                    longitude: 2.3869897,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    streetNumber: 1,
                    street: 'rue Bouvier',
                    zipCode: '75011',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.85212707519531,
                    longitude: 2.387821912765503,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    streetNumber: 5,
                    street: 'rue Lemaignan',
                    zipCode: '75014',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.824615478515625,
                    longitude: 2.3407864570617676,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv7(),
                    streetNumber: 10,
                    street: 'boulevard Jourdan',
                    zipCode: '75014',
                    city: 'Paris',
                    country: 'France',
                    latitude: 48.81981658935547,
                    longitude: 2.3416340351104736,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('address', null, {})
    },
}
