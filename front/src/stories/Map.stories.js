import Map from '@/components/Map'
import { useEffect, useState } from 'react'

export default {
    title: 'Components/Map',
    component: Map,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

const Template = {
    render: ({ center = [46.6031, 1.7274], zoom = 5, markers = [] }) => {
        return (
            <Map
                className="h-60 w-96"
                center={center}
                zoom={zoom}
                markers={markers}
            />
        )
    },
}

export const NoMarkers = {
    ...Template,
    args: {},
}

export const WithMarkerOnParis = {
    ...Template,
    args: {
        center: [48.8566, 2.3522],
        zoom: 10,
        markers: [{ position: [48.8566, 2.3522] }],
    },
}

export const WithMultipleMarkers = {
    ...Template,
    args: {
        center: [48.8566, 2.3522],
        zoom: 9,
        markers: [
            { position: [48.8566, 2.3522] }, // Paris
            { position: [48.8014, 2.1301] }, // Versailles
            { position: [48.9362, 2.3574] }, // Saint-Denis
            { position: [48.8397, 2.2399] }, // Boulogne-Billancourt
        ],
    },
}

export const OneMarkerRealTime = {
    render: () => {
        const markers = [
            {
                position: [48.8490673, 2.3897295],
            },
            {
                position: [48.8524038, 2.3858936],
            },
            {
                position: [48.847526, 2.406214],
            },
            {
                position: [48.849287, 2.4144508],
            },
            {
                position: [48.8740643, 2.4128691],
            },
            {
                position: [48.8596731, 2.4329343],
            },
            {
                position: [48.8580014, 2.4353068],
            },
        ]

        const [index, setIndex] = useState(0)

        useEffect(() => {
            const timer = setInterval(() => {
                setIndex((prev) => {
                    if (prev < markers.length - 1) {
                        return prev + 1
                    }
                    return 0
                })
            }, 1000)

            return () => clearInterval(timer)
        }, [])

        return (
            <Map
                className="h-60 w-96"
                center={markers[index].position}
                markers={[markers[index]]}
                zoom={10}
            />
        )
    },
}

export const MultipleMarkersRealTime = {
    render: () => {
        const firstMarker = [
            {
                position: [48.8490673, 2.3897295],
            },
            {
                position: [48.8524038, 2.3858936],
            },
            {
                position: [48.847526, 2.406214],
            },
        ]

        const secondMarker = [
            {
                position: [48.8740643, 2.4128691],
            },
            {
                position: [48.8596731, 2.4329343],
            },
            {
                position: [48.8580014, 2.4353068],
            },
        ]

        const thirdMarker = [
            {
                position: [48.849287, 2.4144508],
            },
            {
                position: [48.8740643, 2.4128691],
            },
        ]

        const fourthMarker = [
            {
                position: [48.8490673, 2.3897295],
            },
            {
                position: [48.8524038, 2.3858936],
            },
            {
                position: [48.847526, 2.406214],
            },
            {
                position: [48.849287, 2.4144508],
            },
        ]

        const [firstMarkerIndex, setFirstMarkerIndex] = useState(0)
        const [secondMarkerIndex, setSecondMarkerIndex] = useState(0)
        const [thirdMarkerIndex, setThirdMarkerIndex] = useState(0)
        const [fourthMarkerIndex, setFourthMarkerIndex] = useState(0)

        useEffect(() => {
            const timer1 = setInterval(() => {
                setFirstMarkerIndex((prev) => {
                    if (prev < firstMarker.length - 1) {
                        return prev + 1
                    }
                    return 0
                })
            }, 1000)

            const timer2 = setInterval(() => {
                setSecondMarkerIndex((prev) => {
                    if (prev < secondMarker.length - 1) {
                        return prev + 1
                    }
                    return 0
                })
            }, 1500)

            const timer3 = setInterval(() => {
                setThirdMarkerIndex((prev) => {
                    if (prev < thirdMarker.length - 1) {
                        return prev + 1
                    }
                    return 0
                })
            }, 2000)

            const timer4 = setInterval(() => {
                setFourthMarkerIndex((prev) => {
                    if (prev < fourthMarker.length - 1) {
                        return prev + 1
                    }
                    return 0
                })
            }, 500)

            return () => {
                clearInterval(timer1)
                clearInterval(timer2)
                clearInterval(timer3)
                clearInterval(timer4)
            }
        }, [])

        return (
            <Map
                className="h-60 w-96"
                center={[48.8566, 2.3522]}
                markers={[
                    firstMarker[firstMarkerIndex],
                    secondMarker[secondMarkerIndex],
                    thirdMarker[thirdMarkerIndex],
                    fourthMarker[fourthMarkerIndex],
                ]}
                zoom={10}
            />
        )
    },
}
