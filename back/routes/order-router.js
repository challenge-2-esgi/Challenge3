const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const Order = require('../models/Order')

function OrderRouter() {
    const router = new Router()

    router.use('/orders', AuthGuard, CRUDRouter({ model: Order }))
    return router
}

module.exports = OrderRouter
