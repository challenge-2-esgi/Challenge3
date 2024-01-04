const { hasOneOfRoles } = require('../utils/authorization')

function RolesGuard(roles) {
    return (req, res, next) => {
        const user = req.user
        if (user == null || !hasOneOfRoles(req.user, roles)) {
            return res.sendStatus(403)
        }

        next()
    }
}

module.exports = RolesGuard
