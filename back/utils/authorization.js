const { ROLE } = require('../constants')

function hasOneOfRoles(user, roles = []) {
    if (!user) {
        return false
    }

    return roles.some((role) => user.role === role)
}

function isAdmin(user) {
    if (!user) {
        return false
    }

    return user.role === ROLE.admin
}

function isOwner(ownerId, user) {
    if (!user) {
        return false
    }

    return ownerId === user.id
}

function isAdminOrOwner(ownerId, user) {
    if (!user) {
        return false
    }

    return user.role === ROLE.admin || isOwner(ownerId, user)
}

module.exports = { isAdmin, isOwner, isAdminOrOwner, hasOneOfRoles }
