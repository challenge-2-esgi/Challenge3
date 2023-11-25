const { role } = require('@/constants')

export function hasOneOfRoles(user, roles = []) {
    if (!user) {
        return false
    }

    return roles.some((role) => user.role === role)
}

export function isAdmin(user) {
    if (!user) {
        return false
    }
    return user.role === role.admin
}

export function isSupport(user) {
    if (!user) {
        return false
    }
    return user.role === role.support
}
