'use client'

import { sseEvent } from '@/constants'
import storage from '@/services/storage'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useEffect, useState } from 'react'

export default function useSSE(event, params = {}) {
    const [data, setData] = useState(null)
    const url = buildUrl(event, params)

    useEffect(() => {
        if (url) {
            const eventSource = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: 'Bearer ' + storage.getToken(),
                },
            })

            eventSource.addEventListener(event, (e) => {
                setData(JSON.parse(e.data))
            })

            return () => eventSource.close()
        }
    }, [])

    return { data }
}

function buildUrl(event, params) {
    const prefix = process.env.NEXT_PUBLIC_BACK_URL + '/notifications'
    if (event === sseEvent.delivererLocation) {
        return prefix + '/deliverer-location'
    }

    if (event === sseEvent.orderLocation) {
        return params.orderId
            ? prefix + '/order-location?orderId=' + params.orderId
            : null
    }

    if (event === sseEvent.orderStatus) {
        return params.orderId
            ? prefix + '/order-status?orderId=' + params.orderId
            : null
    }

    return null
}
