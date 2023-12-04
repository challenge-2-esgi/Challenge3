'use client'

import L from 'leaflet'
import PropTypes from 'prop-types'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const Map = ({ center, className = '', zoom = 5, markers = [] }) => {
    const markerIcon = L.divIcon({
        className: 'w-full h-full',
        html: `<svg
                stroke="#3BA2B8"
                fill="#3C50E0"
                stroke-width="0"
                viewBox="0 0 384 512"
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
            </svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    })

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            className={className}
        >
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={markerIcon}
                ></Marker>
            ))}
        </MapContainer>
    )
}

Map.propTypes = {
    className: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number,
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.arrayOf(PropTypes.number),
        })
    ),
}

export default Map
