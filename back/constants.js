const ROLE = {
    admin: 'ADMIN',
    support: 'SUPPORT',
    deliverer: 'DELIVERER',
    client: 'CLIENT',
}

const ORDER_STATUS = {
    waitingForDeliverer: 'WAITING_FOR_DELIVERER',
    waitingForPickup: 'WAITING_FOR_PICK_UP',
    delivering: 'DELIVERING',
    delivered: 'DELIVERED',
    cancelled: 'CANCELLED',
}

const COMPLAINT_STATUS = {
    pending: 'PENDING',
    processing: 'PROCESSING',
    closed: 'CLOSED',
}

module.exports = { ROLE, ORDER_STATUS, COMPLAINT_STATUS }
