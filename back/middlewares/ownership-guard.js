const { isAdminOrOwner, isOwner } = require('../utils/authorization')

function OwnershipGuard({ findResource, ownerKey, includeAdmin = false }) {
    return async (req, res, next) => {
        try {
            const item = await findResource(req)

            if (!item) {
                return res.sendStatus(404)
            }

            if (includeAdmin) {
                return isAdminOrOwner(item[ownerKey], req.user)
                    ? next()
                    : res.sendStatus(403)
            }

            return isOwner(ownerKey, req.user) ? next() : res.sendStatus(403)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OwnershipGuard
