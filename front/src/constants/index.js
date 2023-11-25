const role = {
    admin: 'ADMIN',
    support: 'SUPPORT',
    deliverer: 'DELIVERER',
    client: 'CLIENT',
}

const itemOperation = {
    add: 'add',
    edit: 'edit',
    view: 'view',
}

const orderStatus = {
    waitingForPickup: 'WAITING_FOR_PICK_UP',
    delivering: 'DELIVERING',
    delivered: 'DELIVERED',
    cancelled: 'CANCELLED',
}

export { orderStatus, role, itemOperation }
