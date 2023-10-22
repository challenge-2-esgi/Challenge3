const { Router } = require('express')
const User = require('../models/User')
const hasher = require('../services/hasher')
const jwt = require('../services/jwt')
const Validator = require('../middlewares/validator')
const validators = require('../validators')

function AuthRouter() {
    const router = new Router()

    router.post(
        '/login',
        Validator(validators.login),
        async function (req, res, next) {
            try {
                const { email, password } = req.body
                const user = await User.unscoped().findOne({
                    where: {
                        email,
                    },
                })

                if (user && (await hasher.compare(password, user.password))) {
                    res.status(200).json({ token: jwt.sign({ sub: user.id }) })
                } else {
                    res.sendStatus(401)
                }
            } catch (error) {
                next(error)
            }
        }
    )

    return router
}

module.exports = AuthRouter
