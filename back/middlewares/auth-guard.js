const User = require('../models/User')
const jwt = require('../services/jwt')

function AuthGuard(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, async (err, payload) => {
        if (err) return res.sendStatus(401)

        const user = await User.findByPk(payload.sub)
        req.user = user == null ? null : { id: user.id, role: user.role }

        next()
    })
}

module.exports = AuthGuard
