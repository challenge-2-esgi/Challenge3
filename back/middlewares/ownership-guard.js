const { isAdminOrOwner, isOwner, isSupportOrOwner } = require('../utils/authorization')

function OwnershipGuard({
    findResource,
    ownerKey,
    includeAdmin = false,
    includeSupport = false,
    passResource = false, // if set to true, resource will be passed to the next middleware (using response locals)
}) {
    return async (req, res, next) => {
        try {
            const item = await findResource(req)

            if (!item) {
                return res.sendStatus(404)
            }

            if (includeAdmin || includeSupport) {
                if (!isAdminOrOwner(item[ownerKey], req.user) && !isSupportOrOwner(item[ownerKey], req.user)) {
                    return res.sendStatus(403)
                }

                if (passResource) {
                    res.locals.resource = item
                }

                return next()
            }

            if (!isOwner(item[ownerKey], req.user)) {
                return res.sendStatus(403)
            }

            if (passResource) {
                res.locals.resource = item
            }
            return next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OwnershipGuard
