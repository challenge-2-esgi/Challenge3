const { role } = require('@/constants')

export function hasOneOfRoles(user, roles = []) {
    if (!user) {
        return false
    }

    return roles.some((role) => user.role === role)
}

export function isAdmin(user) {
    return hasOneOfRoles(user, [role.admin])
}

export function isSupport(user) {
    return hasOneOfRoles(user, [role.support])
}
