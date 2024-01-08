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
    waitingForDeliverer: 'WAITING_FOR_DELIVERER',
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

const COMPLAINT_STATUS = {
    pending: 'PENDING',
    processing: 'PROCESSING',
    closed: 'CLOSED',
}

export { orderStatus, role, itemOperation, sseEvent, COMPLAINT_STATUS }
