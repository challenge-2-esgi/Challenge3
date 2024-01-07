'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import Deliverer from '@/api/services/Deliverer'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { role } from '@/constants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TrackingView from './TrackingView'

const filters = {
    all: 'ALL',
    delivering: 'DELIVERING',
    waiting: 'WAITING',
}

const FleetPage = () => {
    const { t } = useTranslation()
    const [filter, setFilter] = useState(filters.all)
    const { isLoading, data } = Deliverer.useDeliverers()

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
                {isLoading ? (
                    <Loader className="h-full" size="large" />
                ) : (
                    <TrackingView deliverers={data} />
                )}
            </div>
        </Container>
    )
}

export default withRoleGuard([role.admin], FleetPage)
