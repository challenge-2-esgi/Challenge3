const { User } = require('../models')
const jwt = require('../services/jwt')

function LoggedInUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return next()
    }

    jwt.verify(token, async (err, payload) => {
        if (err) return res.sendStatus(401)

        const user = await User.findByPk(payload.sub)
        req.user =
            user == null
                ? null
                : {
                      id: user.id,
                      role: user.role,
                  }

        next()
    })
}

module.exports = LoggedInUser
