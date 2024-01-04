const { Router } = require('express');
const moment = require('moment');
const MongoOrder = require('../mongo-models/Order')
const MongoRating = require('../mongo-models/Rating')
const MongoUser = require('../mongo-models/User')

function StatisticsRouter() {
    const router = new Router();

    // Endpoint to get the number of deliveries made per day
    router.get('/deliveries-per-day', async (req, res) => {
        try {
            // Calculate the start of the current day
            const currentDate = moment().startOf('day');

            // Query MongoDB for the count of delivered orders on the current day
            const deliveriesCount = await MongoOrder.countDocuments({
                isDelivered: true,
                deliverTime: { $gte: currentDate.toDate() },
            });

            res.json({ deliveriesCount });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Endpoint to get the average rating of deliverers
    router.get('/average-deliverer-rating', async (req, res) => {
        try {
            const averageRating = await MongoRating.aggregate([
                { $match: {  'rating': { $exists: true } } },
                { $group: { _id: null, averageRating: { $avg: '$rating' } } },
            ]);

            res.json({ averageRating: averageRating[0]?.averageRating || 0 });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Endpoint to get the counts of new users and new deliverers created per week
    router.get('/new-users-count', async (req, res) => {
        try {
            // Calculate the start of the current week
            const startOfWeek = moment().startOf('week');

            // Query MongoDB for the count of new users created during the current week
            const newUsersCount = await MongoUser.countDocuments({
                createdAt: { $gte: startOfWeek.toDate(), $lt: moment().toDate() },
                role: 'CLIENT', // 'CLIENT' is the role for regular users
            });

            // Query MongoDB for the count of new deliverers created during the current week
            const newDeliverersCount = await MongoUser.countDocuments({
                createdAt: { $gte: startOfWeek.toDate(), $lt: moment().toDate() },
                role: 'DELIVERER', // 'DELIVERER' is the role for deliverers
            });

            res.json({ newUsersCount, newDeliverersCount });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
}

module.exports = StatisticsRouter;
