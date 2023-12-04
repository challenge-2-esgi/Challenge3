'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Map from '@/components/Map'
import { role } from '@/constants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const filters = {
    all: 'ALL',
    delivering: 'DELIVERING',
    waiting: 'WAITING',
}

const FleetPage = () => {
    const { t } = useTranslation()
    // const { isLoading, data } = Deliverer.useDeliverers()
    const [filter, setFilter] = useState(filters.all)

    const markers = [].reduce((prev, curr) => {
        const latitude = parseFloat(curr.latitude)
        const longitude = parseFloat(curr.longitude)
        if (isNaN(latitude) || isNaN(longitude)) {
            return [...prev]
        }
        return [...prev, { position: [latitude, longitude] }]
    }, [])

    // TODO
    // filter data
    // subscribe to notifications

    return (
        <Container className="h-full">
            <div className="mt-4 flex flex-row gap-x-6 pl-11">
                <Button
                    outlined={filter !== filters.all}
                    onClick={() => {
                        setFilter(filters.all)
                    }}
                >
                    {t('page.fleet.filters.all')}
                </Button>
                <Button
                    outlined={filter !== filters.delivering}
                    onClick={() => {
                        setFilter(filters.delivering)
                    }}
                >
                    {t('page.fleet.filters.delivering')}
                </Button>
                <Button
                    outlined={filter !== filters.waiting}
                    onClick={() => {
                        setFilter(filters.waiting)
                    }}
                >
                    {t('page.fleet.filters.waiting')}
                </Button>
            </div>
            <div className="h-full w-full px-11 py-8">
                {/* {isLoading ? (
                    <Loader className="h-full" size="large" />
                ) : (
                    <Map
                        className="h-full w-full"
                        center={[48.8566, 2.3522]}
                        zoom={10}
                        markers={markers}
                    />
                )} */}
                <Map
                    className="h-full w-full"
                    center={[48.8566, 2.3522]}
                    zoom={10}
                    markers={markers}
                />
            </div>
        </Container>
    )
}

export default withRoleGuard([role.admin], FleetPage)
