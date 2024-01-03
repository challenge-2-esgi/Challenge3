const sseEvent = require('./events')

class Subscriber {
    constructor(id, event, res) {
        this.id = id
        this.event = event
        this.res = res
    }

    canPublish(data) {
        return true
    }
}

class OrderSubscriber extends Subscriber {
    constructor(id, event, res, order) {
        super(id, event, res)
        this.order = order
    }

    canPublish(data) {
        if (this.event === sseEvent.orderLocation) {
            return data.delivererId === this.order.delivererId
        }

        return data.orderId === this.order.id
    }
}

class ComplaintSubscriber extends Subscriber {
    constructor(id, event, res, complaint) {
        super(id, event, res)
        this.complaint = complaint
    }

    canPublish(data) {
        if (this.event === sseEvent.orderLocation) {
            return data.delivererId === this.order.delivererId
        }

        return data.orderId === this.order.id
    }
}

module.exports = {
    Subscriber,
    OrderSubscriber,
}
