const { Router } = require('express')
const moment = require('moment')
const { ROLE } = require('../constants')
const AuthGuard = require('../middlewares/auth-guard')
const RolesGuard = require('../middlewares/roles-guard')
const MongoOrder = require('../mongo-models/Order')
const MongoRating = require('../mongo-models/Rating')
const MongoUser = require('../mongo-models/User')

function StatisticsRouter() {
    const router = new Router()

    // Endpoint to get the number of active deliverers
    router.get(
        '/active-deliverers-count',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        async (req, res) => {
            try {
                // Query MongoDB for the count of active deliverers
                const activeDeliverersCount = await MongoUser.countDocuments({
                    role: ROLE.deliverer,
                    isActive: true,
                })

                res.json({ activeDeliverersCount })
            } catch (error) {
                console.error(error)
                res.status(500).send('Internal Server Error')
            }
        }
    )

    // Endpoint to get the number of deliveries made per day
    router.get(
        '/deliveries-per-day',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        async (req, res) => {
            try {
                // Calculate the start of the last 7 days
                const startOfLast7Days = moment()
                    .subtract(7, 'days')
                    .startOf('day')

                // Response array to store counts for each day
                const response = []

                // Loop through each day within the last 7 days
                let currentDate = moment(startOfLast7Days)
                while (currentDate.isSameOrBefore(moment())) {
                    // Query MongoDB for the count of delivered orders on the current day
                    const deliveriesCount = await MongoOrder.countDocuments({
                        isDelivered: true,
                        deliverTime: {
                            $gte: currentDate.toDate(),
                            $lt: currentDate.clone().endOf('day').toDate(),
                        },
                    })

                    const currentDay = currentDate.format('DD-MM-YYYY')

                    // Add counts to the response array for the current day
                    response.push({
                        date: currentDay,
                        nbOfDeliveries: deliveriesCount,
                    })

                    currentDate.add(1, 'day')
                }

                res.json(response)
            } catch (error) {
                console.error(error)
                res.status(500).send('Internal Server Error')
            }
        }
    )

    // Endpoint to get the average rating of deliverers
    router.get(
        '/average-deliverer-rating',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        async (req, res) => {
            try {
                const averageRating = await MongoRating.aggregate([
                    { $match: { rating: { $exists: true } } },
                    {
                        $group: {
                            _id: null,
                            averageRating: { $avg: '$rating' },
                        },
                    },
                ])

                res.json({
                    averageRating: averageRating[0]?.averageRating || 0,
                })
            } catch (error) {
                console.error(error)
                res.status(500).send('Internal Server Error')
            }
        }
    )

    // Endpoint to get the counts of new users and new deliverers created per week
    router.get(
        '/new-users-count',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        async (req, res) => {
            try {
                // Calculate the start of the last 7 days
                const startOfLast7Days = moment()
                    .subtract(7, 'days')
                    .startOf('day')

                // Response array to store counts for each day
                const response = []

                // Loop through each day within the last 7 days
                let currentDate = moment(startOfLast7Days)
                while (currentDate.isSameOrBefore(moment())) {
                    const currentDay = currentDate.format('DD-MM-YYYY')

                    // Query MongoDB for the counts of new users and new deliverers created on the current day
                    const newUsers = await MongoUser.countDocuments({
                        createdAt: {
                            $gte: currentDate.toDate(),
                            $lt: currentDate.clone().endOf('day').toDate(),
                        },
                        role: 'CLIENT', // 'CLIENT' is the role for regular users
                    })

                    const newDeliverers = await MongoUser.countDocuments({
                        createdAt: {
                            $gte: currentDate.toDate(),
                            $lt: currentDate.clone().endOf('day').toDate(),
                        },
                        role: 'DELIVERER', // 'DELIVERER' is the role for deliverers
                    })

                    // Add counts to the response array for the current day
                    response.push({
                        date: currentDay,
                        nbNewUsers: newUsers,
                        nbNewDeliverers: newDeliverers,
                    })

                    currentDate.add(1, 'day')
                }

                res.json(response)
            } catch (error) {
                console.error(error)
                res.status(500).send('Internal Server Error')
            }
        }
    )

    // Endpoint to get the average delivery time for all time
    router.get(
        '/average-delivery-time',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        async (req, res) => {
            try {
                // Query MongoDB for all delivered orders
                const orders = await MongoOrder.find({ isDelivered: true })

                // Calculate the total delivery time and count of orders
                let totalDeliveryTime = 0
                let ordersCount = 0

                orders.forEach((order) => {
                    if (order.deliverTime && order.pickupTime) {
                        // Calculate the delivery time in minutes
                        const deliveryTimeInMinutes = moment(
                            order.deliverTime
                        ).diff(moment(order.pickupTime), 'minutes')
                        totalDeliveryTime += deliveryTimeInMinutes
                        ordersCount++
                    }
                })

                // Calculate the average delivery time for all time
                const averageDeliveryTime =
                    ordersCount > 0 ? totalDeliveryTime / ordersCount : 0

                res.json({ averageDeliveryTime })
            } catch (error) {
                console.error(error)
                res.status(500).send('Internal Server Error')
            }
        }
    )

    return router
}

module.exports = StatisticsRouter
