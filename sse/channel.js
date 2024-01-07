// inspired by
// https://github.com/triblondon/node-sse-pubsub/tree/master

class Channel {
    constructor() {
        this._subscribers = []
    }

    _buildData(data, event) {
        return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
    }

    publish(data, event) {
        if (!this._subscribers.length) {
            return
        }

        this._subscribers
            .filter((subscriber) => subscriber.event === event)
            .filter((subscriber) => subscriber.canPublish(data))
            .forEach((subscriber) => {
                subscriber.res.write(this._buildData(data, event))
            })
    }

    subscribe(subscriber) {
        subscriber.res.setHeader('Content-Type', 'text/event-stream')
        subscriber.res.setHeader('Connection', 'keep-alive')
        subscriber.res.setHeader('Cache-Control', 'no-cache')

        this._subscribers.push(subscriber)

        // heartbeat message
        const timeout = 30000 // 30 seconds
        setInterval(() => {
            subscriber.res.write(':\n\n')
        }, timeout)

        subscriber.res.on('close', () => {
            this.unsubscribe(subscriber)
        })
    }

    unsubscribe(subscriber) {
        this._subscribers = this._subscribers.filter(
            (other) => other.id !== subscriber.id
        )

        subscriber.res.end()
    }
}

const channel = new Channel()

module.exports = channel
