import Map from '@/components/Map'
import { sseEvent } from '@/constants'
import useSSE from '@/hooks/useSSE'
import { useMemo } from 'react'

const TrackingView = ({ deliverers }) => {
    const { data: location } = useSSE(sseEvent.delivererLocation)

    const markers = useMemo(() => {
        if (location) {
            const deliverer = deliverers.find(
                (d) => d.id === location.delivererId
            )

            if (deliverer) {
                const filteredDeliverers = deliverers.filter(
                    (d) => d.id !== deliverer.id
                )

                filteredDeliverers.push({
                    ...deliverer,
                    latitude: location.latitude,
                    longitude: location.longitude,
                })

                return buildMarkers(filteredDeliverers)
            }
        }

        return buildMarkers(deliverers)
    }, [deliverers, location])

    // TODO: compute center based on markers locations
    return (
        <Map
            className="h-full w-full"
            center={[48.8566, 2.3522]}
            zoom={10}
            markers={markers}
        />
    )
}

function buildMarkers(deliverers) {
    return deliverers.reduce((prev, curr) => {
        const latitude = parseFloat(curr.latitude)
        const longitude = parseFloat(curr.longitude)
        if (isNaN(latitude) || isNaN(longitude)) {
            return [...prev]
        }
        return [...prev, { position: [latitude, longitude] }]
    }, [])
}

export default TrackingView
