const { orderStatus } = require('../constants')

export const mapStatusToLabel = (status, t, nameSpace) => {
    switch (status) {
        case orderStatus.waitingForPickup:
            return t('order.statusTypes.waiting_for_pick_up', { ns: nameSpace })
        case orderStatus.delivering:
            return t('order.statusTypes.delivering', { ns: nameSpace })
        case orderStatus.delivered:
            return t('order.statusTypes.delivered', { ns: nameSpace })
        case orderStatus.cancelled:
            return t('order.statusTypes.cancelled', { ns: nameSpace })
        default:
            return 'Unknown'
    }
}
