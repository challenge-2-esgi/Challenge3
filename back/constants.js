const ROLE = {
    admin: 'ADMIN',
    support: 'SUPPORT',
    deliverer: 'DELIVERER',
    client: 'CLIENT',
}

const ORDER_STATUS = {
    waitingForPickup: 'WAITING_FOR_PICK_UP',
    delivering: 'DELIVERING',
    delivered: 'DELIVERED',
    cancelled: 'CANCELLED',
}

module.exports = { ROLE, ORDER_STATUS }
