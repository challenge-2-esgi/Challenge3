const { User, Deliverer } = require('../models')
const jwt = require('../services/jwt')
const { isDeliverer } = require('../utils/authorization')

function AuthGuard(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, async (err, payload) => {
        if (err) return res.sendStatus(401)

        const user = await User.findByPk(payload.sub)

        if (user == null) {
            req.user = null
            return next()
        }

        req.user = {
            id: user.id,
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }

        if (isDeliverer(user)) {
            const deliverer = await Deliverer.findOne({
                where: {
                    userId: user.id,
                },
            })
            req.user.deliverer =
                deliverer == null
                    ? null
                    : {
                          id: deliverer.id,
                          isActive: deliverer.isActive,
                      }
        }

        next()
    })
}

module.exports = AuthGuard
