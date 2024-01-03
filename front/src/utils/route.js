import { itemOperation } from '@/constants'
import route from '@/constants/route'

function buildItemRoute(base, itemId, operation) {
    if (operation === itemOperation.add) {
        return base + itemId + route.ITEM_ADD
    }

    if (operation === itemOperation.edit) {
        return base + itemId + route.ITEM_EDIT
    }

    if (operation === itemOperation.view) {
        return base + itemId + route.ITEM_VIEW
    }

    return base + itemId
}

export function buildEditUserRoute(userId) {
    return buildItemRoute(route.USERS + '/', userId, itemOperation.edit)
}

export function buildEditOrderRoute(orderId) {
    return buildItemRoute(route.ORDERS + '/', orderId, itemOperation.edit)
}

export function buildEditRatingRoute(ratingId) {
    return buildItemRoute(route.RATINGS + '/', ratingId, itemOperation.edit)
}

export function buildEditDelivererRoute(delivererId) {
    return buildItemRoute(route.DELIVERERS + '/', delivererId, itemOperation.edit)
}

export function buildViewDelivererRoute(delivererId) {
    return buildItemRoute(route.DELIVERERS + '/', delivererId, itemOperation.view)
}

export function buildEditComplaintRoute(complaintId) {
    return buildItemRoute(route.COMPLAINTS + '/', complaintId, itemOperation.edit)
}

export function buildViewComplaintRoute(complaintId) {
    return buildItemRoute(route.COMPLAINTS + '/', complaintId, itemOperation.view)
}
