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

    return router;
}

module.exports = StatisticsRouter;
