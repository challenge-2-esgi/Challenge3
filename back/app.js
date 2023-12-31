const express = require('express')
const cors = require('cors')
const AuthRouter = require('./routes/auth-router')
const ValidationError = require('./errors/ValidationError')
const UserRouter = require('./routes/user-router')
const OrderRouter = require('./routes/order-router')
const RatingRouter = require('./routes/rating-router')
const NotificationRouter = require('./routes/notification-router')
const Deliverer = require('./models/Deliverer')
const DelivererRouter = require('./routes/deliverer-router')
const ComplaintRouter = require('./routes/complaint-router')
const StatisticsRouter = require('./routes/statistics')

// TODO: define cors options
// const corsOptions = {}

const app = express()
app.use(cors())
app.use(express.json())

app.use(AuthRouter())
app.use(UserRouter())
app.use(OrderRouter())
app.use(RatingRouter())
app.use(NotificationRouter())
app.use(DelivererRouter())
app.use(ComplaintRouter())
app.use(StatisticsRouter())

// errors middleware
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(422).json(err.errors)
    } else if (err instanceof SyntaxError) {
        res.sendStatus(400)
    } else {
        console.log('[Error] : ' + err)
        res.status(500).send(err.message)
    }
})

module.exports = app
