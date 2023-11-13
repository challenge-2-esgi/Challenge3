const { Router } = require('express')
const CRUDRouter = require('./item-router')
const AuthGuard = require('../middlewares/auth-guard')
const User = require('../models/User')

function UserRouter() {
    const router = new Router()

    router.get('/users/current', AuthGuard, (req, res) => {
        res.status(200).json(req.user)
    })

    router.use('/users', AuthGuard, CRUDRouter({ model: User }))

    return router
}

module.exports = UserRouter
