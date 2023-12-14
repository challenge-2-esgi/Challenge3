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

const sseEvent = {
    delivererLocation: 'DELIVERER_LOCATION_EVENT',
    orderLocation: 'ORDER_LOCATION_EVENT',
    orderStatus: 'ORDER_STATUS_EVENT',
}

export { orderStatus, role, itemOperation, sseEvent }
