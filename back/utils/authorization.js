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

function isSupportOrOwner(ownerId, user) {
    if (!user) {
        return false
    }

    return user.role === ROLE.support || isOwner(ownerId, user)
}

function isClient(user) {
    if (!user) {
        return false
    }

    return user.role === ROLE.client
}

function isDeliverer(user) {
    if (!user) {
        return false
    }

    return user.role === ROLE.deliverer
}

module.exports = { isAdmin, isOwner, isAdminOrOwner, hasOneOfRoles, isClient, isDeliverer, isSupportOrOwner }
